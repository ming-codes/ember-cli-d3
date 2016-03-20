import Ember from 'ember';

export default Ember.Service.extend(Ember.PromiseProxyMixin, {
  data: Ember.computed.alias('content'),
  ajax: Ember.inject.service(),

  init() {
    this._super(...arguments);

    this.set('promise', this.get('ajax').request('us.json'));
  }
});
