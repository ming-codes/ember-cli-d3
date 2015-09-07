import Ember from 'ember';

export default Ember.Mixin.create({
  activate() {
    Ember.$('body').addClass(this.toCssClass());
  },
  deactivate() {
    Ember.$('body').removeClass(this.toCssClass());
  },
  toCssClass() {
    return Ember.String.dasherize(this.routeName.replace(/\./g, '-'));
  }
});
