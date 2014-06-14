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
      options = options || {};
      options.url = this.urlRoot + '/' + this.get('serviceKey') + '/' + this.get('endpointKey');
      
      return GenericUriModel.__super__.fetch.call(this, options);
    }
  });

  return GenericUriModel;
});
