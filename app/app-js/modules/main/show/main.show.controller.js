define(function (require) {
  var Marionette = require('marionette'),
      MainView = require('modules/main/show/main.show.view'),
      appChannel = require('app.channel'),
      MainShowController;

  MainShowController = Marionette.Controller.extend({

    showMain: function () {
      var mainView = new MainView();
      appChannel.commands.execute('region:content-main:showin', mainView);
    }
  });

  return MainShowController;
});
