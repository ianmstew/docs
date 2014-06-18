define(function (require) {
  var Backbone = require('backbone'),
      GenericUriModel;

  GenericUriModel = Backbone.Model.extend({

    urlRoot: '/genericUri',

    defaults: {
      uri: null,
      serviceKey: null,
      endpointKey: null
    },

    fetch: function (options) {
      var self = this;

      options = options || {};
      options.url = this.urlRoot + '/' + this.get('serviceKey') + '/' + this.get('endpointKey');
      options.error = function () {
        self.set('uri', null);
      };
      
      return GenericUriModel.__super__.fetch.call(this, options);
    }
  });

  return GenericUriModel;
});
