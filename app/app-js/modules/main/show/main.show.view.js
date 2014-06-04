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

        $uriField.each(function(i,el) {
          $(this).data('height', $(this).height());
        });

        $('.js-input-expand').focus(function() {
          console.log("Another log statement!");
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
      console.log("I'm here");
    }
  });

  return ShowView;
});
