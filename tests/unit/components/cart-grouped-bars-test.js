import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('cart-grouped-bars', 'Unit | Component | cart grouped bars', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true,

  beforeEach() {
    this.subject().setProperties({
      width: 800,
      height: 600,

      margin: '20 30 40 50'
    });
  }
});

test('margin-convention#contentWidth', function(assert) {
  assert.equal(this.subject().get('contentWidth'), 720);
});

test('margin-convention#contentHeight', function(assert) {
  assert.equal(this.subject().get('contentHeight'), 540);
});
