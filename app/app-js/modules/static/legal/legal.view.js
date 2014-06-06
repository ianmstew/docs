define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/static/legal/legal.view'),
      LegalView;

  LegalView = Marionette.ItemView.extend({
    template: template,
    className: 'header'
  });

  return LegalView;
});
