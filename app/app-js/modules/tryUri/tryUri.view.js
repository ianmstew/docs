define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/tryUri/tryUri.view'),
      TryUriView;

  TryUriView = Marionette.ItemView.extend({
    template: template,
    className: 'tryUri',

    onShow: function () {
      _.defer(function() {
        console.log("Hooray, this is working!");
        
        var totalHeight = '100%',
        $uriField = $('.js-input-expand');

        $uriField.each(function() {
          $(this).data('height', $(this).height());
        });

        $('.js-input-expand')
          .focus(function() {
              $(this).animate({
                height: 100
              },
              'slow'
            );
          })

          .blur(function() {
              $(this).animate({
                height: totalHeight
              },
              'slow'
            );
          });
      });
    }
  });

  return TryUriView;
});
