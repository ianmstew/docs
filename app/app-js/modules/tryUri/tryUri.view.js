define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/tryUri/tryUri.view'),
      moduleChannel = require('modules/tryUri/tryUri.channel'),
      TryUriView;

  TryUriView = Marionette.ItemView.extend({
    template: template,
    className: 'tryUri',

    ui: {
      genericUri: '.js-generic-uri',
      uri: '.js-uri',
      output: '.js-output',
      tryIt: '.js-try-it',
      apiName: '.js-api-name'
    },

    modelEvents: {
      'change:apiName': 'apiNameChanged',
      'change:tryUri:output': 'tryUriChanged',
      'change:genericOutput:output': 'genericOutputChanged',
      'change:sampleUri:uri': 'sampleUriChanged',
      'change:genericUri:uri': 'genericUriChanged'
    },

    events: {
      'click @ui.tryIt': 'tryItClicked'
    },

    authorized: false,
    disabled: false,

    tryItClicked: function () {
      if (this.authorized) {
        moduleChannel.vent.trigger('try:uri', this.ui.uri.val());
      } else {
        moduleChannel.vent.trigger('connect');
      }
    },

    _getTryItText: function () {
      if (this.disabled) {
        return 'Temporarily Unavailable';
      } else if (this.authorized) {
        return 'Try It!';
      } else {
        return 'Connect to try this live';
      }
    },

    onEndpointDisabled: function (disabled) {
      this.disabled = disabled;

      if (disabled) {
        this.ui.uri.prop('disabled', true);
        this.ui.tryIt.prop('disabled', true);
      } else {
        this.ui.uri.prop('disabled', false);
        this.ui.tryIt.prop('disabled', false);
      }

      this.ui.tryIt.text(this._getTryItText());
    },

    onSetAuthorized: function (authorized) {
      this.authorized = authorized;

      if (authorized) {
        if (!this.disabled) this.ui.uri.prop('disabled', false);
      } else {
        this.ui.uri.prop('disabled', true);
      }

      this.ui.tryIt.text(this._getTryItText());
    },

    apiNameChanged: function (model, value) {
      this.ui.apiName.text(value);
    },

    sampleUriChanged: function (model, value) {
      this.ui.uri.val(value);
    },

    genericUriChanged: function (model, value) {
      this.ui.genericUri.text(value);
    },

    tryUriChanged: function (model, value) {
      this.ui.output.text(value);
    },

    genericOutputChanged: function (model, value) {
      this.ui.output.text(value);
    },

    onShow: function () {
      var totalHeight = this.ui.uri.parent().height();

      this.ui.uri
        .data('height', this.ui.uri.height())
        .focus(function () {
          var scrollHeight = $(this)[0].scrollHeight;

          if (scrollHeight > totalHeight) {
            $(this).animate({
              height: scrollHeight
            }, 'slow');
          }
        })
        .blur(function () {
          $(this).animate({
            height: totalHeight
          }, 'slow');
        });
    }
  });

  return TryUriView;
});
