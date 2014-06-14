define(function (require) {
  var Backbone = require('backbone'),
      AlertModel;

  AlertModel = Backbone.Model.extend({

    defaults: {
      name: null,
      uriClass: null
    }
  });

  return AlertModel;
});
