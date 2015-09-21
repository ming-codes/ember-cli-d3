import Ember from 'ember';
import layout from '../templates/components/markdown-document';

import { slice } from 'ember-cli-d3/utils/lodash';

export default Ember.Component.extend({
  layout,

  classNames: [ 'markdown-body' ],

  content: null,

  didRender() {
    var headers = slice.call(this.$('h1, h2, h3, h4, h5'))

    var toc = headers.map(header => header.textContent);

    headers.forEach(header => {
      header.id = header.textContent.toLowerCase().replace(/ /g, '-');
    });

    this.set('toc', toc);
  }
});
