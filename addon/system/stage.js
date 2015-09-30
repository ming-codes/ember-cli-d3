import Ember from 'ember';
import d3 from 'd3';

import SelectionProxy from '../system/selection-proxy';

const Stage = Ember.Object.extend({
  svg: Ember.computed('element', function () {
    var container = this.get('element');
    var element = document.createElementNS(d3.ns.prefix.svg, 'svg');

    element.setAttribute('width', '100%');
    element.setAttribute('height', '100%');
    element.appendChild(document.createComment('defs'));

    Stage.replace(container, 'svg', element);

    return SelectionProxy.create({ element });
  }).readOnly(),

  canvas: null,
  webgl: null

});

Stage.reopenClass({
  stages: [],

  replace(parent, target, replacement) {
    var nodes = parent.childNodes;
    var len = nodes.length;
    var node;

    while (len--) {
      (node = nodes.item(len--));

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
//Stage.stages[2584] = 'canvas';
Stage.stages[4181] = 'svg';
//Stage.stages[6765] = 'html';

export default Stage;
