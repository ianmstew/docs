define(function (require) {
  var Marionette = require('marionette'),
      AppController = require('app.controller'),
      history = require('lib/history'),
      app = new Marionette.Application();

  app.addRegions({
    headerRegion: '#header-region',
    contentRegion: '#content-region',
    footerRegion: '#footer-region',
    loadingRegion: '#loading-region'
  });

  // Hacky fix for stupid Facebook oauth redirect hash
  app.on('initialize:before', function () {
    if (window.location.hash == '#_=_') {
      history.replaceState 
          ? history.replaceState(null, null, window.location.href.split('#')[0])
          : window.location.hash = '';
    }
  });

  app.on('initialize:after', function () {
    history.start();
  });

  app.appController = new AppController({
    app: app
  });

  // any hyperlinks not tagged "data-bypass" will pass through router
  $(document).on('click', 'a:not([data-bypass])', function (evt) {
    var href = $(this).attr('href');

    if (href) {
      evt.preventDefault();
      history.navigate(href, true);
    }
  });

  return app;
});
