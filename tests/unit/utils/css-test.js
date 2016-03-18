import { module, test } from 'qunit';
import { box } from 'ember-cli-d3/utils/css';

module('Unit | Utility | css');

test('css#box', function(assert) {
  var checks = {
    '60': { top: 60, right: 60, bottom: 60, left: 60 },
    '20 30': { top: 20, right: 30, bottom: 20, left: 30 },
    '20 30 40': { top: 20, right: 30, bottom: 40, left: 30 },
    '20 30 40 50': { top: 20, right: 30, bottom: 40, left: 50 },
    '0': { top: 0, right: 0, bottom: 0, left: 0 },
    '0 10': { top: 0, right: 10, bottom: 0, left: 10 },
    '0 10 20 30': { top: 0, right: 10, bottom: 20, left: 30 }
  };
  var expr, expected, actual;

  for (expr in checks) {
    expected = checks[expr];
    actual = box(expr);

    assert.deepEqual(actual, expected, 'Behave same as CSS box model');
  }

  var asHash = box({
    top: 123,
    bottom: 456
  });

  assert.deepEqual(asHash, {
    top: 123,
    bottom: 456,
    left: 0,
    right: 0
  });

  assert.throws(() => {
    box('random');
  });

});
