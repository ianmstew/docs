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
      uriField: '.js-uri'
    },

    modelEvents: {
      'change:getUri': 'getUriChanged',
      'change:genericOutput': 'genericOutputChanged',
      'change:sampleUri': 'sampleUriChanged',
      'change:genericUri': 'genericUriChanged'
    },

    events: {
      'click @ui.tryIt': 'tryItClicked'
    },

    tryItClicked: function () {
      moduleChannel.vent.trigger('try:uri', this.ui.uriField.val());
    },

    sampleUriChanged: function () {
      this.ui.uriField.val(this.model.get('sampleUri').get('uri'));
    },

    genericUriChanged: function () {
      this.ui.sampleUri.text(this.model.get('genericUri').get('uri'));
    },

    getUriChanged: function () {
      this.ui.sampleOutput.text(this.model.get('getUri').get('output'));
    },

    genericOutputChanged: function () {
      this.ui.sampleOutput.text(this.model.get('genericOutput').get('output'));
    },

    onShow: function () {
      var totalHeight = this.ui.uriField.parent().height() + 'px';

      this.ui.uriField
        .data('height', this.ui.uriField.height())
        .focus(function () {
            $(this).animate({
              height: $(this)[0].scrollHeight
            },
            'slow'
         );
        })
        .blur(function () {
            $(this).animate({
              height: totalHeight
            },
            'slow'
         );
        });
    }
  });

  return TryUriView;
});
