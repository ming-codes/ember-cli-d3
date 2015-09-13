import Ember from 'ember';
import GraphicSupportMixin from 'ember-cli-d3/mixins/d3-support';
import { module, test } from 'qunit';
import { hasGlimmer } from 'ember-cli-d3/utils/version';
import { make } from 'dummy/tests/helpers/graph';

module('Unit | Mixin | d3 support');

if (!hasGlimmer) {
  test('Drive calls with binding if no glimmer', function(assert) {
    var count = 0;
    var GraphicSupportObject = Ember.Object.extend(GraphicSupportMixin, {
      select: d3.select(make.svg()),
      target: 'abc',
      boundBinding: 'target',
      call() {
        count++;
      }
    });
    var subject = GraphicSupportObject.create();

    assert.equal(subject.get('target'), 'abc');
    assert.equal(subject.get('bound'), 'abc');

    Ember.run.begin();
    subject.set('target', 'efg');
    subject.set('target', '123');
    Ember.run.end();

    assert.equal(subject.get('target'), '123');
    assert.equal(subject.get('bound'), '123');

    assert.equal(count, 1);
  });
}
