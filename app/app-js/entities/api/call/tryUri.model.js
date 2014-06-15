define(function (require) {
  var Backbone = require('backbone'),
      TryUriModel;

  TryUriModel = Backbone.Model.extend({

    urlRoot: '/getUri',

    defaults: {
      output: null
    },

    parse: function (response) {
      return {
        output: JSON.stringify(response, null, 2)
      };
    }
  });

  return TryUriModel;
});
