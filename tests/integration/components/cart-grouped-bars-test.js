import d3 from 'd3';
import Ember from 'ember';
import { dimensional } from 'dummy/tests/helpers/data-generator';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import graph from 'dummy/tests/helpers/graph';

moduleForComponent('cart-grouped-bars', 'Integration | Component | cart grouped bars', {
  integration: true
});

test('it renders alone', function(assert) {
  let source = Ember.getOwner(this).lookup('service:dimensional-data-source');
  let model = source.get('crossSectionModel');

  return graph(this, assert)
    .update('model', model)
    .render(hbs`
      {{#data-visual as |ctx width height|}}
        {{#cart-grouped-bars id="bars" select=(transition ctx.svg.select.chart) model=model width=width height=height
              margin="10 60 20 10" stroke=(color-scale "category10")
            as |selection x-scale y-scale width height|}}

          {{cart-axis select=(transition ctx.svg.select.chart.x-axis) scale=x-scale
            orient="bottom" tickSize=(negative height)
          }}
          {{cart-axis select=(transition ctx.svg.select.chart.y-axis) scale=y-scale
            orient="right" tickSize=(negative width)
            transform=(translate width)
          }}

        {{/cart-grouped-bars}}
      {{/data-visual}}
    `)
    .transitioning('.series, .bar, .shape')
    .assert('bars', (selection) => {
      var data = this.get('model.data');

      selection.selectAll('.series').each(function ({ metricPath }) {
        assert.deepEqual(d3.select(this).selectAll('.bar').data(), data, `${metricPath} data not bound`);
      });
    })
    .update('test', 'abc');
});
