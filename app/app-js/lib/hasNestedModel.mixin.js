define(function (require) {
  var Backbone = require('backbone');

  function HasNested(model) {
    model.__originalGet = model.get;
    model.__originalSet = model.set;
    model.get = this.get;
    model.set = this.set;
  }

  _.extend(HasNested.prototype, {
    /*
     * Backbone.Model.set() override that sniffs out child Backbone Models and bubbles up events.
     * Accepts the same parameters as Backbone.Model.set().
     */
    set: function (key, val, options) {
      var self = this,
          attrs;
      if (key == null) return this;

      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      // Iterate through each new attribute:value pair
      _.each(attrs, function (val, attr) {
        var childModel,
            childName;

        // If new attribute is a Backbone Model, bubble up change events
        if (val instanceof Backbone.Model) {
          childName = attr;
          childModel = val;

          // Must listen to all events to capture property changes as well
          self.listenTo(childModel, 'all', function (childEvent) {
            var changePrefix = 'change',
                changeSuffix,
                eventArgs,
                event;

            // If I'm a change event, prefix my name and bubble up
            if (childEvent.indexOf(changePrefix) === 0) {

              // Capture property change
              if (childEvent.length > changePrefix.length) {
                changeSuffix = childEvent.substring(changePrefix.length + 1);
              }

              // Preserve original arguments and create new event
              eventArgs = Array.prototype.slice.call(arguments, 1);
              event = changePrefix + ':' + childName + (changeSuffix ? ':' + changeSuffix : '');

              // Bubble event
              self.trigger.apply(self, [event].concat(eventArgs));
            }
          });
        }
      });

      // Continue with original set behavior
      return this.__originalSet.apply(this, arguments);
    },

    /*
     * Backbone.Model.get() override that assumes dot-notation naming for nested models.
     * Accepts the same parameters as Backbone.Model.get().
     */
    get: function (key) {
      var dotIndex,
          modelKey,
          modelAttribute,
          model;

      // If period appears within key, assume a nested model
      if ((dotIndex = key.indexOf('.')) >= 0) {

        // Parse up to the first period for the child model key
        modelKey = key.substring(0, dotIndex);

        // The model attribute is everything afterward, including deeper dot-references
        modelAttribute = key.substring(dotIndex + 1);

        // Get the child model, and if not a true Backbone.Model throw an exception
        model = this.get(modelKey);
        if (!(model instanceof Backbone.Model)) {
          throw new Error(modelKey + ' is not a Model');
        }

        // Return the requested attribute from child.  This will work recursively on deeper
        // references if descendant get() methods are also overridden.
        return model.get(modelAttribute);
      } else {

        // Perform originally-defined get
        return this.__originalGet.apply(this, arguments);
      }
    }
  });

  return HasNested;
});
