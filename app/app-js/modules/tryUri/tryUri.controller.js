define(function (require) {
  var ModuleController = require('lib/module.controller'),
      TryUriView = require('modules/tryUri/tryUri.view'),
      appChannel = require('app.channel'),
      TryUriController;

  TryUriController = ModuleController.extend({

    initialize: function () {
      var tryUriView = new TryUriView();
      appChannel.commands.execute('region:tryUri:showin', tryUriView);
    }
  });

  return TryUriController;
});
