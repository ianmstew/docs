define(function (require) {
  var Backbone = require('backbone'),
      GenericOutputModel;

  GenericOutputModel = Backbone.Model.extend({

    urlRoot: '/genericOutput',

    defaults: {
      output: null,
      serviceKey: null,
      endpointKey: null
    },

    fetch: function (options) {
      options = options || {};
      options.url = this.urlRoot + '/' + this.get('serviceKey') + '/' + this.get('endpointKey');
      
      return GenericOutputModel.__super__.fetch.call(this, options);
    },

    parse: function (response) {
      return {
        output: JSON.stringify(response, null, 2)
      };
    }
  });

  return GenericOutputModel;
});
