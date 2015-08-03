import Ember from 'ember';
import layout from './template';

import SVGGraph from '../svg-graph/component';

//function box(side) {
//  return Ember.computed('margin', {
//    get() {
//      var margin = this.get('margin');
//
//      if (typeof margin == 'number') {
//        return margin;
//      }
//      else {
//        margin[side];
//      }
//    }
//  });
//}

export default SVGGraph.extend({
  layout,

  //marginLeft: 60,
  //marginRight: 10,
  //marginTop: 10,
  //marginBottom: 20,

  //boxWidth: Ember.computed('width', 'marginLeft', 'marginRight', {
  //  get() {
  //    var { width, marginLeft, marginRight } = this.getProperties('width', 'marginLeft', 'marginRight');

  //    return width - marginLeft - marginRight;
  //  }
  //}),

  //boxHeight: Ember.computed('height', 'marginTop', 'marginBottom', {
  //  get() {
  //    var { height, marginTop, marginBottom } = this.getProperties('height', 'marginTop', 'marginBottom');

  //    return height - marginTop - marginBottom;
  //  }
  //}),

  //templateStructure: {
  //  cartBody: '.cart-graph-body',
  //  cartXAxis: '.cart-graph-x-axis',
  //  cartYAxis: '.cart-graph-y-axis',
  //},

  //axisTranslate: Ember.computed('margin', 'width', 'height', {
  //  get() {
  //    var { marginLeft, marginBottom, height } = this.getProperties('marginLeft', 'marginBottom', 'height');

  //    return `translate(${marginLeft} ${height - marginBottom})`;
  //  }
  //})

});
