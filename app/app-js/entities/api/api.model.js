define(function (require) {
  var Backbone = require('backbone'),
      GenericOutputModel = require('entities/api/call/genericOutput.model'),
      GenericUriModel = require('entities/api/call/genericUri.model'),
      SampleUriModel = require('entities/api/call/sampleUri.model'),
      GetUriModel = require('entities/api/call/tryUri.model'),
      HasNestedModel = require('lib/hasNestedModel'),
      appChannel = require('app.channel'),
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

    computed: {
      apiName: {
        depends: ['serviceKey', 'endpointKey'],
        get: function () {
          var serviceName = appChannel.reqres.request(
                  'lookup:serviceName', this.get('serviceKey')),
              endpointName = appChannel.reqres.request(
                  'lookup:endpointName', this.get('serviceKey'), this.get('endpointKey')),
              apiName = serviceName + ' ' + endpointName;
          return apiName;
        }
      }
    },

    constructor: function () {
      // Attach nested model functionality
      new HasNestedModel(this);

      // Attach computed field functionality
      new Backbone.ComputedFields(this);

      ApiModel.__super__.constructor.apply(this, arguments);
    },

    initialize: function () {
      var self = this,
          apiAttributes = {
            serviceKey: this.get('serviceKey'),
            endpointKey: this.get('endpointKey')
          };

      // Initialize submodels
      this.set({
        genericOutput: new GenericOutputModel(apiAttributes),
        genericUri: new GenericUriModel(apiAttributes),
        sampleUri: new SampleUriModel(apiAttributes),
        tryUri: new GetUriModel()
      });

      this.on('change', function () {
        var apiAttributes;

        // When serviceKey or endpointKey are changed, pass them down to submodels
        if (self.hasChanged('serviceKey') || self.hasChanged('endpointKey')) {
          apiAttributes = {
            serviceKey: self.get('serviceKey'),
            endpointKey: self.get('endpointKey')
          };

          _.invoke([
            self.get('genericOutput'),
            self.get('genericUri'),
            self.get('sampleUri')
          ], 'set', apiAttributes);
        }
      });
    },

    clear: function () {
      this.set({
        apiName: null,
        serviceKey: null,
        endpointKey: null
      });
      _.invoke([
        this.get('genericOutput'),
        this.get('genericUri'),
        this.get('sampleUri'),
        this.get('tryUri')
      ], 'clear');
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
    },

    toJSON: function () {
      return _.clone(this.attributes);
    }
  });

  return ApiModel;
});
