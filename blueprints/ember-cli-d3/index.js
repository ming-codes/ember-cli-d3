'use strict';

module.exports = {
  description: 'Add D3 bower module to project',

  afterInstall: function(options) {
    return this.addBowerPackageToProject('d3');
  }
};
