define(function (require) {
  var Marionette = require('marionette'),
      showTemplate = require('hgn!modules/main/show/main.show.view'),
      ShowView;

  ShowView = Marionette.ItemView.extend({
    template: showTemplate,
    // className: 'container-fluid'

    onShow: function () {
      _.defer(function() {
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

  return ShowView;
});
