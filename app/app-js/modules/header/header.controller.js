define(function (require) {
  var ModuleController = require('lib/module.controller'),
      HeaderView = require('modules/header/header.view'),
      appChannel = require('app.channel'),
      HeaderController;

  HeaderController = ModuleController.extend({

    initialize: function () {
      var headerView = new HeaderView();
      appChannel.commands.execute('showin:headerRegion', headerView);
    }
  });

  return HeaderController;
});
