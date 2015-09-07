import { negative } from '../../../helpers/negative';
import { module, test } from 'qunit';

module('Unit | Helper | negative');

// Replace this with your real tests.
test('Negate numbers, allows numbers and string input', assert => {
  assert.equal(negative([ 42 ]), -42);
  assert.equal(negative([ '42' ]), -42);
  assert.equal(negative([ '-42' ]), 42);
  assert.equal(negative([ '##' ]), 0);
});
