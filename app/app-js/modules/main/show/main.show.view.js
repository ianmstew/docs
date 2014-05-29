define(function (require) {
  var Marionette = require('marionette'),
      showTemplate = require('hgn!modules/main/show/main.show.view'),
      ShowView;

  ShowView = Marionette.ItemView.extend({
    template: showTemplate,
    // className: 'container-fluid'
  });

  return ShowView;
});
