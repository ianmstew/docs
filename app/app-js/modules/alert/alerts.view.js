define(function (require) {
  var Marionette = require('marionette'),
      AlertView = require('modules/alert/alert.view'),
      AlertsView;

  AlertsView = Marionette.CollectionView.extend({
    itemView: AlertView
  });

  return AlertsView;
});
