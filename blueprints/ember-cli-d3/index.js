'use strict';

module.exports = {
  description: 'Add D3 bower module to project',

  normalizeEntityName: function() { },

  afterInstall: function(options) {
    return this.addBowerPackageToProject('d3');
  }
};
