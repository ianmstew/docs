define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/static/imap/imap.view'),
      ImapView;

  ImapView = Marionette.ItemView.extend({
    template: template,
    className: 'main-content'
  });

  return ImapView;
});
