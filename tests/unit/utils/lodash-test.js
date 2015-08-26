import { module, test } from 'qunit';
import { identity, flow, scan, wrap } from 'ember-cli-d3/utils/lodash';

module('Unit | Utility | lodash');

test('lodash#identity', function(assert) {
  var idFns = [ 0, 1, 2, 3 ].map(identity);
  var checker = Math.random();

  assert.equal(idFns[0](checker), checker, 'Identity at index 0');
  assert.equal(idFns[1](null, checker), checker, 'Identity at index 1');
  assert.equal(idFns[2](null, null, checker), checker, 'Identity at index 2');
  assert.equal(idFns[3](null, null, null, checker), checker, 'Identity at index 3');
});

test('lodash#flow', function(assert) {
  var checker = Math.random();

  flow(
    (hi => 'Hello' + checker),
    (hi => hi + 'World!'),
    function (arg) {
      assert.equal(arg, `Hello${checker}World!`);
    }
  )(checker);
});

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

test('lodash#wrap', function(assert) {
  var args = [ Math.random(), Math.random() ].map(String);
  var wrappee = function (arg) {
    assert.equal(arg, args[0], 'Check wrappee received');
    return args[0];
  };
  var wrapper = wrap(wrappee, function (fn, ...args2) {
    assert.deepEqual(args2, args, 'Check wrapped arguments');
    return fn.apply(this, args2);
  });
  var result = wrapper(args[0], args[1]);

  assert.equal(result, args[0], 'Check return value');
});
