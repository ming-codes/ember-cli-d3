import { module, test } from 'qunit';

import config from 'dummy/config/environment';

module('Unit | Plugins');

config.d3.plugins.forEach(plugin => {
  test(`${plugin} loaded`, assert => {
    /* global require */
    assert.ok(!!require(plugin).default, `${plugin} imported`);
  });
});
