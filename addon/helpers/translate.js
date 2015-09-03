import { helper } from '../utils/version';

export function translate([ x, y ]) {
  return `translate(${x || 0} ${y || 0})`;
}

export default helper(translate);
