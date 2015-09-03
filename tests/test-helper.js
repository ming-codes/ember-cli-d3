import resolver from './helpers/resolver';
import { setResolver } from 'ember-qunit';
import { initialize } from 'dummy/initializers/ember-cli-auto-register-helpers';

initialize();

setResolver(resolver);
