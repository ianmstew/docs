define(function (require) {
  var Backbone = require('backbone'),
      history;

  history = {

    start: function () {
      Backbone.history.start();
    },

    navigate: function (route, options) {
      Backbone.history.navigate(route, options);
    },

    getCurrentRoute: function () {
      return Backbone.history.fragment;
    }
  };

  return history;
});
