import Ember from 'ember';
import { request } from 'ic-ajax';

export default Ember.Service.extend(Ember.PromiseProxyMixin, {
  data: Ember.computed.alias('content'),

  init() {
    this._super(...arguments);

    this.set('promise', request('us.json'));
  }
});
