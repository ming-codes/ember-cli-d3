import resolver from './helpers/resolver';
import { setResolver } from 'ember-qunit';
import { hasGlimmer } from 'ember-cli-d3/utils/version';

if (!hasGlimmer) {
  /* global require */
  require('dummy/initializers/ember-cli-auto-register-helpers')
    .initialize();
}

setResolver(resolver);
