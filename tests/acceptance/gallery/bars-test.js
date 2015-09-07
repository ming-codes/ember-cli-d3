import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../../tests/helpers/start-app';

module('Acceptance | gallery/bars', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /gallery/bars', function(assert) {
  visit('/gallery/bars');

  andThen(function() {
    assert.equal(currentURL(), '/gallery/bars');
  });
});
