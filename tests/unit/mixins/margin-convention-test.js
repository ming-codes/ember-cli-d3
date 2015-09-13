import Ember from 'ember';
import MarginConventionMixin from 'ember-cli-d3/mixins/d3-support';

import { module, test } from 'qunit';

module('Unit | Mixin | margin convention');

test('Calculate content size based on set size and margin', assert => {
    var MarginConventionObject = Ember.Object.extend(MarginConventionMixin, {});
    var subject = MarginConventionObject.create({
      margin: '10 20 30 40',
      width: 400,
      height: 300
    });

    assert.equal(subject.get('contentWidth', 240));
    assert.equal(subject.get('contentHeight', 260));
});
