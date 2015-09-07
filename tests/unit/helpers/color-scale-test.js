import { colorScale } from '../../../helpers/color-scale';
import { module, test } from 'qunit';
import d3 from 'd3';

module('Unit | Helper | color scale');

test('Scales preset on d3.scale.* can be accessed as alias', assert => {
  var checks = [
    [ colorScale([ 'category10' ]).range(), d3.scale.category10().range() ],
    [ colorScale([ 'category20' ]).range(), d3.scale.category20().range() ],
    [ colorScale([ 'category20b' ]).range(), d3.scale.category20b().range() ],
    [ colorScale([ 'category20c' ]).range(), d3.scale.category20c().range() ]
  ];

  checks.forEach(([ actual, expected ]) => {
    assert.deepEqual(actual, expected);
  });

});

test('Pass in custom color hex for custom color scale', assert => {
  var checks = [
    [ colorScale([ '#fff', '#f00' ]).range(), [ '#fff', '#f00' ] ],
    [ colorScale([ '#00f', '#f00' ]).range(), [ '#00f', '#f00' ] ]
  ];

  checks.forEach(([ actual, expected ]) => {
    assert.deepEqual(actual, expected);
  });

});
