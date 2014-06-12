define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/static/about/about.view'),
      AboutView;

  AboutView = Marionette.ItemView.extend({
    template: template,
    className: 'main-content',
  });

  return AboutView;
});
