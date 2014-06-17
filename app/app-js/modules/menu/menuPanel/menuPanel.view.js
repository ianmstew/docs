define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/menu/menuPanel/menuPanel.view'),
      MenuItemView = require('modules/menu/menuItem/menuItem.view'),
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

    modelEvents: {
      'change:connected': 'connectedChanged'
    },

    initialize: function (options) {
      this.collection = options.model.get('endpoints');
      this.itemViewOptions = {
        serviceKey: options.model.get('serviceKey')
      };
    },

    connectedChanged: function (mode, connected) {
      this.ui.connectButton
        .removeClass('btn-green')
        .removeClass('btn-red');
      if (connected) {
        this.ui.connectButton.addClass('btn-red');
        this.ui.connectButton.text('Disconnect');
      } else {
        this.addClass('btn-green');
        this.ui.connectButton.text('Connect');
      }
    },

    connectClicked: function () {
      if (this.model.get('connected')) {
        window.location.assign('/disconnect/' + this.model.get('serviceKey'));
      } else {
        window.location.assign('/auth/' + this.model.get('serviceKey') + '?auth-return=%2F%23tryUri%2Ffacebook%2Fuserprofile');
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
