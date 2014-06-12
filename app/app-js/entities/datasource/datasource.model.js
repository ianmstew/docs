define(function (require) {
  var Backbone = require('backbone'),
      DatasourceModel;

  DatasourceModel = Backbone.Model.extend({

    urlRoot: '/sampleUri',

    defaults: {
      uri: 'Testing the default URI'
    },

    fetch: function (options) {
      options = options || {};
      if (!options.url) {
        options.url = this.urlRoot + '/' + options.service + '/' + options.uriClass;
      }
      return Backbone.Model.prototype.fetch.call(this, options);
    }
  });

  return DatasourceModel;
});
