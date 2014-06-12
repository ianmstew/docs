define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/static/tos/tos.view'),
      TosView;

  TosView = Marionette.ItemView.extend({
    template: template,
    className: 'main-content'
  });

  return TosView;
});
