define(function (require) {
  var Backbone = require('backbone'),
      GenericOutputModel;

  GenericOutputModel = Backbone.Model.extend({

    urlRoot: '/genericOutput',

    defaults: {
      output: null
    },

    initialize: function (options) {
      _.extend(this, _.pick(options, ['service', 'uriClass']));
    },

    fetch: function (options) {
      options = options || {};
      options.url = this.urlRoot + '/' + this.service + '/' + this.uriClass;
      
      return Backbone.Model.prototype.fetch.call(this, options);
    },

    parse: function (response) {
      return {
        service: this.get('service'),
        uriClass: this.get('uriClass'),
        output: JSON.stringify(response, null, 2)
      };
    }
  });

  return GenericOutputModel;
});
