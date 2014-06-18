define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/welcome/welcome.view'),
      StartView;

  StartView = Marionette.ItemView.extend({
    template: template
    // className: 'container-fluid'
  });

  return StartView;
});
