define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/footer/footer.view'),
      FooterView;

  FooterView = Marionette.ItemView.extend({
    template: template,
    className: 'footer'
  });

  return FooterView;
});
