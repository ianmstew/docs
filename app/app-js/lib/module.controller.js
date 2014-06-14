define(function (require) {
  var Marionette = require('marionette'),
      Wreqr = require('backbone.wreqr'),
      appChannel = require('app.channel'),
      logger = require('lib/logger'),
      ModuleController;

  ModuleController = Marionette.Controller.extend({

    appChannel: null,
    moduleChannel: null,
    router: null,
    _forwardEvents: null,

    constructor: function (options) {
      if (this.routes) {
        this.router = new (Marionette.AppRouter.extend({
          appRoutes: this.routes,
          controller: this
        }))();
      }

      // can be used optionally without a module (only runs on app events)
      if (options.module) {
        this.moduleChannel = Wreqr.radio.channel(options.module.moduleName);
        this._initEvents(this.moduleEvents, this.moduleChannel);
      } else if (this.moduleEvents) {
        logger.error('To use moduleEvents, please supply a module instance to options');
      }

      this._initEvents(this.appEvents, appChannel);
      this._initForwardEvents(this.forwardEvents);

      ModuleController.__super__.constructor.apply(this, arguments);
    },

    _initEvents: function (events, channel) {
      var self = this;
      if (!events) return;

      if (events.vent) {
        events.vent = Marionette.normalizeMethods.call(this, events.vent);
      }
      if (events.commands) {
        events.commands = Marionette.normalizeMethods.call(this, events.commands);
      }
      if (events.reqres){
        events.reqres = Marionette.normalizeMethods.call(this, events.reqres);
      }

      _.each(events.vent, function (handler, name) {
        channel.vent.on(name, _.bind(handler, self));
      });

      _.each(events.commands, function (handler, name) {
        if (channel.commands.getHandler(name)) {
          logger.warn('Commands handler ' + name + ' already set; overwriting!');
        }
        channel.commands.setHandler(name, _.bind(handler, self));
      });

      _.each(events.reqres, function (handler, name) {
        if (channel.reqres.getHandler(name)) {
          logger.warn('Reqres handler ' + name + ' already set; overwriting!');
        }
        return channel.reqres.setHandler(name, _.bind(handler, self));
      });
    },

    _initForwardEvents: function (events) {
      var self = this;
      if (!events) return;

      this._forwardEvents = {};

      _.each(events.vent, function (name) {
        var handler = function () {
          var origArgs = [name].concat(Array.prototype.slice.call(arguments, 0));
          appChannel.vent.trigger.apply(appChannel.vent, origArgs);
        };
        self.moduleChannel.vent.on(name, handler);
        self._forwardEvents.vent = self._forwardEvents.vent || {};
        self._forwardEvents.vent[name] = handler;
      });

      _.each(events.commands, function (name) {
        var handler;
        if (self.moduleChannel.commands.getHandler(name)) {
          logger.warn('Commands handler ' + name + ' already set; overwriting!');
        }
        handler = function () {
          var origArgs = [name].concat(Array.prototype.slice.call(arguments, 0));
          appChannel.commands.execute.apply(appChannel.commands, origArgs);
        };
        self.moduleChannel.commands.setHandler(name, handler);
        self._forwardEvents.commands = self._forwardEvents.commands || {};
        self._forwardEvents.commands[name] = handler;
      });

      _.each(events.reqres, function (name) {
        var handler;
        if (self.moduleChannel.reqres.getHandler(name)) {
          logger.warn('Reqres handler ' + name + ' already set; overwriting!');
        }
        handler = function () {
          var origArgs = [name].concat(Array.prototype.slice.call(arguments, 0));
          return appChannel.reqres.request.apply(appChannel.reqres, origArgs);
        };
        self.moduleChannel.reqres.setHandler(name, handler);
        self._forwardEvents.reqres = self._forwardEvents.reqres || {};
        self._forwardEvents.reqres[name] = handler;
      });
    },

    _closeEvents: function (events, channel) {
      if (!events) return;

      _.each(events.vent, function (handler, name) {
        channel.vent.off(name, handler);
      });

      _.each(events.commands, function (handler, name) {
        channel.commands.removeHandler(name);
      });

      _.each(events.reqres, function (handler, name) {
        channel.reqres.removeHandler(name);
      });
    },

    onClose: function () {
      this._closeEvents(this.appEvents);
      this._closeEvents(this.moduleEvents);
      this._closeEvents(this._forwardEvents);
    }
  });

  return ModuleController;
});
