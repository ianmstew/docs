define(function (require) {
  var Backbone = require('backbone'),
      EndpointCollection = require('entities/service/endpoint/endpoint.collection'),
      ServiceModel;

  ServiceModel = Backbone.Model.extend({

    defaults: {
      serviceName: null,
      serviceKey: null,
      endpoints: null,
      connected: false  // set externally by collection
    },

    constructor: function (attrs, options) {
      attrs = attrs || {};
      if (attrs.endpoints) {
        attrs.endpoints = new EndpointCollection(attrs.endpoints);
      }
      ServiceModel.__super__.constructor.call(this, attrs, options);
    }
  });

  return ServiceModel;
});
