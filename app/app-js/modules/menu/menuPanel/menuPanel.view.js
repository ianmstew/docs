define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/menu/menuPanel/menuPanel.view'),
      MenuItemView = require('modules/menu/menuItem/menuItem.view'),
      appChannel = require('app.channel'),
      MenuPanelView;

  MenuPanelView = Marionette.CompositeView.extend({

    template: template,
    itemView: MenuItemView,
    itemViewContainer: '.js-menuItem-region',
    className: 'panel panel-default',

    ui: {
      servicePanel: '.js-service-panel',
      connectButton: '.js-connect'
    },

    events: {
      'click @ui.connectButton': 'connectClicked'
    },

    authorized: false,

    initialize: function (options) {
      var self = this;

      this.collection = options.model.get('endpoints');
      this.itemViewOptions = {
        serviceKey: options.model.get('serviceKey')
      };

      this.listenTo(appChannel.vent, 'change:authorizedServices', function (services) {
        var authorized = false;
        if (_.indexOf(services, this.model.get('serviceKey')) >= 0) {
          self.triggerMethod('authorized', true);
        } else {
          self.triggerMethod('authorized', false);
        }
      });
    },

    onAuthorized: function (authorized) {
      this.authorized = authorized;
      this.ui.connectButton
        .removeClass('btn-green')
        .removeClass('btn-red');

      if (authorized) {
        this.ui.connectButton.addClass('btn-red');
        this.ui.connectButton.text('Disconnect');
      } else {
        this.ui.connectButton.addClass('btn-green');
        this.ui.connectButton.text('Connect');
      }
      this.ui.connectButton.show();
    },

    connectClicked: function () {
      if (this.authorized) {
        appChannel.commands.execute('disconnect:service', this.model.get('serviceKey'));
      } else {
        appChannel.commands.execute('connect:service', this.model.get('serviceKey'));
      }
    },

    onShowService: function () {
      this.ui.servicePanel
        .addClass('in')
        .css('height', 'auto');
    },

    onSelectEndpoint: function (endpointKey) {
      var endpointModel = this.collection.where({ endpointKey: endpointKey })[0],
          endpointView = this.children.findByModel(endpointModel);
      endpointView.triggerMethod('select');
    }
  });

  return MenuPanelView;
});
