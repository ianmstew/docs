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
      var self = this;
          serviceName = appChannel.reqres.request('lookup:serviceName', this.get('serviceKey'));

      options = options || {};
      options.url = this.urlRoot + '/' + this.get('serviceKey') + '/' + this.get('endpointKey');
      options.error = function () {
        self.set('uri', null);
      };

      return SampleUriModel.__super__.fetch.call(this, options);
    }
  });

  return SampleUriModel;
});
