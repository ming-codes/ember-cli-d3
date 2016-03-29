import Ember from 'ember';
import d3 from 'd3';

export default Ember.Object.extend({
  select: Ember.computed('element', function() {
    return d3.select(this.get('element'));
  }).readOnly(),
  
  call(component) {
    var element = this.get('element');

    return component.get('call').call(component, element);
  }

});
