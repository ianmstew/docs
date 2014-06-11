define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/tryUri/tryUri.view'),
      TryUriView;

  TryUriView = Marionette.ItemView.extend({
    template: template,
    className: 'tryUri',

    onPopulateTryUri: function (service, uriClass) {
      $.getJSON('/genericUri/' + service + '/' + uriClass, function (data, status) {
        if(data.uri)
          $('#sampleUri').text(data.uri);
      }).fail(function (status) {
        $('#sampleUri').text(status.responseText);
      });

      $.getJSON('/genericOutput/' + service + '/' + uriClass, function (result, status) {
        $('#sampleOutput').text(JSON.stringify(result, null, 2));
      }).fail(function (status) {
        $('#sampleOutput').text(JSON.stringify(status, null, 2));
      });

      $('#get-json').click(function () {
        $.getJSON('/getUri', { 'uri': $('#sample-uri').val() }, function (data, status) {
          $('#sampleOutput').text(JSON.stringify(data, null, 2));
        }).fail(function (status, error) {
          $('#sampleOutput').text(status.responseText);
        });
      });
    },

    onShow: function () {
      var totalHeight = '100%',
      $uriField = $('.js-input-expand');

      $uriField.each(function () {
        $(this).data('height', $(this).height());
      });

      $('.js-input-expand')
        .focus(function () {
            $(this).animate({
              height: 100
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
