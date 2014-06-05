define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/menu/list/menu.list.view'),
      MenuListView;

  MenuListView = Marionette.ItemView.extend({
    template: template,
    id: 'accordion',
    className: 'panel-group',
    /*
    events: {
      'click a': 'dataTypeSelected'
    }

    dataTypeSelected: function() {
      console.log("This is working!");
      $(".list-data-type a").click(function (e) {
        $(".list-data-type a")
          .addClass("types-selected")
          .not(this).removeClass("types-selected");
      });
    }
    */

    onShow: function() {
      $(".list-data-type a").click(function (e) {
        $(".list-data-type a")
          .addClass("types-selected")
          .not(this).removeClass("types-selected");
      });
    }
  });

  return MenuListView;
});
