define(function (require) {
  var Backbone = require('backbone'),
      GenericOutputModel = require('entities/api/genericOutput.model'),
      GenericUriModel = require('entities/api/genericUri.model'),
      SampleUriModel = require('entities/api/sampleUri.model'),
      GetUriModel = require('entities/api/tryUri.model'),
      HasNested = require('lib/HasNested.model.mixin'),
      ApiModel;

  ApiModel = Backbone.Model.extend({

    defaults: {
      name: null,
      serviceKey: null,
      endpointKey: null,
      genericOutput: null,
      genericUri: null,
      sampleUri: null,
      tryUri: null
    },

    constructor: function (attrs, options) {
      var apiAttributes = _.pick(attrs, ['serviceKey', 'endpointKey']);

      _.extend(attrs, {
        genericOutput: new GenericOutputModel(apiAttributes),
        genericUri: new GenericUriModel(apiAttributes),
        sampleUri: new SampleUriModel(apiAttributes),
        tryUri: new GetUriModel()
      });

      new HasNested(this);

      ApiModel.__super__.constructor.call(this, attrs, options);
    },

    clearAll: function (options) {
      this.get('genericOutput').clear(options);
      this.get('genericUri').clear(options);
      this.get('sampleUri').clear(options);
      this.get('tryUri').clear(options);
    },

    fetchSampleUri: function () {
      this.get('sampleUri').fetch();
    },

    fetchGenericOutput: function () {
      this.get('genericOutput').fetch();
    },

    fetchGenericUri: function () {
      this.get('genericUri').fetch();
    },

    fetchTryUri: function (options) {
      this.get('tryUri').fetch({ data: $.param(options) });
    }
  });

  return ApiModel;
});
