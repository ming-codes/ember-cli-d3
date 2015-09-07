import { translate } from '../../../helpers/translate';
import { module, test } from 'qunit';

module('Unit | Helper | translate');

// Replace this with your real tests.
test('Convert param array to transform string', assert => {
  assert.equal(translate([]), 'translate(0 0)');
  assert.equal(translate([ 5 ]), 'translate(5 0)');
  assert.equal(translate([ 10, 10 ]), 'translate(10 10)');
});
