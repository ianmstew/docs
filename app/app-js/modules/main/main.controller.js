define(function (require) {
  var ModuleController = require('lib/module.controller'),
      MainShowController = require('modules/main/show/main.show.controller'),
      appChannel = require('app.channel'),
      MainController;

  MainController = ModuleController.extend({

    routes: {
      '': 'showMain',
      'main': 'showMain'
    },

    appEvents: {
      commands: {
        'main:show': 'showMain'
      }
    },

    mainShowController: null,

    initialize: function () {
      this.mainShowController = new MainShowController();
    },

    showMain: function () {
      this.mainShowController.showMain();
      appChannel.commands.execute('menu:show');
    }
  });

  return MainController;
});
