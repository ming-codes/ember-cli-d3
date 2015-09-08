import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../../tests/helpers/start-app';

module('Acceptance | gallery/bars', {
  beforeEach() {
    this.application = startApp();
  },

  afterEach() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /gallery/bars', assert => {
  visit('/gallery/bars');

  andThen(() => {
    var bars = Ember.$('#ember-testing .visual-content .bar .shape')
      .toArray()
      .map(bar => bar.__transition__);

    assert.equal(currentURL(), '/gallery/bars');
    assert.equal(bars.length, 8, '8 bars rendered');

    bars.forEach((checkThis) => {
      assert.ok(!checkThis, 'Found bar still transitioning');
    });

  });

});
