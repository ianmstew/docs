define(function (require) {
  var Backbone = require('backbone'),
      services = require('entities/service/services'),
      appChannel = require('app.channel'),
      SampleUriModel;

  SampleUriModel = Backbone.Model.extend({

    urlRoot: '/sampleUri',

    defaults: {
      uri: null,
      serviceKey: null,
      endpointKey: null
    },

    fetch: function (options) {
      var serviceName = services.lookupServiceName(this.get('serviceKey'));

      options = options || {};
      
      _.extend(options, {
        url: this.urlRoot + '/' + this.get('serviceKey') + '/' + this.get('endpointKey'),

        error: function () {
          var alert = {
            title: 'You haven\'t authenticated with the ' + serviceName + ' API.',
            message: 'Connect with a data source on the left to begin',
            state: 'danger'
          };

          appChannel.commands.execute('add:alert', alert);
        }
      });

      return SampleUriModel.__super__.fetch.call(this, options);
    }
  });

  return SampleUriModel;
});
