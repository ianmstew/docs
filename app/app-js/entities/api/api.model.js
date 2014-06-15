define(function (require) {
  var Backbone = require('backbone'),
      GenericOutputModel = require('entities/api/genericOutput.model'),
      GenericUriModel = require('entities/api/genericUri.model'),
      SampleUriModel = require('entities/api/sampleUri.model'),
      GetUriModel = require('entities/api/tryUri.model'),
      HasNestedModel = require('lib/HasNestedModel.mixin'),
      services = require('entities/service/services'),
      ApiModel;

  ApiModel = Backbone.Model.extend({

    defaults: {
      apiName: null,
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

      new HasNestedModel(this);

      ApiModel.__super__.constructor.call(this, attrs, options);
    },

    initialize: function () {
      var self = this;

      this.on('change', function () {
        var serviceKey,
            endpointKey;
            
        if (self.hasChanged('serviceKey') || self.hasChanged('endpointKey')) {
          serviceKey = self.get('serviceKey');
          endpointKey = self.get('endpointKey');

          _.invoke([
            self.get('genericOutput'),
            self.get('genericUri'),
            self.get('sampleUri')
          ], 'set', { serviceKey: serviceKey, endpointKey: endpointKey });

          self.trigger('change:apiName', self, self.get('apiName'));
        }
      });
    },

    get: function (key) {
      var serviceName,
          endpointName,
          apiName;

      if (key === 'apiName') {
        serviceName = services.lookupServiceName(this.get('serviceKey'));
        endpointName = services.lookupEndpointName(this.get('serviceKey'), this.get('endpointKey'));
        apiName = serviceName + ' ' + endpointName;
        return apiName;
      } else {
        return ApiModel.__super__.get.apply(this, arguments);
      }
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
