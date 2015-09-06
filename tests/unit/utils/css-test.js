import { module, test } from 'qunit';
import { box } from 'ember-cli-d3/utils/css';

module('Unit | Utility | css');

test('css#box', function(assert) {
  var checks = {
    '60': { top: 60, right: 60, bottom: 60, left: 60 },
    '20 30': { top: 20, right: 30, bottom: 20, left: 30 },
    '20 30 40': { top: 20, right: 30, bottom: 40, left: 30 },
    '20 30 40 50': { top: 20, right: 30, bottom: 40, left: 50 }
  };
  var expr, expected, actual;

  for (expr in checks) {
    expected = checks[expr];
    actual = box(expr);

    assert.deepEqual(actual, expected, 'Behave same as CSS box model');
  }
});
