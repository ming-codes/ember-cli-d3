/* jshint ignore:start */

/* jshint ignore:end */

define('dummy/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'dummy/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('dummy/components/cart-axis/component', ['exports', 'ember-cli-d3/components/cart-axis/component'], function (exports, component) {

	'use strict';



	exports.default = component.default;

});
define('dummy/components/cart-grouped-bars/component', ['exports', 'ember-cli-d3/components/cart-grouped-bars/component'], function (exports, component) {

	'use strict';



	exports.default = component.default;

});
define('dummy/components/cart-lines/component', ['exports', 'ember-cli-d3/components/cart-lines/component'], function (exports, component) {

	'use strict';



	exports.default = component.default;

});
define('dummy/components/cart-stacked-bars/component', ['exports', 'ember-cli-d3/components/cart-stacked-bars/component'], function (exports, component) {

	'use strict';



	exports.default = component.default;

});
define('dummy/components/data-visual/component', ['exports', 'ember-cli-d3/components/data-visual/component'], function (exports, component) {

	'use strict';



	exports.default = component.default;

});
define('dummy/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('dummy/controllers/cart/bars', ['exports', 'ember', 'ember-cli-d3/utils/model/dimensional'], function (exports, Ember, DimensionalDataModel) {

  'use strict';


  exports['default'] = Ember['default'].Controller.extend({

    app: Ember['default'].inject.controller('application'),

    dataSource: Ember['default'].inject.service('dimensional-data-source'),

    isStacked: Ember['default'].computed.equal('app.currentRouteName', 'cart.bars.stacked'),
    isGrouped: Ember['default'].computed.equal('app.currentRouteName', 'cart.bars.grouped'),
    isWaterfall: Ember['default'].computed.equal('app.currentRouteName', 'cart.bars.waterfall'),

    data: Ember['default'].computed.alias('dataSource.data'),
    series: ['dogs', 'cats'],
    key: 'state',

    dim: Ember['default'].computed('data', 'series', 'key', {
      get: function get() {
        return DimensionalDataModel['default'].create(this.getProperties('data', 'series', 'key'));
      }
    })

  });

});
define('dummy/controllers/cart/lines', ['exports', 'ember', 'ember-cli-d3/utils/model/dimensional'], function (exports, Ember, DimensionalDataModel) {

  'use strict';


  exports['default'] = Ember['default'].Controller.extend({
    dataSource: Ember['default'].inject.service('dimensional-data-source'),

    data: Ember['default'].computed('dataSource.data', {
      get: function get() {
        return this.get('dataSource.data').sort(function (valueA, valueB) {
          return valueA.timestamp - valueB.timestamp;
        });
      }
    }),
    series: ['dogs', 'cats'],
    key: 'timestamp',

    dim: Ember['default'].computed('data', 'series', 'key', {
      get: function get() {
        return DimensionalDataModel['default'].create(this.getProperties('data', 'series', 'key'));
      }
    })
  });

});
define('dummy/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('dummy/ember-cli-d3/tests/modules/ember-cli-d3/components/cart-axis/component.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-cli-d3/components/cart-axis');
  QUnit.test('modules/ember-cli-d3/components/cart-axis/component.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/ember-cli-d3/components/cart-axis/component.js should pass jshint.');
  });

});
define('dummy/ember-cli-d3/tests/modules/ember-cli-d3/components/cart-grouped-bars/component.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-cli-d3/components/cart-grouped-bars');
  QUnit.test('modules/ember-cli-d3/components/cart-grouped-bars/component.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/ember-cli-d3/components/cart-grouped-bars/component.js should pass jshint.');
  });

});
define('dummy/ember-cli-d3/tests/modules/ember-cli-d3/components/cart-lines/component.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-cli-d3/components/cart-lines');
  QUnit.test('modules/ember-cli-d3/components/cart-lines/component.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/ember-cli-d3/components/cart-lines/component.js should pass jshint.');
  });

});
define('dummy/ember-cli-d3/tests/modules/ember-cli-d3/components/cart-stacked-bars/component.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-cli-d3/components/cart-stacked-bars');
  QUnit.test('modules/ember-cli-d3/components/cart-stacked-bars/component.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/ember-cli-d3/components/cart-stacked-bars/component.js should pass jshint.');
  });

});
define('dummy/ember-cli-d3/tests/modules/ember-cli-d3/components/data-visual/component.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-cli-d3/components/data-visual');
  QUnit.test('modules/ember-cli-d3/components/data-visual/component.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/ember-cli-d3/components/data-visual/component.js should pass jshint.');
  });

});
define('dummy/ember-cli-d3/tests/modules/ember-cli-d3/components/data-visual/d3-selection-proxy.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-cli-d3/components/data-visual');
  QUnit.test('modules/ember-cli-d3/components/data-visual/d3-selection-proxy.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/ember-cli-d3/components/data-visual/d3-selection-proxy.js should pass jshint.');
  });

});
define('dummy/ember-cli-d3/tests/modules/ember-cli-d3/ext/d3.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-cli-d3/ext');
  QUnit.test('modules/ember-cli-d3/ext/d3.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/ember-cli-d3/ext/d3.js should pass jshint.');
  });

});
define('dummy/ember-cli-d3/tests/modules/ember-cli-d3/helpers/color-scale.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-cli-d3/helpers');
  QUnit.test('modules/ember-cli-d3/helpers/color-scale.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/ember-cli-d3/helpers/color-scale.js should pass jshint.');
  });

});
define('dummy/ember-cli-d3/tests/modules/ember-cli-d3/helpers/negative.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-cli-d3/helpers');
  QUnit.test('modules/ember-cli-d3/helpers/negative.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/ember-cli-d3/helpers/negative.js should pass jshint.');
  });

});
define('dummy/ember-cli-d3/tests/modules/ember-cli-d3/helpers/transition.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-cli-d3/helpers');
  QUnit.test('modules/ember-cli-d3/helpers/transition.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/ember-cli-d3/helpers/transition.js should pass jshint.');
  });

});
define('dummy/ember-cli-d3/tests/modules/ember-cli-d3/helpers/translate.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-cli-d3/helpers');
  QUnit.test('modules/ember-cli-d3/helpers/translate.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/ember-cli-d3/helpers/translate.js should pass jshint.');
  });

});
define('dummy/ember-cli-d3/tests/modules/ember-cli-d3/mixins/d3-support.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-cli-d3/mixins');
  QUnit.test('modules/ember-cli-d3/mixins/d3-support.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/ember-cli-d3/mixins/d3-support.js should pass jshint.');
  });

});
define('dummy/ember-cli-d3/tests/modules/ember-cli-d3/utils/css.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-cli-d3/utils');
  QUnit.test('modules/ember-cli-d3/utils/css.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/ember-cli-d3/utils/css.js should pass jshint.');
  });

});
define('dummy/ember-cli-d3/tests/modules/ember-cli-d3/utils/d3.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-cli-d3/utils');
  QUnit.test('modules/ember-cli-d3/utils/d3.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/ember-cli-d3/utils/d3.js should pass jshint.');
  });

});
define('dummy/ember-cli-d3/tests/modules/ember-cli-d3/utils/lodash.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-cli-d3/utils');
  QUnit.test('modules/ember-cli-d3/utils/lodash.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/ember-cli-d3/utils/lodash.js should pass jshint.');
  });

});
define('dummy/ember-cli-d3/tests/modules/ember-cli-d3/utils/model/dimensional.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-cli-d3/utils/model');
  QUnit.test('modules/ember-cli-d3/utils/model/dimensional.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/ember-cli-d3/utils/model/dimensional.js should pass jshint.');
  });

});
define('dummy/helpers/color-scale', ['exports', 'ember-cli-d3/helpers/color-scale'], function (exports, color_scale) {

	'use strict';



	exports.default = color_scale.default;
	exports.colorScale = color_scale.colorScale;

});
define('dummy/helpers/negative', ['exports', 'ember-cli-d3/helpers/negative'], function (exports, negative) {

	'use strict';



	exports.default = negative.default;
	exports.negative = negative.negative;

});
define('dummy/helpers/transition', ['exports', 'ember-cli-d3/helpers/transition'], function (exports, transition) {

	'use strict';



	exports.default = transition.default;
	exports.transition = transition.transition;

});
define('dummy/helpers/translate', ['exports', 'ember-cli-d3/helpers/translate'], function (exports, translate) {

	'use strict';



	exports.default = translate.default;
	exports.translate = translate.translate;

});
define('dummy/initializers/export-application-global', ['exports', 'ember', 'dummy/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('dummy/instance-initializers/app-version', ['exports', 'dummy/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('dummy/router', ['exports', 'ember', 'dummy/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('cart', function () {
      this.route('bars', function () {
        this.route('stacked');
        this.route('grouped');
        this.route('waterfall');
      });
      this.route('lines', function () {
        this.route('area');
        this.route('stacked');
      });
      this.route('histogram');
    });
  });

  exports['default'] = Router;

});
define('dummy/routes/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';


  exports['default'] = Ember['default'].Route.extend({

    dataSource: Ember['default'].inject.service('dimensional-data-source'),

    actions: {
      willTransition: function willTransition(_ref) {
        var targetName = _ref.targetName;

        this.controllerFor('application').set('isIndex', targetName === 'index');
      },
      generate: function generate() {
        this.get('dataSource').generate();
      },
      reorder: function reorder() {
        this.get('dataSource').reorder();
      }
    }
  });

});
define('dummy/services/dimensional-data-source', ['exports', 'ember', 'dummy/tests/helpers/data-generator'], function (exports, Ember, data_generator) {

  'use strict';

  exports['default'] = Ember['default'].Service.extend({

    init: function init() {
      this._super.apply(this, arguments);

      this.generate();
    },

    data: null,

    generate: function generate() {
      this.set('data', data_generator.dimensional(['dogs', 'cats', 'birds', 'fishes', 'hamster']));
    },

    reorder: function reorder() {
      var oldData = this.get('data');
      var newData = [];

      while (oldData.length) {
        newData = newData.concat(oldData.splice(Math.floor(Math.random() * oldData.length), 1));
      }

      this.set('data', newData);
    }

  });

});
define('dummy/svg/text/util', ['exports', 'ember-cli-d3/svg/text/util'], function (exports, util) {

	'use strict';



	exports.default = util.default;

});
define('dummy/templates/about', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.1+1dbbcc5a",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/about.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("About\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('dummy/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.1+1dbbcc5a",
          "loc": {
            "source": null,
            "start": {
              "line": 18,
              "column": 16
            },
            "end": {
              "line": 18,
              "column": 65
            }
          },
          "moduleName": "dummy/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Grouped Bar Chart");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.1+1dbbcc5a",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 16
            },
            "end": {
              "line": 19,
              "column": 66
            }
          },
          "moduleName": "dummy/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Stacked Bars Chart");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.1+1dbbcc5a",
          "loc": {
            "source": null,
            "start": {
              "line": 20,
              "column": 16
            },
            "end": {
              "line": 20,
              "column": 79
            }
          },
          "moduleName": "dummy/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Waterfall Chart");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child3 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.1+1dbbcc5a",
          "loc": {
            "source": null,
            "start": {
              "line": 21,
              "column": 16
            },
            "end": {
              "line": 21,
              "column": 51
            }
          },
          "moduleName": "dummy/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Line Chart");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child4 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.1+1dbbcc5a",
          "loc": {
            "source": null,
            "start": {
              "line": 22,
              "column": 16
            },
            "end": {
              "line": 22,
              "column": 56
            }
          },
          "moduleName": "dummy/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Area Chart");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child5 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.1+1dbbcc5a",
          "loc": {
            "source": null,
            "start": {
              "line": 23,
              "column": 16
            },
            "end": {
              "line": 23,
              "column": 67
            }
          },
          "moduleName": "dummy/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Stacked Area Chart");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child6 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.1+1dbbcc5a",
          "loc": {
            "source": null,
            "start": {
              "line": 24,
              "column": 16
            },
            "end": {
              "line": 24,
              "column": 68
            }
          },
          "moduleName": "dummy/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Histogram");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child7 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.1+1dbbcc5a",
          "loc": {
            "source": null,
            "start": {
              "line": 53,
              "column": 0
            },
            "end": {
              "line": 57,
              "column": 0
            }
          },
          "moduleName": "dummy/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","container");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
          return morphs;
        },
        statements: [
          ["inline","partial",["about"],[],["loc",[null,[55,4],[55,23]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child8 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.1+1dbbcc5a",
          "loc": {
            "source": null,
            "start": {
              "line": 60,
              "column": 2
            },
            "end": {
              "line": 62,
              "column": 2
            }
          },
          "moduleName": "dummy/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","data-control");
          var el2 = dom.createTextNode("Generate");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [
          ["element","action",["generate"],[],["loc",[null,[61,33],[61,54]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@2.0.1+1dbbcc5a",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 66,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("nav");
        dom.setAttribute(el1,"class","navbar navbar-default");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","container-fluid");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","navbar-header");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"type","button");
        dom.setAttribute(el4,"class","navbar-toggle collapsed");
        dom.setAttribute(el4,"data-toggle","collapse");
        dom.setAttribute(el4,"data-target","#bs-example-navbar-collapse-1");
        dom.setAttribute(el4,"aria-expanded","false");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","sr-only");
        var el6 = dom.createTextNode("Toggle navigation");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","icon-bar");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","icon-bar");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","icon-bar");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"class","navbar-brand");
        dom.setAttribute(el4,"href","#");
        var el5 = dom.createTextNode("ember-cli-d3");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","collapse navbar-collapse");
        dom.setAttribute(el3,"id","bs-example-navbar-collapse-1");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4,"class","nav navbar-nav");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        dom.setAttribute(el5,"class","dropdown");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("a");
        dom.setAttribute(el6,"href","#");
        dom.setAttribute(el6,"class","dropdown-toggle");
        dom.setAttribute(el6,"data-toggle","dropdown");
        dom.setAttribute(el6,"role","button");
        dom.setAttribute(el6,"aria-haspopup","true");
        dom.setAttribute(el6,"aria-expanded","false");
        var el7 = dom.createTextNode("Cartesian ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"class","caret");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("ul");
        dom.setAttribute(el6,"class","dropdown-menu");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("\n      <form class=\"navbar-form navbar-left\" role=\"search\">\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Search\">\n        </div>\n        <button type=\"submit\" class=\"btn btn-default\">Submit</button>\n      </form>\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li><a href=\"#\">Link</a></li>\n        <li class=\"dropdown\">\n          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Dropdown <span class=\"caret\"></span></a>\n          <ul class=\"dropdown-menu\">\n            <li><a href=\"#\">Action</a></li>\n            <li><a href=\"#\">Another action</a></li>\n            <li><a href=\"#\">Something else here</a></li>\n            <li role=\"separator\" class=\"divider\"></li>\n            <li><a href=\"#\">Separated link</a></li>\n          </ul>\n        </li>\n      </ul>\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" /.navbar-collapse ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" /.container-fluid ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0, 1, 3, 1, 1, 3]);
        var element2 = dom.childAt(fragment, [4]);
        var morphs = new Array(10);
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [3]),0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [5]),0,0);
        morphs[3] = dom.createMorphAt(dom.childAt(element1, [7]),0,0);
        morphs[4] = dom.createMorphAt(dom.childAt(element1, [9]),0,0);
        morphs[5] = dom.createMorphAt(dom.childAt(element1, [11]),0,0);
        morphs[6] = dom.createMorphAt(dom.childAt(element1, [13]),0,0);
        morphs[7] = dom.createMorphAt(fragment,2,2,contextualElement);
        morphs[8] = dom.createMorphAt(element2,1,1);
        morphs[9] = dom.createMorphAt(element2,3,3);
        return morphs;
      },
      statements: [
        ["block","link-to",["cart.bars.grouped"],[],0,null,["loc",[null,[18,16],[18,77]]]],
        ["block","link-to",["cart.bars.stacked"],[],1,null,["loc",[null,[19,16],[19,78]]]],
        ["block","link-to",["cart.bars.waterfall"],["disabled",true],2,null,["loc",[null,[20,16],[20,91]]]],
        ["block","link-to",["cart.lines"],[],3,null,["loc",[null,[21,16],[21,63]]]],
        ["block","link-to",["cart.lines.area"],[],4,null,["loc",[null,[22,16],[22,68]]]],
        ["block","link-to",["cart.lines.stacked"],[],5,null,["loc",[null,[23,16],[23,79]]]],
        ["block","link-to",["cart.histogram"],["disabled",true],6,null,["loc",[null,[24,16],[24,80]]]],
        ["block","if",[["get","isIndex",["loc",[null,[53,6],[53,13]]]]],[],7,null,["loc",[null,[53,0],[57,7]]]],
        ["block","unless",[["get","isIndex",["loc",[null,[60,12],[60,19]]]]],[],8,null,["loc",[null,[60,2],[62,13]]]],
        ["content","outlet",["loc",[null,[64,2],[64,12]]]]
      ],
      locals: [],
      templates: [child0, child1, child2, child3, child4, child5, child6, child7, child8]
    };
  }()));

});
define('dummy/templates/cart/bars', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "revision": "Ember@2.0.1+1dbbcc5a",
              "loc": {
                "source": null,
                "start": {
                  "line": 6,
                  "column": 4
                },
                "end": {
                  "line": 18,
                  "column": 4
                }
              },
              "moduleName": "dummy/templates/cart/bars.hbs"
            },
            arity: 5,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("\n      ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n      ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(2);
              morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
              morphs[1] = dom.createMorphAt(fragment,3,3,contextualElement);
              return morphs;
            },
            statements: [
              ["inline","cart-axis",[],["select",["subexpr","transition",[["get","svg.chart.x-axis",["loc",[null,[10,37],[10,53]]]]],[],["loc",[null,[10,25],[10,54]]]],"scale",["subexpr","@mut",[["get","x-scale",["loc",[null,[10,61],[10,68]]]]],[],[]],"orient","bottom","tickSize",["subexpr","negative",[["get","height",["loc",[null,[11,43],[11,49]]]]],[],["loc",[null,[11,33],[11,50]]]]],["loc",[null,[10,6],[12,8]]]],
              ["inline","cart-axis",[],["select",["subexpr","transition",[["get","svg.chart.y-axis",["loc",[null,[13,37],[13,53]]]]],[],["loc",[null,[13,25],[13,54]]]],"scale",["subexpr","@mut",[["get","y-scale",["loc",[null,[13,61],[13,68]]]]],[],[]],"orient","right","tickSize",["subexpr","negative",[["get","width",["loc",[null,[14,42],[14,47]]]]],[],["loc",[null,[14,32],[14,48]]]],"transform",["subexpr","translate",[["get","width",["loc",[null,[15,29],[15,34]]]]],[],["loc",[null,[15,18],[15,35]]]]],["loc",[null,[13,6],[16,8]]]]
            ],
            locals: ["selection","x-scale","y-scale","width","height"],
            templates: []
          };
        }());
        return {
          meta: {
            "revision": "Ember@2.0.1+1dbbcc5a",
            "loc": {
              "source": null,
              "start": {
                "line": 5,
                "column": 2
              },
              "end": {
                "line": 19,
                "column": 2
              }
            },
            "moduleName": "dummy/templates/cart/bars.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["block","cart-grouped-bars",[],["select",["subexpr","transition",[["get","svg.chart",["loc",[null,[6,44],[6,53]]]]],[],["loc",[null,[6,32],[6,54]]]],"model",["subexpr","@mut",[["get","dim",["loc",[null,[6,61],[6,64]]]]],[],[]],"width",["subexpr","@mut",[["get","width",["loc",[null,[6,71],[6,76]]]]],[],[]],"height",["subexpr","@mut",[["get","height",["loc",[null,[6,84],[6,90]]]]],[],[]],"margin","10 60 20 10","stroke",["subexpr","color-scale",["category10"],[],["loc",[null,[7,38],[7,64]]]]],0,null,["loc",[null,[6,4],[18,26]]]]
          ],
          locals: [],
          templates: [child0]
        };
      }());
      var child1 = (function() {
        var child0 = (function() {
          var child0 = (function() {
            return {
              meta: {
                "revision": "Ember@2.0.1+1dbbcc5a",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 20,
                    "column": 4
                  },
                  "end": {
                    "line": 32,
                    "column": 4
                  }
                },
                "moduleName": "dummy/templates/cart/bars.hbs"
              },
              arity: 5,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("\n      ");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n      ");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(2);
                morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
                morphs[1] = dom.createMorphAt(fragment,3,3,contextualElement);
                return morphs;
              },
              statements: [
                ["inline","cart-axis",[],["select",["subexpr","transition",[["get","svg.chart.x-axis",["loc",[null,[24,37],[24,53]]]]],[],["loc",[null,[24,25],[24,54]]]],"scale",["subexpr","@mut",[["get","x-scale",["loc",[null,[24,61],[24,68]]]]],[],[]],"orient","bottom","tickSize",["subexpr","negative",[["get","height",["loc",[null,[25,43],[25,49]]]]],[],["loc",[null,[25,33],[25,50]]]]],["loc",[null,[24,6],[26,8]]]],
                ["inline","cart-axis",[],["select",["subexpr","transition",[["get","svg.chart.y-axis",["loc",[null,[27,37],[27,53]]]]],[],["loc",[null,[27,25],[27,54]]]],"scale",["subexpr","@mut",[["get","y-scale",["loc",[null,[27,61],[27,68]]]]],[],[]],"orient","right","tickSize",["subexpr","negative",[["get","width",["loc",[null,[28,42],[28,47]]]]],[],["loc",[null,[28,32],[28,48]]]],"transform",["subexpr","translate",[["get","width",["loc",[null,[29,29],[29,34]]]]],[],["loc",[null,[29,18],[29,35]]]]],["loc",[null,[27,6],[30,8]]]]
              ],
              locals: ["selection","x-scale","y-scale","width","height"],
              templates: []
            };
          }());
          return {
            meta: {
              "revision": "Ember@2.0.1+1dbbcc5a",
              "loc": {
                "source": null,
                "start": {
                  "line": 19,
                  "column": 2
                },
                "end": {
                  "line": 33,
                  "column": 2
                }
              },
              "moduleName": "dummy/templates/cart/bars.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("  ");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
              dom.insertBoundary(fragment, 0);
              return morphs;
            },
            statements: [
              ["block","cart-stacked-bars",[],["select",["subexpr","transition",[["get","svg.chart",["loc",[null,[20,44],[20,53]]]]],[],["loc",[null,[20,32],[20,54]]]],"model",["subexpr","@mut",[["get","dim",["loc",[null,[20,61],[20,64]]]]],[],[]],"width",["subexpr","@mut",[["get","width",["loc",[null,[20,71],[20,76]]]]],[],[]],"height",["subexpr","@mut",[["get","height",["loc",[null,[20,84],[20,90]]]]],[],[]],"margin","10 60 20 10","stroke",["subexpr","color-scale",["category10"],[],["loc",[null,[21,38],[21,64]]]]],0,null,["loc",[null,[20,4],[32,26]]]]
            ],
            locals: [],
            templates: [child0]
          };
        }());
        return {
          meta: {
            "revision": "Ember@2.0.1+1dbbcc5a",
            "loc": {
              "source": null,
              "start": {
                "line": 19,
                "column": 2
              },
              "end": {
                "line": 33,
                "column": 2
              }
            },
            "moduleName": "dummy/templates/cart/bars.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["block","if",[["get","isStacked",["loc",[null,[19,12],[19,21]]]]],[],0,null,["loc",[null,[19,2],[33,2]]]]
          ],
          locals: [],
          templates: [child0]
        };
      }());
      return {
        meta: {
          "revision": "Ember@2.0.1+1dbbcc5a",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 0
            },
            "end": {
              "line": 34,
              "column": 0
            }
          },
          "moduleName": "dummy/templates/cart/bars.hbs"
        },
        arity: 3,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","if",[["get","isGrouped",["loc",[null,[5,8],[5,17]]]]],[],0,1,["loc",[null,[5,2],[33,9]]]]
        ],
        locals: ["svg","width","height"],
        templates: [child0, child1]
      };
    }());
    return {
      meta: {
        "revision": "Ember@2.0.1+1dbbcc5a",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 35,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/cart/bars.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        dom.setAttribute(el1,"class","data-control");
        var el2 = dom.createTextNode("Reorder");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [1]);
        var morphs = new Array(2);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createMorphAt(fragment,3,3,contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["element","action",["reorder"],[],["loc",[null,[2,29],[2,49]]]],
        ["block","data-visual",[],[],0,null,["loc",[null,[4,0],[34,16]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('dummy/templates/cart/lines', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@2.0.1+1dbbcc5a",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 2
              },
              "end": {
                "line": 10,
                "column": 2
              }
            },
            "moduleName": "dummy/templates/cart/lines.hbs"
          },
          arity: 5,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
            morphs[1] = dom.createMorphAt(fragment,3,3,contextualElement);
            return morphs;
          },
          statements: [
            ["inline","cart-axis",[],["select",["subexpr","transition",[["get","svg.chart.x-axis",["loc",[null,[7,35],[7,51]]]]],[],["loc",[null,[7,23],[7,52]]]],"orient","bottom","tickSize",["subexpr","negative",[["get","height",["loc",[null,[7,88],[7,94]]]]],[],["loc",[null,[7,78],[7,95]]]],"scale",["subexpr","@mut",[["get","x-scale",["loc",[null,[7,102],[7,109]]]]],[],[]]],["loc",[null,[7,4],[7,111]]]],
            ["inline","cart-axis",[],["select",["subexpr","transition",[["get","svg.chart.y-axis",["loc",[null,[8,35],[8,51]]]]],[],["loc",[null,[8,23],[8,52]]]],"orient","left","tickSize",["subexpr","negative",[["get","width",["loc",[null,[8,86],[8,91]]]]],[],["loc",[null,[8,76],[8,92]]]],"scale",["subexpr","@mut",[["get","y-scale",["loc",[null,[8,99],[8,106]]]]],[],[]]],["loc",[null,[8,4],[8,108]]]]
          ],
          locals: ["selection","x-scale","y-scale","width","height"],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@2.0.1+1dbbcc5a",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 11,
              "column": 0
            }
          },
          "moduleName": "dummy/templates/cart/lines.hbs"
        },
        arity: 3,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","cart-lines",[],["select",["subexpr","transition",[["get","svg.chart",["loc",[null,[3,35],[3,44]]]]],["duration",200],["loc",[null,[3,23],[3,58]]]],"model",["subexpr","@mut",[["get","dim",["loc",[null,[3,65],[3,68]]]]],[],[]],"width",["subexpr","@mut",[["get","width",["loc",[null,[3,75],[3,80]]]]],[],[]],"height",["subexpr","@mut",[["get","height",["loc",[null,[3,88],[3,94]]]]],[],[]],"margin","10 10 20 60","stroke",["subexpr","color-scale",["category10"],[],["loc",[null,[4,36],[4,62]]]]],0,null,["loc",[null,[3,2],[10,17]]]]
        ],
        locals: ["svg","width","height"],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "revision": "Ember@2.0.1+1dbbcc5a",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 12,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/cart/lines.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","data-visual",[],[],0,null,["loc",[null,[2,0],[11,16]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('dummy/tests/app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('app.js should pass jshint', function(assert) { 
    assert.ok(true, 'app.js should pass jshint.'); 
  });

});
define('dummy/tests/controllers/cart/bars.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/cart');
  QUnit.test('controllers/cart/bars.js should pass jshint', function(assert) { 
    assert.ok(true, 'controllers/cart/bars.js should pass jshint.'); 
  });

});
define('dummy/tests/controllers/cart/lines.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/cart');
  QUnit.test('controllers/cart/lines.js should pass jshint', function(assert) { 
    assert.ok(true, 'controllers/cart/lines.js should pass jshint.'); 
  });

});
define('dummy/tests/helpers/data-generator', ['exports'], function (exports) {

  'use strict';

  exports.dimensional = dimensional;

  var states = ['California', 'Texas', 'New York', 'Florida', 'Illinois', 'Pennsylvania', 'Ohio', 'New Jersey', 'North Carolina', 'Georgia', 'Virginia', 'Massachusetts', 'Michigan', 'Washington', 'Maryland', 'Indiana', 'Minnesota', 'Colorado', 'Tennessee', 'Wisconsin', 'Arizona', 'Missouri', 'Connecticut', 'Louisiana', 'Oregon', 'Alabama', 'Oklahoma', 'South Carolina', 'Kentucky', 'Iowa', 'Kansas', 'Utah', 'Nevada', 'Arkansas', 'Nebraska', 'Mississippi', 'District of Columbia', 'New Mexico', 'Hawaii', 'West Virginia', 'New Hampshire', 'Idaho', 'Delaware', 'North Dakota', 'Alaska', 'Maine', 'South Dakota', 'Wyoming', 'Rhode Island', 'Montana', 'Vermont'];

  function dimensional(series) {
    var count = arguments.length <= 1 || arguments[1] === undefined ? 4 : arguments[1];
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var generator = d3.random.normal(options.mean || 2000, options.stddev || 2000);

    return d3.range(count).map(function (id) {
      var base = { id: id, state: states[id], timestamp: new Date(Math.floor(Date.now() * Math.random())) };

      series.forEach(function (series) {
        base[series] = generator();
      });

      return base;
    });
  }

});
define('dummy/tests/helpers/data-generator.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/data-generator.js should pass jshint', function(assert) { 
    assert.ok(true, 'helpers/data-generator.js should pass jshint.'); 
  });

});
define('dummy/tests/helpers/graph', ['exports', 'ember'], function (exports, Ember) {

  'use strict';



  exports['default'] = graph;

  function elementToString(el) {
    var base = el.tagName;
    var cls = el.classList;

    if (cls.length) {
      cls = Array.prototype.slice.call(cls).join(' ');
      base += ' class="' + cls + '"';
    }

    return '<' + base + '>';
  }

  function indexComponents(views) {
    var hash = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var count = views.length;
    var view;

    while (view = views[--count]) {
      hash[view.elementId] = view;

      indexComponents(view.get('childViews'), hash);
    }

    return hash;
  }
  function graph(context, assert) {
    var container = document.getElementById('ember-testing');
    var viewIndex;
    var promise;

    return {
      render: function render(template) {
        context.render(template);

        return this.update();
      },
      update: function update(name, value) {
        // XXX This uses private API
        var registry = context.container.lookup("-view-registry:main");

        if (name) {
          context.set(name, value);
        }

        viewIndex = indexComponents(Object.keys(registry).map(function (key) {
          return registry[key];
        }));

        return this;
      },
      transitioning: function transitioning(selector, name) {
        var timeout = arguments.length <= 2 || arguments[2] === undefined ? 5000 : arguments[2];

        var list = container.querySelectorAll(selector);
        var transition = [];
        var allPass = true;
        var now = Date.now();
        var index, len, item, key, found;

        outerloop: for (index = 0, len = list.length; index < len; index++) {
          item = list[index];

          for (key in item) {
            // First condition is fast check and covers 99% of the case;
            // Second condition is real check;
            if (key[1] === '_' && !key.indexOf('__transition')) {
              if (!name || key === '__transition_' + name) {
                transition.push(key, item);
              }

              continue outerloop;
            }
          }

          allPass = false;

          assert.ok(false, 'No transition found on ' + elementToString(item) + ' from selector `' + selector + '`');
        }

        assert.ok(allPass, 'All elements in `' + selector + '` are transitioning');

        promise = Ember['default'].RSVP.resolve(promise).then(function () {
          return new Ember['default'].RSVP.Promise(function (resolve, reject) {
            var rate = 17 * 4;

            setTimeout(function schedule() {
              var count = transition.length / 2;
              var elapsed = Date.now() - now;
              var done = true;
              var key, node;

              if (elapsed >= timeout) {
                reject('Transition from selector `' + selector + '` timed out');
              }

              while (count) {
                node = transition[count * 2 - 1];
                key = transition[count * 2];

                done = done && !node[key];

                count--;
              }

              if (done) {
                resolve();
              } else {
                setTimeout(schedule, rate);
              }
            }, rate);
          });
        });

        return this;
      },
      assert: function assert(id, callback) {
        promise = Ember['default'].RSVP.resolve(promise).then(function () {
          var component = viewIndex[id];
          var selection = component && component.get('select._selection') || component.get('select.selection');

          callback(selection, component);
        });

        return this;
      },

      then: function then(resolve, reject) {
        return Ember['default'].RSVP.resolve(promise).then(resolve, reject);
      }
    };
  }

});
define('dummy/tests/helpers/graph.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/graph.js should pass jshint', function(assert) { 
    assert.ok(true, 'helpers/graph.js should pass jshint.'); 
  });

});
define('dummy/tests/helpers/resolver', ['exports', 'ember/resolver', 'dummy/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('dummy/tests/helpers/resolver.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/resolver.js should pass jshint', function(assert) { 
    assert.ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('dummy/tests/helpers/start-app', ['exports', 'ember', 'dummy/app', 'dummy/router', 'dummy/config/environment'], function (exports, Ember, Application, Router, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('dummy/tests/helpers/start-app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/start-app.js should pass jshint', function(assert) { 
    assert.ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('dummy/tests/integration/components/cart-grouped-bars-test', ['dummy/tests/helpers/data-generator', 'ember-qunit', 'ember-cli-d3/utils/model/dimensional', 'dummy/tests/helpers/graph'], function (data_generator, ember_qunit, DimensiontalModel, graph) {

  'use strict';

  ember_qunit.moduleForComponent('cart-grouped-bars', 'Integration | Component | cart grouped bars', {
    integration: true
  });

  ember_qunit.test('it renders alone', function (assert) {
    var _this = this;

    return graph['default'](this, assert).update('model', DimensiontalModel['default'].create({
      series: ['dogs', 'cats'],
      key: 'state',
      data: data_generator.dimensional(['dogs', 'cats'])
    })).render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              'revision': 'Ember@2.0.1+1dbbcc5a',
              'loc': {
                'source': null,
                'start': {
                  'line': 3,
                  'column': 8
                },
                'end': {
                  'line': 15,
                  'column': 8
                }
              }
            },
            arity: 5,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode('\n          ');
              dom.appendChild(el0, el1);
              var el1 = dom.createComment('');
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode('\n          ');
              dom.appendChild(el0, el1);
              var el1 = dom.createComment('');
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode('\n\n');
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(2);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
              return morphs;
            },
            statements: [['inline', 'cart-axis', [], ['select', ['subexpr', 'transition', [['get', 'svg.chart.x-axis', ['loc', [null, [7, 41], [7, 57]]]]], [], ['loc', [null, [7, 29], [7, 58]]]], 'scale', ['subexpr', '@mut', [['get', 'x-scale', ['loc', [null, [7, 65], [7, 72]]]]], [], []], 'orient', 'bottom', 'tickSize', ['subexpr', 'negative', [['get', 'height', ['loc', [null, [8, 47], [8, 53]]]]], [], ['loc', [null, [8, 37], [8, 54]]]]], ['loc', [null, [7, 10], [9, 12]]]], ['inline', 'cart-axis', [], ['select', ['subexpr', 'transition', [['get', 'svg.chart.y-axis', ['loc', [null, [10, 41], [10, 57]]]]], [], ['loc', [null, [10, 29], [10, 58]]]], 'scale', ['subexpr', '@mut', [['get', 'y-scale', ['loc', [null, [10, 65], [10, 72]]]]], [], []], 'orient', 'right', 'tickSize', ['subexpr', 'negative', [['get', 'width', ['loc', [null, [11, 46], [11, 51]]]]], [], ['loc', [null, [11, 36], [11, 52]]]], 'transform', ['subexpr', 'translate', [['get', 'width', ['loc', [null, [12, 33], [12, 38]]]]], [], ['loc', [null, [12, 22], [12, 39]]]]], ['loc', [null, [10, 10], [13, 12]]]]],
            locals: ['selection', 'x-scale', 'y-scale', 'width', 'height'],
            templates: []
          };
        })();

        return {
          meta: {
            'revision': 'Ember@2.0.1+1dbbcc5a',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 6
              },
              'end': {
                'line': 16,
                'column': 6
              }
            }
          },
          arity: 3,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment('');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [['block', 'cart-grouped-bars', [], ['id', 'bars', 'select', ['subexpr', 'transition', [['get', 'svg.chart', ['loc', [null, [3, 58], [3, 67]]]]], [], ['loc', [null, [3, 46], [3, 68]]]], 'model', ['subexpr', '@mut', [['get', 'model', ['loc', [null, [3, 75], [3, 80]]]]], [], []], 'width', ['subexpr', '@mut', [['get', 'width', ['loc', [null, [3, 87], [3, 92]]]]], [], []], 'height', ['subexpr', '@mut', [['get', 'height', ['loc', [null, [3, 100], [3, 106]]]]], [], []], 'margin', '10 60 20 10', 'stroke', ['subexpr', 'color-scale', ['category10'], [], ['loc', [null, [4, 42], [4, 68]]]]], 0, null, ['loc', [null, [3, 8], [15, 30]]]]],
          locals: ['svg', 'width', 'height'],
          templates: [child0]
        };
      })();

      return {
        meta: {
          'revision': 'Ember@2.0.1+1dbbcc5a',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 17,
              'column': 4
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('    ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'data-visual', [], [], 0, null, ['loc', [null, [2, 6], [16, 22]]]]],
        locals: [],
        templates: [child0]
      };
    })())).transitioning('.series, .bar, .shape').assert('bars', function (selection) {
      var data = _this.get('model.data');

      selection.selectAll('.series').each(function (_ref) {
        var metricPath = _ref.metricPath;

        assert.deepEqual(d3.select(this).selectAll('.bar').data(), data, metricPath + ' data not bound');
      });
    }).update('test', 'abc');
  });

});
define('dummy/tests/integration/components/cart-grouped-bars-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components');
  QUnit.test('integration/components/cart-grouped-bars-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'integration/components/cart-grouped-bars-test.js should pass jshint.'); 
  });

});
define('dummy/tests/router.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('router.js should pass jshint', function(assert) { 
    assert.ok(true, 'router.js should pass jshint.'); 
  });

});
define('dummy/tests/routes/application.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/application.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/application.js should pass jshint.'); 
  });

});
define('dummy/tests/services/dimensional-data-source.jshint', function () {

  'use strict';

  QUnit.module('JSHint - services');
  QUnit.test('services/dimensional-data-source.js should pass jshint', function(assert) { 
    assert.ok(true, 'services/dimensional-data-source.js should pass jshint.'); 
  });

});
define('dummy/tests/test-helper', ['dummy/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('dummy/tests/test-helper.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('test-helper.js should pass jshint', function(assert) { 
    assert.ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('dummy/tests/unit/helpers/color-scale-test', ['dummy/helpers/color-scale', 'qunit'], function (color_scale, qunit) {

  'use strict';

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  qunit.module('Unit | Helper | color scale');

  // Replace this with your real tests.
  qunit.test('Scales preset on d3.scale.* can be accessed as alias', function (assert) {
    var checks = [[color_scale.colorScale(['category10']).range(), d3.scale.category10().range()], [color_scale.colorScale(['category20']).range(), d3.scale.category20().range()], [color_scale.colorScale(['category20b']).range(), d3.scale.category20b().range()], [color_scale.colorScale(['category20c']).range(), d3.scale.category20c().range()]];

    checks.forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2);

      var actual = _ref2[0];
      var expected = _ref2[1];

      assert.deepEqual(actual, expected);
    });
  });

  qunit.test('Pass in custom color hex for custom color scale', function (assert) {
    var checks = [[color_scale.colorScale(['#fff', '#f00']).range(), ['#fff', '#f00']], [color_scale.colorScale(['#00f', '#f00']).range(), ['#00f', '#f00']]];

    checks.forEach(function (_ref3) {
      var _ref32 = _slicedToArray(_ref3, 2);

      var actual = _ref32[0];
      var expected = _ref32[1];

      assert.deepEqual(actual, expected);
    });
  });

});
define('dummy/tests/unit/helpers/color-scale-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/helpers');
  QUnit.test('unit/helpers/color-scale-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/helpers/color-scale-test.js should pass jshint.'); 
  });

});
define('dummy/tests/unit/helpers/negative-test', ['dummy/helpers/negative', 'qunit'], function (negative, qunit) {

  'use strict';

  qunit.module('Unit | Helper | negative');

  // Replace this with your real tests.
  qunit.test('Negate numbers, allows numbers and string input', function (assert) {
    assert.equal(negative.negative([42]), -42);
    assert.equal(negative.negative(['42']), -42);
    assert.equal(negative.negative(['-42']), 42);
    assert.equal(negative.negative(['##']), 0);
  });

});
define('dummy/tests/unit/helpers/negative-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/helpers');
  QUnit.test('unit/helpers/negative-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/helpers/negative-test.js should pass jshint.'); 
  });

});
define('dummy/tests/unit/helpers/transition-test', ['ember-cli-d3/components/data-visual/d3-selection-proxy', 'dummy/helpers/transition', 'qunit'], function (SelectionProxy, transition, qunit) {

  'use strict';

  qunit.module('Unit | Helper | transition');

  qunit.test('empty selection should not throw', function (assert) {
    assert.expect(0);

    transition.transition([], {});
  });

  qunit.test('apply d3 transition options when set', function (assert) {
    var delay = Math.floor(Math.random() * 1000);
    var duration = Math.floor(Math.random() * 1000);
    var sel = transition.transition([SelectionProxy['default'].create()], { delay: delay, duration: duration }).get('selection');

    assert.equal(delay, sel.delay());
    assert.equal(duration, sel.duration());
  });

});
define('dummy/tests/unit/helpers/transition-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/helpers');
  QUnit.test('unit/helpers/transition-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/helpers/transition-test.js should pass jshint.'); 
  });

});
define('dummy/tests/unit/helpers/translate-test', ['dummy/helpers/translate', 'qunit'], function (translate, qunit) {

  'use strict';

  qunit.module('Unit | Helper | translate');

  // Replace this with your real tests.
  qunit.test('Convert param array to transform string', function (assert) {
    assert.equal(translate.translate([]), 'translate(0 0)');
    assert.equal(translate.translate([5]), 'translate(5 0)');
    assert.equal(translate.translate([10, 10]), 'translate(10 10)');
  });

});
define('dummy/tests/unit/helpers/translate-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/helpers');
  QUnit.test('unit/helpers/translate-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/helpers/translate-test.js should pass jshint.'); 
  });

});
define('dummy/tests/unit/mixins/d3-support-test', ['ember', 'ember-cli-d3/mixins/d3-support', 'qunit'], function (Ember, D3SupportMixin, qunit) {

  'use strict';

  qunit.module('Unit | Mixin | d3 support');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var D3SupportObject = Ember['default'].Object.extend(D3SupportMixin['default']);
    var subject = D3SupportObject.create();
    assert.ok(subject);
  });

});
define('dummy/tests/unit/mixins/d3-support-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/mixins');
  QUnit.test('unit/mixins/d3-support-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/mixins/d3-support-test.js should pass jshint.'); 
  });

});
define('dummy/tests/unit/utils/lodash-test', ['qunit', 'ember-cli-d3/utils/lodash'], function (qunit, lodash) {

  'use strict';

  qunit.module('Unit | Utility | lodash');

  // Replace this with your real tests.
  qunit.test('lodash#scan', function (assert) {
    var actual, expected;

    actual = lodash.scan([1, 4, 2, 3, 10], function (prev, cur) {
      return prev + cur;
    }, 0);
    expected = [1, 5, 7, 10, 20];

    assert.deepEqual(actual, expected);

    actual = lodash.scan([1, 4, 2, 3, 10], function (prev, cur) {
      return prev + cur;
    });
    expected = [undefined, 5, 7, 10, 20];

    assert.deepEqual(actual, expected);
  });

});
define('dummy/tests/unit/utils/lodash-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/utils');
  QUnit.test('unit/utils/lodash-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/utils/lodash-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('dummy/config/environment', ['ember'], function(Ember) {
  var prefix = 'dummy';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("dummy/tests/test-helper");
} else {
  require("dummy/app")["default"].create({"name":"ember-cli-d3","version":"0.0.2+b4a81912"});
}

/* jshint ignore:end */
//# sourceMappingURL=dummy.map