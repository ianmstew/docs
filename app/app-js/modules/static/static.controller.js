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
      history          = require('lib/history'),
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

    appEvents: {
      'show:about': 'showAbout',
      'show:help': 'showHelp',
      'show:contact': 'showContact',
      'show:legal': 'showLegal',
      'show:privacy': 'showPrivacy',
      'show:tos': 'showTos',
      'show:imap': 'showImap'
    },

    showAbout: function () {
      var aboutView = new AboutView();
      appChannel.commands.execute('showin:contentRegion', aboutView);
      history.navigate('about');
    },

    showHelp: function () {
      var helpView = new HelpView();
      appChannel.commands.execute('showin:contentRegion', helpView);
      history.navigate('help');
    },

    showContact: function () {
      var aboutView = new ContactView();
      appChannel.commands.execute('showin:contentRegion', aboutView);
      history.navigate('contact');
    },

    showLegal: function () {
      var aboutView = new LegalView();
      appChannel.commands.execute('showin:contentRegion', aboutView);
      history.navigate('legal');
    },

    showPrivacy: function () {
      var aboutView = new PrivacyView();
      appChannel.commands.execute('showin:contentRegion', aboutView);
      history.navigate('privacy');
    },

    showTos: function () {
      var aboutView = new TosView();
      appChannel.commands.execute('showin:contentRegion', aboutView);
      history.navigate('tos');
    },

    showImap: function () {
      var imapView = new ImapView();
      appChannel.commands.execute('showin:contentRegion', imapView);
      history.navigate('imap');
    }
  });

  return StaticController;
});
