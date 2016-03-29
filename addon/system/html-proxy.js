import Ember from 'ember';

export default Ember.Object.extend({
  call(component) {
    var element = this.get('element');

    return component.get('call').call(component, element);
  }

});
