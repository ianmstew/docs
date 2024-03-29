define(function (require) {
  var Backbone = require('backbone'),
      AlertModel;

  AlertModel = Backbone.Model.extend({

  	defaults: {
      title: 'Alert Title',
  		message: 'Alert message',
  		state: 'danger',  // {danger|warn|info|success}
      uniqueGroup: null,
      uniqueValue: null
  	},

    hash: function () {
      return this.get('title') + this.get('message');
    }
  });

  return AlertModel;
});
