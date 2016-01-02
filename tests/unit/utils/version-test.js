
import Ember from 'ember';
import { module, test } from 'qunit';
import { computed } from 'ember-cli-d3/utils/version';

module('Unit | Utility | version');

test('#computed', function (assert) {
  let checker = Math.random();
  let subject = Ember.Object.extend({
    testTarget: null,

    testGetter: computed('testTarget', function (name) {
      return this.get('testTarget');
    }),
    testSetter: computed(function (name, newValue) {
      return newValue;
    })
  }).create({});

  subject.set('testTarget', checker);

  assert.equal(subject.get('testGetter'), checker, 'Getter only has getter working');

  checker = Math.random();

  subject.set('testGetter', checker);

  assert.equal(subject.get('testGetter'), checker, 'Getter only has setter working');

  subject.set('testSetter', checker);

  assert.equal(subject.get('testSetter'), checker, 'Setter has setter working');

});
