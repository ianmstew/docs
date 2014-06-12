define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/static/help/help.view'),
      HelpView;

  HelpView = Marionette.ItemView.extend({
    template: template,
    className: 'main-content'
  });

  return HelpView;
});
