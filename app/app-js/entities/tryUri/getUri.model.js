define(function (require) {
  var Backbone = require('backbone'),
      GetUriModel;

  GetUriModel = Backbone.Model.extend({

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

  return GetUriModel;
});
