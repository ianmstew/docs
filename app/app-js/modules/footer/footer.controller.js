define(function (require) {
  var ModuleController = require('lib/module.controller'),
      FooterView = require('modules/footer/footer.view'),
      appChannel = require('app.channel'),
      FooterController;

  FooterController = ModuleController.extend({

    initialize: function () {
      var footerView = new FooterView();
      appChannel.commands.execute('region:footer:showin', footerView);
    }
  });

  return FooterController;
});
