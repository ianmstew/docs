define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/tryUri/tryUri.view'),
      moduleChannel = require('modules/tryUri/tryUri.channel'),
      TryUriView;

  TryUriView = Marionette.ItemView.extend({
    template: template,
    className: 'tryUri',

    ui: {
      sampleUri: '.js-sample-uri',
      sampleOutput: '.js-sample-output',
      tryIt: '.js-try-it',
      uriField: '.js-uri',
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

    tryItClicked: function () {
      moduleChannel.vent.trigger('try:uri', this.ui.uriField.val());
    },

    apiNameChanged: function (model, value) {
      this.ui.apiName.text(value);
    },

    sampleUriChanged: function (model, value) {
      this.ui.uriField.val(value);
    },

    genericUriChanged: function (model, value) {
      this.ui.sampleUri.text(value);
    },

    tryUriChanged: function (model, value) {
      this.ui.sampleOutput.text(value);
    },

    genericOutputChanged: function (model, value) {
      this.ui.sampleOutput.text(value);
    },

    onShow: function () {
      var totalHeight = this.ui.uriField.parent().height();

      this.ui.uriField
        .data('height', this.ui.uriField.height())
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
