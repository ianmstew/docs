define(function (require) {
  var ModuleController = require('lib/module.controller'),
      DatasourceModel = require('entities/datasource/datasource.model'),
      appChannel = require('app.channel'),
      DatasourceController;

  DatasourceController = ModuleController.extend({

    appEvents: {

      reqres: {
        'fetch:datasource': 'fetchDatasource'
      }
    },

    fetchDatasource: function (service, uriClass) {
      var datasource = new DatasourceModel(),
          defer = $.Deferred(),
          promise = defer.promise();

      datasource.fetch({ 

        service: service,
        uriClass: uriClass,

        error: function () {
          var alert = {
            title: 'You haven\'t authenticated with the ' + service + ' API.',
            message: 'Connect with a data source on the left to begin',
            state: 'danger'
          };

          appChannel.commands.execute('add:alert', alert);
          defer.reject(datasource);
        },

        success: function () {
          defer.resolve(datasource);
        }
      });

      return promise;
    }
  });

  return DatasourceController;
});
