define(function (require) {
  var Backbone = require('backbone'),
      ServiceModel = require('entities/service/service.model'),
      AuthorizedServicesModel = require('entities/service/authorized/authorizedServices.model'),
      ServiceCollection;

  ServiceCollection = Backbone.Collection.extend({

    model: ServiceModel,

    initialize: function () {
      this.authorizedServices = new AuthorizedServicesModel();
      
      this.listenTo(this.authorizedServices, 'change', function () {
        var connections = this.authorizedServices.get('connections');
        if (connections.length > 0) {
          _.each(this.models, function (model) {
            var connected = false;
            _.each(connections, function (connection) {
              if (model.get('serviceKey') === connection) {
                connected = true;
              }
            });
            model.set('connected', connected);
          });
        }
      });
    },

    fetchAuthorized: function () {
      this.authorizedServices.fetch();
    }
  });

  return ServiceCollection;
});
