define(function (require) {
  var Backbone = require('backbone'),
  		AlertModel = require('entities/alert/alert.model'),
      AlertCollection;

  AlertCollection = Backbone.Collection.extend({

  	model: AlertModel,

  	fetch: function (opts) {
			opts.success([
	      { message: 'alert danger', state: 'danger' },
	      { message: 'alert warn', state: 'warn' },
	      { message: 'alert info', state: 'info' },
        { message: 'alert success', state: 'success' }
			]);
  	}
  });

  return AlertCollection;
});
