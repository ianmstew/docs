define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/tryUri/tryUri.view'),
      TryUriView;

  TryUriView = Marionette.ItemView.extend({
    template: template,
    className: 'tryUri',

    ui: {
      sampleUri: '.js-sample-uri',
      sampleOutput: '.js-sample-output',
      tryIt: '.js-try-it',
      uriField: '.js-input-expand'
    },

    initialize: function () {
      this.service = this.options.service;
      this.uriClass = this.options.uriClass;
    },

    onRender: function () {
      var self = this;

      $.getJSON('/genericUri/' + this.service + '/' + this.uriClass, function (data, status) {
        if (data.uri) {
          self.ui.sampleUri.text(data.uri);
        }
      }).fail(function (status) {
        self.ui.sampleUri.text(status.responseText);
      });

      $.getJSON('/genericOutput/' + this.service + '/' + this.uriClass, function (result, status) {
        self.ui.sampleOutput.text(JSON.stringify(result, null, 2));
      }).fail(function (status) {
        self.ui.sampleOutput.text(JSON.stringify(status, null, 2));
      });

      this.ui.tryIt.click(function () {
        $.getJSON('/getUri', { 'uri': $('#sample-uri').val() }, function (data, status) {
          self.ui.sampleOutput.text(JSON.stringify(data, null, 2));
        }).fail(function (status, error) {
          self.ui.sampleOutput.text(status.responseText);
        });
      });
    },


    onShow: function () {
      var totalHeight = '100%';

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
