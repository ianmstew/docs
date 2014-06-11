define(function (require) {
  var Backbone = require('backbone'),
      AlertModel;

  AlertModel = Backbone.Model.extend({

  	defaults: {
      title: 'Alert Title',
  		message: 'Alert message',
  		state: 'danger'  // {danger|warn|info|success}
  	}
  });

  return AlertModel;
});
