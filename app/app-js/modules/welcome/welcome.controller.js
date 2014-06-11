define(function (require) {
  var ModuleController = require('lib/module.controller'),
      StartView = require('modules/welcome/welcome.view'),
      appChannel = require('app.channel'),
      WelcomeController;

  WelcomeController = ModuleController.extend({

    routes: {
      '': 'showWelcome'
    },

    appEvents: {
      vent: {
        'welcome:show': 'showWelcome'
      }
    },

    showWelcome: function () {
      var startView = new StartView();
      appChannel.vent.trigger('menu:show');
      appChannel.commands.execute('region:content-main:showin', startView);
    }
  });

  return WelcomeController;
});
