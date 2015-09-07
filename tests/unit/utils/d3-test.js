import { module, test } from 'qunit';
import { guid, accessor, assign, translateX, rotate, join } from 'ember-cli-d3/utils/d3';

import d3 from 'd3';

module('Unit | Utility | d3');

test('d3#guid', assert => {
  var guids = d3.range(10)
    .map(guid)
    .map(guid => guid.substring(13))
    .map(Number);

  var checker = d3.range(guids[0], guids[guids.length - 1] + 1, 1);

  assert.deepEqual(guids, checker, 'Guids are uniq and in sequence');
});

test('d3#accessor', assert => {
  var checker = Math.random();
  var nested = {
    shallow: checker,
    path1: {
      path2: {
        path3: {
          prop: checker
        }
      }
    }
  };

  assert.equal(accessor('shallow')(nested), checker, 'Accessor can access shallow property');
  assert.equal(accessor('path1.path2.path3.prop')(nested), checker, 'Accessor can access deep property');
});

test('d3#assign', assert => {
  var assignable = d3.svg.axis();
  var properties = {
    orient: 'right',
    innerTickSize: 10,
    outerTickSize: 20
  };

  assign(assignable, properties);

  assert.equal(assignable.orient(), properties.orient, '`orient` assigned');
  assert.equal(assignable.innerTickSize(), properties.innerTickSize, '`innerTickSize` assigned');
  assert.equal(assignable.outerTickSize(), properties.outerTickSize, '`outerTickSize` assigned');

});

test('d3#translateX', assert => {
  assert.equal(translateX(d3.functor(10))(), 'translate(10 0)', '`translateX` accepts functions');
  assert.equal(translateX(10)(), 'translate(10 0)', '`translateX` accepts number also');
});

test('d3#rotate', assert => {
  assert.equal(rotate(d3.functor(10))(), 'rotate(10)', '`rotate` accepts functions');
  assert.equal(rotate(10)(), 'rotate(10)', '`rotate` accepts number also');
});

test('d3#join.parseDataExpr', assert => {
  var { dataPath, keyPath } = join.parseDataExpr('path.to.data[path.to.key]');
  var { inlineData } = join.parseDataExpr([ 1, 2, 3 ]);

  assert.equal(dataPath, 'path.to.data', 'Parsed data path');
  assert.equal(keyPath, 'path.to.key', 'Parsed key path');
  assert.deepEqual(inlineData, [ 1, 2, 3 ], 'Allow inline data');
});

test('d3#join.parseCssExpr', assert => {
  var { tagName, cssName } = join.parseCssExpr('rect.bar');

  assert.equal(tagName, 'rect', 'Parsed tagName');
  assert.equal(cssName, 'bar', 'Parsed class name');
});

//test('d3#join', assert => {
//});
