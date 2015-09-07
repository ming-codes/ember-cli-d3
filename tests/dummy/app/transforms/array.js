import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    return (Ember.typeOf(serialized) === 'array') ? serialized : [];
  },

  serialize: function(deserialized) {
    switch (Ember.typeOf(deserialized)) {
      case 'array': return deserialized;
      case 'string': return deserialized.split(',').map(item => item.trim());
      default: return [];
    }
  }
});
