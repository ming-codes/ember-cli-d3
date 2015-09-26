import Ember from 'ember';
import AttachClassName from 'dummy/mixins/route-class';
import Gallery from 'dummy/mixins/gallery-route-mixin';

export default Ember.Route.extend(AttachClassName, Gallery, {
});
