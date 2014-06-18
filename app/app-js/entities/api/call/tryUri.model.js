define(function (require) {
  var Backbone = require('backbone'),
      TryUriModel;

  TryUriModel = Backbone.Model.extend({

    urlRoot: '/getUri',

    defaults: {
      output: null
    },

    fetch: function (options) {
      var self = this;
      
      options = options || {};
      options.error = function () {
        self.set('output', null);
      };

      TryUriModel.__super__.fetch.apply(this, arguments);
    },

    parse: function (response) {
      return {
        output: JSON.stringify(response, null, 2)
      };
    }
  });

  return TryUriModel;
});
