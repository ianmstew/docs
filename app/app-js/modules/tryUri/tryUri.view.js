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

    tryItClicked: function () {
      if (this.authorized) {
        moduleChannel.vent.trigger('try:uri', this.ui.uri.val());
      } else {
        moduleChannel.vent.trigger('connect');
      }
    },

    onSetAuthorized: function (authorized) {
      if (authorized) {
        this.ui.uri.prop('disabled', false);
        this.ui.tryIt.text('Try It!');
      } else {
        this.ui.uri.prop('disabled', true);
        this.ui.tryIt.text('Connect to try this live');
      }
      this.authorized = authorized;
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
