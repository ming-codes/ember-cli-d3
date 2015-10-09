import Ember from 'ember';

const devicePixelRatio = window.devicePixelRatio || 1;

export default Ember.Object.extend({
  context: null,

  backingStorePixelRatio: Ember.computed('context', function () {
    var context = this.get('context');

    return context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio || 1;
  }).readOnly(),

  scaleRatio: Ember.computed('backingStorePixelRatio', function () {
    return devicePixelRatio / this.get('backingStorePixelRatio');
  }).readOnly(),

  call(component) {
    var element = this.get('element');
    var context = this.get('context');
    var width = component.get('width');
    var height = component.get('height');
    var backingStorePixelRatio = this.get('backingStorePixelRatio');
    var scaleRatio = this.get('scaleRatio');

    element.setAttribute('width', `${width * devicePixelRatio}px`);
    element.setAttribute('height', `${height * devicePixelRatio}px`);

    context.scale(scaleRatio, scaleRatio);

    return component.get('call').call(component, context, devicePixelRatio, backingStorePixelRatio, scaleRatio);
  }

});
