define(function (require) {
  var ModuleController = require('lib/module.controller'),
      AboutView        = require('modules/static/about/about.view'),
      HelpView         = require('modules/static/help/help.view'),
      ContactView      = require('modules/static/contact/contact.view'),
      LegalView        = require('modules/static/legal/legal.view'),
      PrivacyView      = require('modules/static/privacy/privacy.view'),
      TosView          = require('modules/static/tos/tos.view'),
      ImapView         = require('modules/static/imap/imap.view'),
      appChannel       = require('app.channel'),
      StaticController;

  StaticController = ModuleController.extend({

    routes: {
      'about': 'showAbout',
      'help': 'showHelp',
      'contact': 'showContact',
      'legal': 'showLegal',
      'privacy': 'showPrivacy',
      'tos': 'showTos',
      'imap': 'showImap'
    },

    showAbout: function () {
      var aboutView = new AboutView();
      appChannel.commands.execute('region:content:showin', aboutView);
    },

    showHelp: function () {
      var helpView = new HelpView();
      appChannel.commands.execute('region:content:showin', helpView);
    },

    showContact: function () {
      var aboutView = new ContactView();
      appChannel.commands.execute('region:content:showin', aboutView);
    },

    showLegal: function () {
      var aboutView = new LegalView();
      appChannel.commands.execute('region:content:showin', aboutView);
    },

    showPrivacy: function () {
      var aboutView = new PrivacyView();
      appChannel.commands.execute('region:content:showin', aboutView);
    },

    showTos: function () {
      var aboutView = new TosView();
      appChannel.commands.execute('region:content:showin', aboutView);
    },

    showImap: function () {
      var imapView = new ImapView();
      appChannel.commands.execute('region:content:showin', imapView);
    }
  });

  return StaticController;
});
