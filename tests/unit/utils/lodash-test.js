import { module, test } from 'qunit';
import { scan } from 'ember-cli-d3/utils/lodash';

module('Unit | Utility | lodash');

// Replace this with your real tests.
test('lodash#scan', function(assert) {
  var actual, expected;

  actual = scan([ 1, 4, 2, 3, 10 ], ((prev, cur) => prev + cur), 0);
  expected = [ 1, 5, 7, 10, 20 ];

  assert.deepEqual(actual, expected);

  actual = scan([ 1, 4, 2, 3, 10 ], ((prev, cur) => prev + cur));
  expected = [ undefined, 5, 7, 10, 20 ];

  assert.deepEqual(actual, expected);
});
