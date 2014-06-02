$(function() {
  $('.js-input-expand').focus(function() {
      $(this).animate({
        width: 150
      },
      'slow'
    );
  })

  .blur(function() {
      $(this).animate({
        width: 100
      },
      'slow'
    );
  });
});
