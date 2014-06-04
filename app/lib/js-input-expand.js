$(function() {

  var totalHeight = '100%',
  $uriField = $('.js-input-expand');

  $uriField.each(function(i,el) {
    $(this).data('height', $(this).height());
  });

  $('.js-input-expand').focus(function() {
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
