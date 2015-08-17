import Ember from 'ember';
import D3SupportMixin from 'ember-cli-d3/mixins/d3-support';
import { module, test } from 'qunit';

module('Unit | Mixin | d3 support');

// Replace this with your real tests.
test('it works', function(assert) {
  var D3SupportObject = Ember.Object.extend(D3SupportMixin);
  var subject = D3SupportObject.create();
  assert.ok(subject);
});
