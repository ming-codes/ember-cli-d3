
import Ember from 'ember';

import { module, test } from 'qunit';

import d3 from 'd3';

module('Unit | Extensions', {
  beforeEach() {
    this.rect = d3.select('#ember-testing')
      .append('svg')
      .append('rect');
  },

  afterEach() {
    this.rect.remove();
    this.rect = null;
  }
});

test('d3.selection.prototype#style string setter', function (assert) {
  let expected = 'rgb(0, 0, 0)';
  let actual = this.rect
    .style('fill', expected)
    .style('fill');

  assert.equal(actual, expected);
});

test('d3.selection.prototype#style hash setter', function (assert) {
  let expected = 'rgb(0, 0, 0)';
  let actual = this.rect
    .style({ fill: expected })
    .style('fill');

  assert.equal(actual, expected);
});

test('d3.selection.prototype#style set url as string', function (assert) {
  let expected = `url(${location.pathname}${location.search}#target)`;
  let actual = this.rect
    .style('fill', 'url(#target)')
    .style('fill');

  assert.equal(actual, expected);
});

test('d3.selection.prototype#style set url as hash', function (assert) {
  let expected = `url(${location.pathname}${location.search}#target)`;
  let actual = this.rect
    .style({ 'fill': 'url(#target)' })
    .style('fill');

  assert.equal(actual, expected);
});

test('d3.transition.prototype#style string setter', function (assert) {
  return new Ember.RSVP.Promise(resolve => {
    let expected = 'rgb(255, 255, 255)';

    this.rect
      .style('fill', 'rgb(0, 0, 0)')
      .transition()
      .style('fill', expected)
      .each('end', function () {
        let actual = d3.select(this).style('fill');

        assert.equal(actual, expected);

        resolve();
      });
  });
});

test('d3.transition.prototype#style hash setter', function (assert) {
  return new Ember.RSVP.Promise(resolve => {
    let expected = 'rgb(255, 255, 255)';

    this.rect
      .style({ fill: 'rgb(0, 0, 0)' })
      .transition()
      .style({ fill: expected })
      .each('end', function () {
        let actual = d3.select(this).style('fill');

        assert.equal(actual, expected);

        resolve();
      });
  });
});

test('d3.selection.prototype#attr string setter', function (assert) {
  let expected = 'classy';
  let actual = this.rect
    .attr('class', expected)
    .attr('class');

  assert.equal(actual, expected);
});

test('d3.selection.prototype#attr hash setter', function (assert) {
  let expected = 'classy';
  let actual = this.rect
    .attr({ 'class': expected })
    .attr('class');

  assert.equal(actual, expected);
});
