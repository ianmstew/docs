define(function (require) {
  var Backbone = require('backbone'),
      HasNested = require('lib/HasNested.model.mixin'),
      EndpointCollection = require('entities/service/endpoint.collection'),
      ServiceModel;

  ServiceModel = Backbone.Model.extend({

    defaults: {
      name: null,
      service: null,
      endpoints: null
    },

    constructor: function () {
      new HasNested(this);

      ServiceModel.__super__.constructor.apply(this, arguments);
    },

    parse: function (response) {
      return {
        name: response.name,
        key: response.key,
        endpoints: new EndpointCollection(response.endpoints)
      };
    }
  });

  return ServiceModel;
});
