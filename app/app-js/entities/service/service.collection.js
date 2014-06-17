define(function (require) {
  var Backbone = require('backbone'),
      ServiceModel = require('entities/service/service.model'),
      appChannel = require('app.channel'),
      ServiceCollection;

  ServiceCollection = Backbone.Collection.extend({

    model: ServiceModel,

    initialize: function () {
      
      this.listenTo(appChannel.vent, 'change:authorizedServices', function (services) {
        if (services.length > 0) {
          _.each(this.models, function (model) {
            var connected = false;
            _.each(services, function (service) {
              if (model.get('serviceKey') === service) {
                connected = true;
              }
            });
            model.set('connected', connected);
          });
        }
      });
    },

    fetchAuthorized: function () {
      appChannel.commands.execute('poll:authorizedServices');
    }
  });

  return ServiceCollection;
});
