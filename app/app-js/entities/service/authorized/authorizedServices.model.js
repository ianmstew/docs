define(function (require) {
  var Backbone = require('backbone'),
      AuthorizedServicesModel;

  AuthorizedServicesModel = Backbone.Model.extend({

    url: '/auth/connections',

    defaults: {
      connections: null
    }
  });

  return AuthorizedServicesModel;
});
