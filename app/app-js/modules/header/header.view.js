define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/header/header.view'),
      HeaderView;

  HeaderView = Marionette.ItemView.extend({
    template: template,
    className: 'header'
  });

  return HeaderView;
});
