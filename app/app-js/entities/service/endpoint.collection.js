define(function (require) {
  var Backbone = require('backbone'),
      EndpointModel = require('entities/service/endpoint.model'),
      EndpointCollection;

  EndpointCollection = Backbone.Collection.extend({

    model: EndpointModel
  });

  return EndpointCollection;
});
