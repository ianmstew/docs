define(function (require) {
  var Backbone = require('backbone'),
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
      var serviceName = appChannel.reqres.request('lookup:serviceName', this.get('serviceKey'));

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
