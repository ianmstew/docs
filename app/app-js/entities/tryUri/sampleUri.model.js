define(function (require) {
  var Backbone = require('backbone'),
      services = require('entities/services/services'),
      appChannel = require('app.channel'),
      SampleUriModel;

  SampleUriModel = Backbone.Model.extend({

    urlRoot: '/sampleUri',

    defaults: {
      uri: null
    },

    initialize: function (options) {
      _.extend(this, _.pick(options, ['service', 'uriClass']));
    },

    fetch: function (options) {
      var serviceName = services.lookupServiceName(this.service);

      options = options || {};
      
      _.extend(options, {

        url: this.urlRoot + '/' + this.service + '/' + this.uriClass,

        error: function () {
          var alert = {
            title: 'You haven\'t authenticated with the ' + serviceName + ' API.',
            message: 'Connect with a data source on the left to begin',
            state: 'danger'
          };

          appChannel.commands.execute('add:alert', alert);
        }
      });

      return Backbone.Model.prototype.fetch.call(this, options);
    }
  });

  return SampleUriModel;
});
