import Ember from 'ember';
import d3 from 'd3';

import SelectionProxy from '../system/selection-proxy';
import CanvasProxy from '../system/canvas-proxy';

const Stage = Ember.Object.extend({
  svg: Ember.computed('element', function () {
    var div = this.get('element');
    var element = document.createElementNS(d3.ns.prefix.svg, 'svg');

    element.appendChild(document.createComment('defs'));

    d3.select(element)
        .style('width', '100%')
        .style('height', '100%');

    Stage.replace(div, 'svg', element);

    return SelectionProxy.create({ element });
  }).readOnly(),

  canvas: Ember.computed('element', function () {
    var div = this.get('element');
    var element = document.createElement('canvas');

    d3.select(element)
        .style('width', '100%')
        .style('height', '100%');

    Stage.replace(div, 'canvas', element);

    return CanvasProxy.create({
      element,
      context: element.getContext('2d')
    });
  }).readOnly(),
  webgl: Ember.computed('element', function () {
    var div = this.get('element');
    var element = document.createElement('canvas');

    element.setAttribute('width', '100%');
    element.setAttribute('height', '100%');

    Stage.replace(div, 'canvas', element);

    return canvas.getContext('experimental-webgl')
        || canvas.getContext('webgl');
  }).readOnly(),

  toString() {
  }

});

Stage.reopenClass({
  stages: [],

  replace(parent, target, replacement) {
    var nodes = parent.childNodes;
    var len = nodes.length;
    var node;

    while (node = nodes.item(--len)) {

      if (node.nodeType === Node.COMMENT_NODE && node.textContent === target) {
        break;
      }
    }

    Ember.run.schedule('render', () => {
      parent.replaceChild(replacement, node);
    });
  }
});

//Stage.stages[1597] = 'webgl';
Stage.stages[2584] = 'canvas';
Stage.stages[4181] = 'svg';
//Stage.stages[6765] = 'html';

export default Stage;
