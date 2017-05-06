
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

test('d3.selection.prototype#style set url as string', function (assert) {
  let expected = `${location.pathname}${location.search}#t-arge_t0:.`;
  let actual = this.rect
    .style('fill', 'url(#t-arge_t0:.)')
    .style('fill')
    .replace(/"/g, '')
    .replace(/^url\(/, '')
    .replace(/\)$/, '');

  assert.equal(actual, expected);
});

test('d3.selection.prototype#style set url as hash', function (assert) {
  let expected = `${location.pathname}${location.search}#t-arge_t0:.`;
  let actual = this.rect
    .style({ 'fill': 'url(#t-arge_t0:.)' })
    .style('fill')
    .replace(/"/g, '')
    .replace(/^url\(/, '')
    .replace(/\)$/, '');

  assert.equal(actual, expected);
});

test('d3.transition.prototype#style string setter', function (assert) {
  return new Ember.RSVP.Promise(resolve => {
    let expected = '20px';

    this.rect
      .style('stroke-width', 0)
      .transition()
      .style('stroke-width', expected)
      .each('end', function () {
        let actual = d3.select(this).style('stroke-width');

        assert.equal(actual, expected);

        resolve();
      });
  });
});

test('d3.transition.prototype#style hash setter', function (assert) {
  return new Ember.RSVP.Promise(resolve => {
    let expected = '20px';

    this.rect
      .style({ 'stroke-width': 0 })
      .transition()
      .style({ 'stroke-width': expected })
      .each('end', function () {
        let actual = d3.select(this).style('stroke-width');

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
