import d3 from 'd3';
import { helper } from '../utils/version';

function makeColorScale(colors) {
  return d3.scale.ordinal().range(colors);
}

export function colorScale(colors) {
  var [ alias ] = colors;

  return (d3.scale[alias] || makeColorScale)(colors);
}

export default helper(colorScale);
