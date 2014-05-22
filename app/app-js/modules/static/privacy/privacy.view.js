define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/static/privacy/privacy.view'),
      PrivacyView;

  PrivacyView = Marionette.ItemView.extend({
    template: template,
    className: 'header'
  });

  return PrivacyView;
});
