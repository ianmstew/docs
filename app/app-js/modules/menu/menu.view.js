define(function (require) {
  var Marionette = require('marionette'),
      MenuPanelView = require('modules/menu/menuPanel/menuPanel.view'),
      MenuView;

  MenuView = Marionette.CollectionView.extend({
    
    itemView: MenuPanelView,
    id: 'servicesMenu'
  });

  return MenuView;
});
