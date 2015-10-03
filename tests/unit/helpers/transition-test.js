import SelectionProxy from 'ember-cli-d3/system/selection-proxy';
import { transition } from '../../../helpers/transition';
import { module, test } from 'qunit';

module('Unit | Helper | transition');

test('empty selection should not throw', assert => {
  assert.expect(0);

  transition([], {});
});

test('apply d3 transition options when set', assert => {
  var svg = SelectionProxy.create({ element: document.createElement('div') });
  var delay = Math.floor(Math.random() * 1000);
  var duration = Math.floor(Math.random() * 1000);
  var sel = transition([ svg.get('select.chart') ], { delay, duration }).get('selection');

  assert.equal(delay, sel.delay());
  assert.equal(duration, sel.duration());
});
