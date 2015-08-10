import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('cart-area/component', 'Unit | Component | cart area/component.js', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('it renders', function(assert) {
  assert.expect(1);

  // Creates the component instance
  var component = this.subject();
  // Renders the component to the page
  this.render();
  //assert.equal(this.$().text(), '');
});
