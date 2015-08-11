import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('cart-area/component', 'Unit | Component | cart-area', {
  unit: true
});

test('cart-area#contentWidth', function(assert) {
  var component = this.subject({
    width: 300,
    height: 150,
    margin: '0 20 0 30'
  });

  assert.equal(component.get('contentWidth'), 250);
});

test('cart-area#contentHeight', function(assert) {
  var component = this.subject({
    width: 300,
    height: 150,
    margin: '2 20 15 30'
  });

  assert.equal(component.get('contentHeight'), 133);
});
