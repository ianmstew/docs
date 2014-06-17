define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/loading/loading.view'),
      LoadingView;

  LoadingView = Marionette.ItemView.extend({
    template: template,
    className: 'loading-modal',

    /*
    ui: {
      loadingModal: '.loading-modal'
    },

    events: {
    },

    initialize: function () {
      console.log('initializing loading view working!');
    },

    modalShow: function () {
    }
    */
  });

  return LoadingView;
});
