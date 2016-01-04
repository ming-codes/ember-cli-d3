import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('cart-grouped-bars', 'Unit | Component | cart grouped bars', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true,

  beforeEach() {
    this.subject().setProperties({
      width: 800,
      height: 600
    });
  }
});

test('mixins/margin-convention', function (assert) {
  let subject = this.subject();

  assert.equal(subject.get('contentWidth'), 680);
  assert.equal(subject.get('contentHeight'), 480);

  subject.set('margin', '20 30 40 50');

  assert.equal(this.subject().get('contentWidth'), 720);
  assert.equal(this.subject().get('contentHeight'), 540);
});
