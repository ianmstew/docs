define(function (require) {
  var Backbone = require('backbone'),
      ServiceModel = require('entities/service/service.model'),
      services = require('entities/service/services'),
      ServiceCollection;

  ServiceCollection = Backbone.Collection.extend({

    model: ServiceModel,

    constructor: function (models, options) {
      models = models || [];
      models = models.concat(services.clone());
      ServiceCollection.__super__.constructor.call(this, models, options);
    }
  });

  return ServiceCollection;
});
