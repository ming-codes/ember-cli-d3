import Ember from 'ember';

export default Ember.Mixin.create({
  tagName: '',

  select: null,
  model: null,

  didRender() {
    var selection = this.get('select');

    if (selection) {
      if (Ember.typeOf(selection) === 'instance') {
        selection = selection.get('$el');
      }

      this.get('call').call(this, selection);
    }
  }

});

