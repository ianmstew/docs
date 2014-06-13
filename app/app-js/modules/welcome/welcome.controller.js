define(function (require) {
  var ModuleController = require('lib/module.controller'),
      StartView = require('modules/welcome/welcome.view'),
      appChannel = require('app.channel'),
      history = require('lib/history'),
      WelcomeController;

  WelcomeController = ModuleController.extend({

    routes: {
      '': 'showWelcome'
    },

    appEvents: {
      vent: {
        'show:welcome': 'showWelcome'
      }
    },

    showWelcome: function () {
      var startView = new StartView();
      appChannel.vent.trigger('show:menu');
      appChannel.commands.execute('showin:main', startView);
      history.navigate('');
    }
  });

  return WelcomeController;
});
