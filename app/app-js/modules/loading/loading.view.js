define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/loading/loading.view'),
      LoadingView;

  LoadingView = Marionette.ItemView.extend({
    template: template,
    className: 'loading-modal',

    /*
    onShow: function() {
      var spinner = new Spinner().spin();
      target.appendChild(spinner.el);
    }
    */
    
  });

  return LoadingView;
});
