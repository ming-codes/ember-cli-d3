
import { timer, type } from '../ext/d3';

export function initialize(/* container, application */) {
  timer();
  type();
}

export default {
  name: 'd3',
  initialize: initialize
};
