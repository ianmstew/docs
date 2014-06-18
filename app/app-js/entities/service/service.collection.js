define(function (require) {
  var Backbone = require('backbone'),
      ServiceModel = require('entities/service/service.model'),
      appChannel = require('app.channel'),
      ServiceCollection;

  ServiceCollection = Backbone.Collection.extend({

    model: ServiceModel
  });

  return ServiceCollection;
});
