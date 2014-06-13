define(function (require) {
  var Backbone = require('backbone'),
      SampleUriModel;

  SampleUriModel = Backbone.Model.extend({

    urlRoot: '/sampleUri',

    defaults: {
      uri: null
    },

    initialize: function (options) {
      _.extend(this, _.pick(options, ['service', 'uriClass']));
    },

    fetch: function (options) {
      options = options || {};
      options.url = this.urlRoot + '/' + this.service + '/' + this.uriClass;
      
      return Backbone.Model.prototype.fetch.call(this, options);
    }
  });

  return SampleUriModel;
});
