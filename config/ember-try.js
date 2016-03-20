
module.exports = function (project) {
  return {
    scenarios: [ {
      name: 'ember-1.10',
      bower: {
        dependencies: {
          'ember': '~1.10.0',
          'ember-data': '1.0.0-beta.16.1'
        }
      }
    }, {
      name: 'ember-1.11',
      bower: {
        dependencies: {
          "ember": '~1.11.0',
          'ember-data': '1.0.0-beta.18'
        }
      }
    }, {
      name: 'ember-1.12',
      bower: {
        dependencies: {
          'ember': '~1.12.0',
          'ember-data': '1.0.0-beta.19.2'
        }
      }
    }, {
      name: 'ember-1.13',
      bower: {
        dependencies: {
          'ember': '~1.13.0',
          'ember-data': '1.13.11'
        }
      }
    }, {
      name: 'ember-release',
      bower: {
        dependencies: {
          'ember': 'components/ember#release',
          'ember-data': 'components/ember-data#release'
        },
        resolutions: {
          'ember': 'release'
        }
      }
    }, {
      name: 'ember-beta',
      bower: {
        dependencies: {
          'ember': 'components/ember#beta',
          'ember-cli-shims': '0.1.1'
        },
        resolutions: {
          'ember': 'beta'
        }
      }
    }, {
      name: 'ember-canary',
      bower: {
        dependencies: {
          'ember': 'components/ember#canary',
          'ember-cli-shims': '0.1.1'
        },
        resolutions: {
          'ember': 'canary'
        }
      }
    } ]
  };
};
