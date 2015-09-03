import { helper } from '../utils/version';

export function negative([ num ]) {
  return (Number(num) || 0) * -1;
}

export default helper(negative);
