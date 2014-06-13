define(function (require) {
  var Backbone = require('backbone'),
      GenericOutputModel = require('entities/tryUri/genericOutput.model'),
      GenericUriModel = require('entities/tryUri/genericUri.model'),
      SampleUriModel = require('entities/tryUri/sampleUri.model'),
      GetUriModel = require('entities/tryUri/getUri.model'),
      appChannel = require('app.channel'),
      UriModel;

  UriModel = Backbone.Model.extend({

    defaults: {
      name: null,
      genericOutput: null,
      genericUri: null,
      sampleUri: null,
      getUri: null
    },

    initialize: function (options) {
      var attributes;

      _.extend(this, _.pick(options, ['service', 'uriClass']));

      attributes = {
        genericOutput: new GenericOutputModel({
          service: this.service,
          uriClass: this.uriClass
        }),
        genericUri: new GenericUriModel({
          service: this.service,
          uriClass: this.uriClass
        }),
        sampleUri: new SampleUriModel({
          service: this.service,
          uriClass: this.uriClass
        }),
        getUri: new GetUriModel()
      };

      this.set(attributes);
      this._propagateChange(_.keys(attributes));
    },

    _propagateChange: function (names) {
      var self = this;

      _.each(names, function (name) {
        self.get(name).on('change', function () {
          var evt = 'change:' + name,
              args = Array.prototype.slice.call(arguments, 0),
              triggerArgs = [evt].concat(args);
          self.trigger.apply(self, triggerArgs);
        });
      });
    },

    clearAll: function (opts) {
      this.get('genericOutput').clear(opts);
      this.get('genericUri').clear(opts);
      this.get('sampleUri').clear(opts);
      this.get('getUri').clear(opts);
    },

    fetchSampleUri: function () {
      this.get('sampleUri').fetch();
    },

    fetchGenericOutput: function () {
      this.get('genericOutput').fetch();
    },

    fetchGenericUri: function () {
      this.get('genericUri').fetch();
    },

    fetchUri: function (options) {
      this.get('getUri').fetch({ data: $.param(options) });
    }
  });

  return UriModel;
});
