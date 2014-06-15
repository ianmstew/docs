define(function (require) {
  var Backbone = require('backbone'),
      EndpointModel;

  EndpointModel = Backbone.Model.extend({

    defaults: {
      endpointName: null,
      endpointKey: null
    }
  });

  return EndpointModel;
});
