define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/loading/loading.view'),
      Spinner = require('spinner'),
      LoadingView;

  LoadingView = Marionette.ItemView.extend({
    template: template,
    className: 'loading-modal',

    onShow: function() {
      var opts = {
        lines: 10,
        length: 12,
        width: 8,
        radius: 15,
        corners: 1,
        rotate: 0,
        direction: 1,
        color: '#fff',
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        className: 'spinner',
        top: '25%'
      };

      var spinner = new Spinner(opts).spin();
      this.$el.append(spinner.el);
    }

  });

  return LoadingView;
});
