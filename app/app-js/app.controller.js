define(function (require) {
  var AppContentLayout = require('app.content.layout'),
      ModuleController = require('lib/module.controller'),
      history = require('lib/history'),
      AppController;

  AppController = ModuleController.extend({

    initialize: function () {
      this.app = this.options.app;
    },

    appEvents: {
      commands: {
        'showin:headerRegion':  'showInHeaderRegion',
        'showin:footerRegion':  'showInFooterRegion',
        'showin:contentRegion': 'showInContentRegion',
        'showin:alertRegion':   'showInAlertRegion',
        'showin:menuRegion':    'showInMenuRegion',
        'showin:mainRegion':    'showInMainRegion',
        'showin:loadingRegion': 'showInLoadingRegion',
        'close:loadingRegion':  'closeLoadingRegion'
      }
    },

    appLayout: null,
    appLayoutShown: false,

    showInLoadingRegion: function (view) {
      this.app.loadingRegion.show(view);
    },

    closeLoadingRegion: function () {
      this.app.loadingRegion.close();
    },

    showInHeaderRegion: function (view) {
      this.app.headerRegion.show(view);
    },

    showInFooterRegion: function (view) {
      this.app.footerRegion.show(view);
    },

    showInContentRegion: function (view) {
      this.app.contentRegion.show(view);

      // showing a view in the contentRegion will destroy the appLayout
      this.appLayoutShown = false;
    },

    _showInContentRegion: function (showFn) {
      // don't re-render the layout if currently visible
      if (!this.appLayoutShown) {
        this.appLayout = new AppContentLayout();

        this.listenTo(this.appLayout, 'render', function () {
          showFn();
        });

        this.app.contentRegion.show(this.appLayout);
      } else {
        showFn();
      }

      this.appLayoutShown = true;
    },

    showInAlertRegion: function (view) {
      var self = this;

      this._showInContentRegion(function () {
        self.appLayout.alertRegion.show(view);
      });
    },

    showInMenuRegion: function (view) {
      var self = this;

      this._showInContentRegion(function () {
        self.appLayout.menuRegion.show(view);
      });
    },

    showInMainRegion: function (view) {
      var self = this;

      this._showInContentRegion(function () {
        self.appLayout.mainRegion.show(view);
      });
    }
  });

  return AppController;
});
