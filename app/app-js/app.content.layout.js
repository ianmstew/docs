define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!app.content.layout'),
      AppLayout;

  AppLayout = Marionette.Layout.extend({
    template: template,
    className: 'dashboard-wrapper',

    regions: {
      menuRegion: '#menu-region',
      mainRegion: '#main-region',
      alertRegion: '#alert-region'
    }
  });

  return AppLayout;
});
