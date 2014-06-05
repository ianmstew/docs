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
        'region:tryUri:showin':       'showInTryUri',
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

    showInTryUri: function (view) {
      this.app.contentRegion.show(view);

      // showing a view in the contentRegion will destroy the appLayout
      this.appLayoutShown = false;
    },

    showInContentMenu: function (view) {
      var self = this;

      // don't re-render the layout if currently visible
      if (!this.appLayoutShown) {
        this.appLayout = new AppContentLayout();

        this.appLayout.on('render', function () {
          self.appLayout.menuRegion.show(view);
        });

        this.app.contentRegion.show(this.appLayout);
      } else {
        this.appLayout.menuRegion.show(view);
      }

      this.appLayoutShown = true;
    },

    showInContentMain: function (view) {
      var self = this;

      // don't re-render the layout if currently visible
      if (!this.appLayoutShown) {
        this.appLayout = new AppContentLayout();

        this.appLayout.on('render', function () {
          self.appLayout.mainRegion.show(view);
        });

        this.app.contentRegion.show(this.appLayout);
      } else {
        this.appLayout.mainRegion.show(view);
      }

      this.appLayoutShown = true;
    }
  });

  return AppController;
});
