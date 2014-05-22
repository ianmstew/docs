define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/static/contact/contact.view'),
      ContactView;

  ContactView = Marionette.ItemView.extend({
    template: template,
    className: 'header'
  });

  return ContactView;
});
