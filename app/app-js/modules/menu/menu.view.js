define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/menu/menu.view'),
      MenuListView;

  MenuListView = Marionette.ItemView.extend({
    template: template,
    id: 'servicesMenu',
    className: 'panel-group',

    events: {
      'click a': 'dataTypeClicked'
    },

    dataTypeClicked: function (evt) {
      this.$('.types-selected').removeClass('types-selected');
      $(evt.target).toggleClass('types-selected');
    },

    onShow: function () {
      $('.list-data-type a').click(function (e) {
        $('.list-data-type a')
          .addClass('types-selected')
          .not(this).removeClass('types-selected');
      });
    },

    onOpenService: function (service) {
      this.$('#' + service + 'DataTypes')
        .addClass('in')
        .css('height', 'auto');
    },

    onSelectUriClass: function (service, uriClass) {
      $('a[href="tryUri/' + service + '/' + uriClass + '"')
        .addClass('types-selected');
    }
  });

  return MenuListView;
});
