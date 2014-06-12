define(function (require) {
  var AppContentLayout = require('app.content.layout'),
      ModuleController = require('lib/module.controller'),
      AppController;

  AppController = ModuleController.extend({

    initialize: function () {
      this.app = this.options.app;
    },

    appEvents: {

      commands: {
        'region:header:showin':       'showInHeader',
        'region:footer:showin':       'showInFooter',
        'region:content:showin':      'showInContent',
        'region:content-alert:showin': 'showInContentAlert',
        'region:content-menu:showin': 'showInContentMenu',
        'region:content-main:showin': 'showInContentMain'
      }
    },

    appLayout: null,
    appLayoutShown: false,

    showInHeader: function (view) {
      this.app.headerRegion.show(view);
    },

    showInFooter: function (view) {
      this.app.footerRegion.show(view);
    },

    showInContent: function (view) {
      this.app.contentRegion.show(view);

      // showing a view in the contentRegion will destroy the appLayout
      this.appLayoutShown = false;
    },

    _showInContentRegion: function (showFn) {
      // don't re-render the layout if currently visible
      if (!this.appLayoutShown) {
        this.appLayout = new AppContentLayout();

        this.appLayout.on('render', function () {
          showFn();
        });

        this.app.contentRegion.show(this.appLayout);
      } else {
        showFn();
      }

      this.appLayoutShown = true;
    },

    showInContentAlert: function (view) {
      var self = this;

      this._showInContentRegion(function () {
        self.appLayout.alertRegion.show(view);
      });
    },

    showInContentMenu: function (view) {
      var self = this;

      this._showInContentRegion(function () {
        self.appLayout.menuRegion.show(view);
      });
    },

    showInContentMain: function (view) {
      var self = this;

      this._showInContentRegion(function () {
        self.appLayout.mainRegion.show(view);
      });
    }
  });

  return AppController;
});
