module.exports = {
  scenarios: [ {
    name: 'ember-1.10',
    dependencies: {
      'ember': '~1.10.0',
      'ember-data': '1.0.0-beta.16.1'
    }
  }, {
    name: 'ember-1.11',
    dependencies: {
      "ember": '~1.11.0',
      'ember-data': '1.0.0-beta.18'
    }
  }, {
    name: 'ember-1.12',
    dependencies: {
      'ember': '~1.12.0',
      'ember-data': '1.0.0-beta.19.2'
    }
  }, {
    name: 'ember-1.13',
    dependencies: {
      'ember': '~1.13.0',
      'ember-data': '1.13.11'
    }
  }, {
    name: 'ember-release',
    dependencies: {
      'ember': 'components/ember#release',
      'ember-data': 'components/ember-data#release'
    },
    resolutions: {
      'ember': 'release'
    }
  }, {
    name: 'ember-beta',
    dependencies: {
      'ember': 'components/ember#beta',
      'ember-cli-shims': '0.1.1'
    },
    resolutions: {
      'ember': 'beta'
    }
  }, {
    name: 'ember-canary',
    dependencies: {
      'ember': 'components/ember#canary',
      'ember-cli-shims': '0.1.1'
    },
    resolutions: {
      'ember': 'canary'
    }
  } ]
};
