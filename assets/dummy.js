"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('dummy/adapters/application', ['exports', 'ember-data-fixture-adapter'], function (exports, FixtureAdapter) {

  'use strict';


  FixtureAdapter['default'].reopen({
    findRecord: function findRecord(store, typeClass, id, snapshot) {
      return this.findExistingFixture(typeClass, snapshot);
    }
  });

  exports['default'] = FixtureAdapter['default'];

});
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
define('dummy/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'dummy/config/environment'], function (exports, AppVersionComponent, config) {

  'use strict';

  var name = config['default'].APP.name;
  var version = config['default'].APP.version;

  exports['default'] = AppVersionComponent['default'].extend({
    version: version,
    name: name
  });

});
define('dummy/components/block-page', ['exports', 'ember', 'dummy/templates/components/block-page'], function (exports, Ember, layout) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    layout: layout['default']
  });

});
define('dummy/components/block-thumb', ['exports', 'ember', 'dummy/templates/components/block-thumb', 'dummy/utils/model/dimensional', 'ember-cli-d3/utils/version'], function (exports, Ember, layout, DimensionalDataModel, version) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    layout: layout['default'],

    dimensionalDataSource: Ember['default'].inject.service('dimensional-data-source'),
    geospatialDataSource: Ember['default'].inject.service('geospatial-data-source'),

    visual: null,

    dataSource: version.computed('visual.modelType', function () {
      var type = this.get('visual.modelType');

      switch (type) {
        case 'dimensional':case 'temporal':
          return this.get('dimensionalDataSource');
        case 'geospatial':
          return this.get('geospatialDataSource');
      }
    }),

    model: version.computed('visual.modelType', 'dataSource.data', function () {
      var type = this.get('visual.modelType');
      var data = this.get('dataSource.data');

      switch (type) {
        case 'dimensional':
          return DimensionalDataModel['default'].create({
            data: data, series: ['dogs', 'cats'], key: 'state'
          });
        case 'temporal':
          return DimensionalDataModel['default'].create({
            data: data, series: ['dogs', 'cats'], key: 'timestamp'
          });
        case 'geospatial':
          return data;
      }
    })
  });

});
define('dummy/components/cart-axis', ['exports', 'ember', 'd3', 'ember-cli-d3/mixins/d3-support', 'ember-cli-d3/mixins/margin-convention', 'ember-cli-d3/utils/d3', 'ember-cli-d3/utils/version'], function (exports, Ember, d3, GraphicSupport, MarginConvention, utils__d3, version) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(GraphicSupport['default'], MarginConvention['default'], {
    layout: Ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0+2be95fad',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 9
            }
          }
        },
        isEmpty: false,
        arity: 0,
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
        statements: [['content', 'yield', ['loc', [null, [1, 0], [1, 9]]]]],
        locals: [],
        templates: []
      };
    })()),

    transform: null,

    ticks: 4,
    tickSize: 6,
    tickFormat: null,
    tickPadding: null,

    scale: null,

    axis: version.computed('scale', 'orient', 'tickCount', 'tickSize', 'tickFormat', 'tickPadding', {
      get: function get() {
        var props = this.getProperties('scale', 'orient', 'tickSize', 'tickFormat', 'tickPadding', 'ticks');

        return props.scale && utils__d3.assign(d3['default'].svg.axis(), props);
      }
    }).readOnly(),

    call: function call(sel) {
      var axis = this.get('axis');
      var transform = this.get('transform');

      if (axis) {
        sel.attr('id', this.elementId).attr('transform', transform).call(axis).each(function () {
          d3['default'].select(this).selectAll('.tick').classed('zero', function (data) {
            return !data;
          });
        });
      }
    }

  });

});
define('dummy/components/cart-grouped-bars', ['exports', 'ember', 'd3', 'ember-cli-d3/mixins/d3-support', 'ember-cli-d3/mixins/margin-convention', 'ember-cli-d3/utils/d3', 'ember-cli-d3/utils/version', 'ember-cli-d3/utils/css'], function (exports, Ember, d3, GraphicSupport, MarginConvention, utils__d3, version, css) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(GraphicSupport['default'], MarginConvention['default'], {
    layout: Ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0+2be95fad',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 60
            }
          }
        },
        isEmpty: false,
        arity: 0,
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
        statements: [['inline', 'yield', [['get', 'seriesSel', ['loc', [null, [1, 8], [1, 17]]]], ['get', 'xScale', ['loc', [null, [1, 18], [1, 24]]]], ['get', 'yScale', ['loc', [null, [1, 25], [1, 31]]]], ['get', 'contentWidth', ['loc', [null, [1, 32], [1, 44]]]], ['get', 'contentHeight', ['loc', [null, [1, 45], [1, 58]]]]], [], ['loc', [null, [1, 0], [1, 60]]]]],
        locals: [],
        templates: []
      };
    })()),

    model: null,

    stroke: d3['default'].scale.category10(),

    defaultMargin: css.box(60),
    orient: null, // TODO

    width: 300,
    height: 150,

    xScale: version.computed('contentWidth', 'model.data', 'model.key', {
      get: function get() {
        var width = this.get('contentWidth');
        var data = this.get('model.data');
        var key = this.get('model.key');

        return d3['default'].scale.ordinal().domain(!key ? data : data.map(function (data) {
          return Ember['default'].get(data, key);
        })).rangeBands([0, width], 0.5);
      }
    }).readOnly(),
    yScale: version.computed('contentHeight', 'model.extent', {
      get: function get() {
        var height = this.get('contentHeight');
        var extent = this.get('model.extent');

        extent[0] = Math.min(extent[0], 0);
        extent[1] = Math.max(extent[1], 0);

        if (extent[0] === extent[1]) {
          extent[1]++;
        }

        return d3['default'].scale.linear().domain(extent).range([0, -height]);
      }
    }).readOnly(),
    zScale: version.computed('xScale', 'model.series', {
      get: function get() {
        var series = this.get('model.series');
        var band = this.get('xScale').rangeBand();

        return d3['default'].scale.ordinal().domain(series.map(function (_ref) {
          var metricPath = _ref.metricPath;
          return metricPath;
        })).rangePoints([0, band], 1);
      }
    }).readOnly(),

    call: function call(selection) {
      var context = this;
      var top = this.get('margin.top');
      var left = this.get('margin.left');
      var height = this.get('contentHeight');
      var elementId = context.elementId;

      selection.each(function () {
        context.series(d3['default'].select(this).attr('id', elementId).attr('transform', 'translate(' + left + ' ' + (top + height) + ')'));
      });
    },

    series: utils__d3.join('model.series', '.series', {
      enter: function enter(selection) {
        var context = this;
        var color = this.get('stroke');
        var zScale = this.get('zScale');

        selection.append('g').style('stroke', function (_ref2) {
          var metricPath = _ref2.metricPath;
          return color(metricPath);
        }).attr('class', 'series').attr('transform', function (_ref3) {
          var metricPath = _ref3.metricPath;
          return 'translate(' + zScale(metricPath) + ' 0)';
        }).each(function (data) {
          context.bars(d3['default'].select(this), data);
        });
      },

      update: function update(selection) {
        var context = this;
        var color = this.get('stroke');
        var zScale = this.get('zScale');

        d3['default'].transition(selection).attr('transform', function (_ref4) {
          var metricPath = _ref4.metricPath;
          return 'translate(' + zScale(metricPath) + ' 0)';
        }).style('stroke', function (_ref5) {
          var metricPath = _ref5.metricPath;
          return color(metricPath);
        }).each(function (data) {
          context.bars(d3['default'].select(this), data);
        });
      }

    }),

    bars: utils__d3.join('model.data[model.key]', '.bar', {
      enter: function enter(selection) {
        var xScale = this.get('xScale');
        var yScale = this.get('yScale');
        var key = this.get('model.key');
        var zero = yScale(0);

        selection.append('g').attr('class', 'bar').attr('transform', utils__d3.translateX(function (data) {
          return xScale(Ember['default'].get(data, key));
        })).append('line').attr('class', 'shape').attr('x1', 0).attr('x2', 0).attr('y1', zero).attr('y2', zero);
      },
      update: function update(selection, series) {
        var xScale = this.get('xScale');
        var yScale = this.get('yScale');
        var zero = yScale(0);
        var key = this.get('model.key');

        d3['default'].transition(selection).attr('transform', utils__d3.translateX(function (data) {
          return xScale(Ember['default'].get(data, key));
        })).select('.shape').style('marker-start', null).style('marker-mid', null).style('marker-end', null).attr('x1', 0).attr('x2', 0).attr('y1', zero).attr('y2', function (data) {
          return yScale(data[series.metricPath]);
        });
      }
    })
  });

});
define('dummy/components/cart-lines', ['exports', 'ember', 'd3', 'ember-cli-d3/mixins/d3-support', 'ember-cli-d3/mixins/margin-convention', 'dummy/utils/model/dimensional', 'ember-cli-d3/utils/d3', 'ember-cli-d3/utils/lodash', 'ember-cli-d3/utils/version', 'ember-cli-d3/utils/css'], function (exports, Ember, d3, GraphicSupport, MarginConvention, DimensionalModel, utils__d3, lodash, version, css) {

  'use strict';

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports['default'] = Ember['default'].Component.extend(GraphicSupport['default'], MarginConvention['default'], {
    layout: Ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0+2be95fad',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 76
            }
          }
        },
        isEmpty: false,
        arity: 0,
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
        statements: [['inline', 'yield', [['get', 'seriesSel', ['loc', [null, [1, 8], [1, 17]]]], ['get', 'exportedXScale', ['loc', [null, [1, 18], [1, 32]]]], ['get', 'exportedYScale', ['loc', [null, [1, 33], [1, 47]]]], ['get', 'contentWidth', ['loc', [null, [1, 48], [1, 60]]]], ['get', 'contentHeight', ['loc', [null, [1, 61], [1, 74]]]]], [], ['loc', [null, [1, 0], [1, 76]]]]],
        locals: [],
        templates: []
      };
    })()),

    stroke: d3['default'].scale.category10(),

    defaultMargin: { left: 50, right: 0, top: 0, bottom: 50 },
    orient: null, // TODO

    model: null,

    width: 300,
    height: 150,

    onhover: null,

    exportedXScale: null,
    computedXScale: version.computed('contentWidth', 'model.data', 'model.key', function () {
      var width = this.get('contentWidth');
      var data = this.get('model.data');
      var key = this.get('model.key');
      var domain, scale;

      domain = !key ? data : d3['default'].extent(data, function (record) {
        return Ember['default'].get(record, key);
      });
      domain = domain.length ? domain : [0, 1];

      scale = domain.reduce(function (prev, cur) {
        return prev && cur instanceof Date;
      }, true);
      scale = scale ? d3['default'].time.scale() : d3['default'].scale.linear();

      return scale.domain(domain).range([0, width]);
    }).readOnly(),
    exportedYScale: null,
    computedYScale: version.computed('contentHeight', 'model.extent', function () {
      var height = this.get('contentHeight');
      var extent = this.get('model.extent');

      extent[0] = Math.min(extent[0], 0);
      extent[1] = Math.max(extent[1], 0);

      if (extent[0] === extent[1]) {
        extent[1]++;
      }

      return d3['default'].scale.linear().domain(extent).range([0, -height]);
    }).readOnly(),

    call: function call(selection) {
      var context = this;
      var top = this.get('margin.top');
      var left = this.get('margin.left');
      var height = this.get('contentHeight');
      var elementId = context.elementId;

      selection.each(function () {
        var selection = d3['default'].select(this);

        context.series(selection.attr('id', elementId).attr('transform', 'translate(' + left + ' ' + (top + height) + ')'));

        context.tracker(d3['default'].select(this));
      });
    },

    tracker: utils__d3.join([0], 'rect.backdrop', {
      update: function update(selection) {
        var self = this;
        var onhover = this.get('onhover');
        var data = this.get('model.data');
        var series = self.get('model.series');
        var key = this.get('model.key');

        var width = this.get('contentWidth');
        var height = this.get('contentHeight');
        var margin = this.get('margin');

        var xScale = this.get('computedXScale');
        var domain = xScale.range();
        var ticks = data.map(utils__d3.accessor(key));
        var band = (domain[1] - domain[0]) / ticks.length;

        var scale = d3['default'].scale.quantize().domain([domain[0] - band / 2, domain[1] + band / 2]).range(ticks.map(lodash.identity(1)));

        selection.style('fill', 'transparent').attr('transform', 'translate(0 ' + -height + ')').attr('width', width).attr('height', height);

        function closestData(_ref) {
          var _ref2 = _slicedToArray(_ref, 2);

          var x = _ref2[0];
          var y = _ref2[1];

          return data[scale(x)];
        }

        // This is quite expensive; only do this if we're watching
        if (onhover) {
          selection.on('mousemove.tracker', function () {
            onhover({ data: [closestData(d3['default'].mouse(this))], series: series, key: key });
          });
          selection.on('mouseout.tracker', function () {
            onhover({ data: [], series: series, key: key });
          });
        }
      }
    }),

    series: utils__d3.join('model.series', '.series', {
      enter: function enter(sel) {
        sel.append('g').attr('class', 'series').append('path').attr('class', 'shape');
      },

      update: function update(sel) {
        var self = this;
        var data = this.get('model.data');
        var key = this.get('model.key');
        var xScale = this.get('computedXScale');
        var yScale = this.get('computedYScale');

        var color = this.get('stroke');

        sel.style('stroke', function (_ref3) {
          var metricPath = _ref3.metricPath;
          return color(metricPath);
        }).each(function (series) {
          var path = d3['default'].transition(d3['default'].select(this).select('path').datum(data).style('fill', 'none').style('stroke-width', 5));

          var line = d3['default'].svg.line().x(function (record) {
            return xScale(record[key]);
          }).y(function (record) {
            return yScale(Ember['default'].get(record, series.metricPath));
          });

          if (!(path.delay && path.duration)) {
            path.attr('d', line);

            Ember['default'].run.join(function () {
              self.set('exportedXScale', xScale);
              self.set('exportedYScale', yScale);
            });
          } else {
            d3['default'].transition(path).style('opacity', 0).each('end', function () {
              Ember['default'].run.join(function () {
                self.set('exportedXScale', xScale);
                self.set('exportedYScale', yScale);
              });

              d3['default'].select(this).attr('d', line).transition().style('opacity', 1).styleTween('stroke-dasharray', function dashTween() {
                var total = this.getTotalLength();
                var interp = d3['default'].interpolateString('0,' + total, total + ',' + total);

                return function (time) {
                  return interp(time);
                };
              });
            });
          }
        });
      }
    })
  });

});
define('dummy/components/cart-marker', ['exports', 'ember', 'd3', 'ember-cli-d3/mixins/d3-support', 'ember-cli-d3/utils/d3'], function (exports, Ember, d3, GraphicSupport, utils__d3) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(GraphicSupport['default'], {
    layout: Ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0+2be95fad',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 9
            }
          }
        },
        isEmpty: false,
        arity: 0,
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
        statements: [['content', 'yield', ['loc', [null, [1, 0], [1, 9]]]]],
        locals: [],
        templates: []
      };
    })()),

    shape: null,
    applyTo: null,
    applyAt: Ember['default'].computed({
      set: function set(name, value) {
        if (Ember['default'].typeOf(value) === 'string') {
          return value.split(/\s*,\s*/);
        }

        return value;
      }
    }),

    tick: function tick(selection) {
      selection.attr('id', 'tick').attr('viewBox', '0 0 10 10').attr('refX', 0).attr('refY', 5).attr('markerWidth', 2).attr('markerHeight', 4).attr('orient', 'auto').append('line').classed(this.get('shape') + '-marker', true).attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', 10).style('stroke', 'black').style('stroke-width', 1);
    },

    marker: utils__d3.join([0], 'marker', {
      enter: function enter(selection) {
        var _this = this;

        var shape = this.get('shape');

        selection.append('marker').call(function (marker) {
          _this[shape](marker);
        });
      }
    }),

    apply: function apply(selection) {
      if (!selection) {
        return;
      }

      selection = selection.selectAll('.shape');

      this.get('applyAt').forEach(function (styleName) {
        selection.style(styleName, 'url(#tick)');
      });
    },

    call: function call(selection) {
      this.marker(selection);

      this.apply(this.get('applyTo'));
    }

  });

});
define('dummy/components/cart-stacked-bars', ['exports', 'ember', 'd3', 'ember-cli-d3/mixins/d3-support', 'ember-cli-d3/mixins/margin-convention', 'ember-cli-d3/utils/d3', 'ember-cli-d3/utils/lodash', 'ember-cli-d3/utils/version', 'ember-cli-d3/utils/css'], function (exports, Ember, d3, GraphicSupport, MarginConvention, utils__d3, lodash, version, css) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(GraphicSupport['default'], MarginConvention['default'], {
    layout: Ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0+2be95fad',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 60
            }
          }
        },
        isEmpty: false,
        arity: 0,
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
        statements: [['inline', 'yield', [['get', 'seriesSel', ['loc', [null, [1, 8], [1, 17]]]], ['get', 'xScale', ['loc', [null, [1, 18], [1, 24]]]], ['get', 'yScale', ['loc', [null, [1, 25], [1, 31]]]], ['get', 'contentWidth', ['loc', [null, [1, 32], [1, 44]]]], ['get', 'contentHeight', ['loc', [null, [1, 45], [1, 58]]]]], [], ['loc', [null, [1, 0], [1, 60]]]]],
        locals: [],
        templates: []
      };
    })()),

    defaultMargin: css.box(60),
    orient: null, // TODO

    signedValues: version.computed('model.data', 'model.series', {
      get: function get() {
        var data = this.get('model.data');
        var series = this.get('model.series');

        return data.map(function (record) {
          var positives = [];
          var negatives = [];

          positives.length = negatives.length = series.length;

          series.forEach(function (_ref, index) {
            var metricPath = _ref.metricPath;

            var value = Ember['default'].get(record, metricPath);

            (value > 0 ? positives : negatives)[index] = value;
          });

          return { negatives: negatives, positives: positives };
        });
      }
    }).readOnly(),

    layoutValues: version.computed('signedValues', 'model.data', 'model.series', 'model.key', {
      get: function get() {
        var data = this.get('model.data');
        var series = this.get('model.series');
        var key = this.get('model.key');
        var signedValues = this.get('signedValues');

        function layout(col) {
          return lodash.scan(col, function (prev, value, index) {
            var start = prev.end;
            var end = start + value;

            return { start: start, end: end, series: series[index] };
          }, { end: 0 });
        }
        return signedValues.map(function (_ref2) {
          var negatives = _ref2.negatives;
          var positives = _ref2.positives;

          positives = layout(positives);
          negatives = layout(negatives);

          return series.map(function (_, index) {
            return positives[index] || negatives[index];
          });
        }).reduce(function (accum, bySeries, index) {
          var keyValue = Ember['default'].get(data[index], key);

          accum[keyValue] = bySeries.reduce(function (accum, _ref3) {
            var series = _ref3.series;
            var start = _ref3.start;
            var end = _ref3.end;

            accum[series.metricPath] = { start: start, end: end };

            return accum;
          }, {});

          return accum;
        }, {});
      }
    }).readOnly(),

    xScale: version.computed('contentWidth', 'model.data', 'model.key', {
      get: function get() {
        var width = this.get('contentWidth');
        var data = this.get('model.data');
        var key = this.get('model.key');

        return d3['default'].scale.ordinal().domain(!key ? data : data.map(function (data) {
          return Ember['default'].get(data, key);
        })).rangePoints([0, width], 1);
      }
    }).readOnly(),
    yScale: version.computed('contentHeight', 'signedValues', {
      get: function get() {
        var height = this.get('contentHeight');
        var data = this.get('signedValues');
        var extent = [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY];

        data.forEach(function (_ref4) {
          var negatives = _ref4.negatives;
          var positives = _ref4.positives;

          extent[0] = Math.min(extent[0], d3['default'].sum(negatives));
          extent[1] = Math.max(extent[1], d3['default'].sum(positives));
        });

        extent[0] = Math.min(extent[0], 0);
        extent[1] = Math.max(extent[1], 0);

        if (extent[0] === extent[1]) {
          extent[1]++;
        }

        return d3['default'].scale.linear().domain(extent).range([0, -height]);
      }
    }).readOnly(),

    call: function call(selection) {
      var context = this;
      var top = this.get('margin.top');
      var left = this.get('margin.left');
      var height = this.get('contentHeight');
      var elementId = context.elementId;

      selection.each(function () {
        context.series(d3['default'].select(this).attr('id', elementId).attr('transform', 'translate(' + left + ' ' + (top + height) + ')'));
      });
    },

    series: utils__d3.join('model.series', '.series', {
      enter: function enter(selection) {
        var context = this;
        var color = this.get('stroke');

        selection.append('g').style('stroke', function (_ref5) {
          var metricPath = _ref5.metricPath;
          return color(metricPath);
        }).attr('class', 'series').attr('transform', function () {
          return 'translate(0 0)';
        }).each(function (data) {
          context.bars(d3['default'].select(this), data);
        });
      },

      update: function update(selection) {
        var context = this;
        var color = this.get('stroke');

        d3['default'].transition(selection).attr('transform', function () {
          return 'translate(0 0)';
        }).style('stroke', function (_ref6) {
          var metricPath = _ref6.metricPath;
          return color(metricPath);
        }).each(function (data) {
          context.bars(d3['default'].select(this), data);
        });
      }
    }),

    bars: utils__d3.join('model.data[model.key]', '.bar', {
      enter: function enter(selection) {
        var xScale = this.get('xScale');
        var yScale = this.get('yScale');
        var key = this.get('model.key');
        var zero = yScale(0);

        selection.append('g').attr('class', 'bar').attr('transform', utils__d3.translateX(function (record) {
          return xScale(Ember['default'].get(record, key));
        })).append('line').attr('class', 'shape').attr('x1', 0).attr('x2', 0).attr('y1', zero).attr('y2', zero);
      },
      update: function update(selection, _ref7) {
        var metricPath = _ref7.metricPath;

        var xScale = this.get('xScale');
        var yScale = this.get('yScale');
        var key = this.get('model.key');

        var layout = this.get('layoutValues');

        d3['default'].transition(selection).attr('transform', utils__d3.translateX(function (record) {
          return xScale(Ember['default'].get(record, key));
        })).select('.shape').style('marker-start', null).style('marker-mid', null).style('marker-end', null).attr('x1', 0).attr('x2', 0).attr('y1', function (record) {
          return yScale(layout[record[key]][metricPath].start);
        }).attr('y2', function (record) {
          return yScale(layout[record[key]][metricPath].end);
        });
      }
    })
  });

});
define('dummy/components/cart-tracker', ['exports', 'ember', 'd3', 'ember-cli-d3/mixins/d3-support', 'ember-cli-d3/utils/d3'], function (exports, Ember, d3, GraphicSupport, utils__d3) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(GraphicSupport['default'], {
    requiredProperties: ['xScale', 'yScale', 'model'],

    layout: Ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0+2be95fad',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 9
            }
          }
        },
        isEmpty: false,
        arity: 0,
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
        statements: [['content', 'yield', ['loc', [null, [1, 0], [1, 9]]]]],
        locals: [],
        templates: []
      };
    })()),

    model: null,

    width: null,
    height: null,
    xScale: null,
    yScale: null,
    offsetX: Ember['default'].computed('xScale', function () {
      return d3['default'].extent(this.get('xScale').range())[0];
    }),
    offsetY: Ember['default'].computed('yScale', function () {
      return d3['default'].extent(this.get('yScale').range())[0];
    }),

    line: utils__d3.join('model.data[model.key]', 'line.track-line', {
      update: function update(selection) {
        var data = this.get('model.data');
        var key = this.get('model.key');
        var scale = this.get('xScale');

        selection.style('stroke', 'red').style('stroke-width', 2).attr('y1', 0).attr('y2', this.get('height')).attr('x1', xPos).attr('x2', xPos);

        function xPos(datum) {
          return scale(datum[key]);
        }
      }
    }),

    call: function call(selection) {
      selection.attr('transform', 'translate(' + this.get('offsetX') + ' ' + this.get('offsetY') + ')');

      this.line(selection);
    }
  });

});
define('dummy/components/cart-waterfall-bars', ['exports', 'ember', 'd3', 'ember-cli-d3/mixins/d3-support', 'ember-cli-d3/mixins/margin-convention', 'ember-cli-d3/utils/d3', 'ember-cli-d3/utils/lodash', 'ember-cli-d3/utils/version', 'ember-cli-d3/utils/css'], function (exports, Ember, d3, GraphicSupport, MarginConvention, utils__d3, lodash, version, css) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(GraphicSupport['default'], MarginConvention['default'], {
    layout: Ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0+2be95fad',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 66
            }
          }
        },
        isEmpty: false,
        arity: 0,
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
        statements: [['inline', 'yield', [['get', 'seriesSelection', ['loc', [null, [1, 8], [1, 23]]]], ['get', 'xScale', ['loc', [null, [1, 24], [1, 30]]]], ['get', 'yScale', ['loc', [null, [1, 31], [1, 37]]]], ['get', 'contentWidth', ['loc', [null, [1, 38], [1, 50]]]], ['get', 'contentHeight', ['loc', [null, [1, 51], [1, 64]]]]], [], ['loc', [null, [1, 0], [1, 66]]]]],
        locals: [],
        templates: []
      };
    })()),

    defaultMargin: css.box(60),

    layoutValues: version.computed('model.data', 'model.series', 'model.key', {
      get: function get() {
        var data = this.get('model.data');
        var series = this.get('model.series');
        var key = this.get('model.key');

        var base = 0;

        return data.reduce(function (accum, datum) {
          accum[datum[key]] = series.reduce(function (accum, _ref) {
            var metricPath = _ref.metricPath;

            var change = datum[metricPath];
            var start = base;
            var end = base + change;

            base += change;

            accum[metricPath] = { start: start, end: end, change: change };

            return accum;
          }, {});

          return accum;
        }, {});
      }
    }).readOnly(),
    xScale: version.computed('contentWidth', 'model.data', 'model.key', {
      get: function get() {
        var width = this.get('contentWidth');
        var data = this.get('model.data');
        var key = this.get('model.key');

        return d3['default'].scale.ordinal().domain(!key ? data : data.map(function (data) {
          return Ember['default'].get(data, key);
        })).rangeBands([0, width], 0.5);
      }
    }).readOnly(),
    yScale: version.computed('contentHeight', 'model.data', 'model.series', {
      get: function get() {
        var height = this.get('contentHeight');
        var data = this.get('model.data');
        var series = this.get('model.series');
        var base = 0;
        var extent = [base, base];

        data.forEach(function (datum) {
          series.forEach(function (_ref2) {
            var metricPath = _ref2.metricPath;

            base += datum[metricPath];

            extent[0] = Math.min(extent[0], base);
            extent[1] = Math.max(extent[1], base);
          });
        });

        return d3['default'].scale.linear().domain(extent).range([0, -height]);
      }
    }).readOnly(),
    zScale: version.computed('xScale', 'model.series', {
      get: function get() {
        var series = this.get('model.series');
        var band = this.get('xScale').rangeBand();

        return d3['default'].scale.ordinal().domain(series.map(function (_ref3) {
          var metricPath = _ref3.metricPath;
          return metricPath;
        })).rangePoints([0, band], 1);
      }
    }).readOnly(),

    call: function call(selection) {
      var context = this;
      var top = this.get('margin.top');
      var left = this.get('margin.left');
      var height = this.get('contentHeight');
      var elementId = context.elementId;

      selection.each(function () {
        context.series(d3['default'].select(this).attr('id', elementId).attr('transform', 'translate(' + left + ' ' + (top + height) + ')'));
      });

      this.set('seriesSelection', selection.selectAll('.series'));
    },

    series: utils__d3.join('model.series', '.series', {
      enter: function enter(sel) {
        var context = this;
        var color = this.get('stroke');
        var zScale = this.get('zScale');

        sel.append('g').style('stroke', function (_ref4) {
          var metricPath = _ref4.metricPath;
          return color(metricPath);
        }).attr('class', 'series').attr('transform', function (_ref5) {
          var metricPath = _ref5.metricPath;
          return 'translate(' + zScale(metricPath) + ' 0)';
        }).each(function (data) {
          context.bars(d3['default'].select(this), data);
        });
      },

      update: function update(sel) {
        var context = this;
        var color = this.get('stroke');
        var zScale = this.get('zScale');

        d3['default'].transition(sel).attr('transform', function (_ref6) {
          var metricPath = _ref6.metricPath;
          return 'translate(' + zScale(metricPath) + ' 0)';
        }).style('stroke', function (_ref7) {
          var metricPath = _ref7.metricPath;
          return color(metricPath);
        }).each(function (data) {
          context.bars(d3['default'].select(this), data);
        });
      }
    }),

    bars: utils__d3.join('model.data[model.key]', '.bar', {
      enter: function enter(sel) {
        var xScale = this.get('xScale');
        var yScale = this.get('yScale');
        var key = this.get('model.key');
        var zero = yScale(0);

        sel.append('g').attr('class', 'bar').attr('transform', utils__d3.translateX(function (record) {
          return xScale(Ember['default'].get(record, key));
        })).append('line').attr('class', 'shape').attr('x1', 0).attr('x2', 0).attr('y1', zero).attr('y2', zero);
      },
      update: function update(sel, _ref8) {
        var metricPath = _ref8.metricPath;

        var xScale = this.get('xScale');
        var yScale = this.get('yScale');
        var key = this.get('model.key');

        var layout = this.get('layoutValues');

        d3['default'].transition(sel).attr('transform', utils__d3.translateX(function (record) {
          return xScale(Ember['default'].get(record, key));
        })).select('.shape').attr('x1', 0).attr('x2', 0).attr('y1', function (record) {
          return yScale(layout[record[key]][metricPath].start);
        }).attr('y2', function (record) {
          return yScale(layout[record[key]][metricPath].end);
        });
      }
    })
  });

});
define('dummy/components/data-visual', ['exports', 'ember-cli-d3/components/data-visual'], function (exports, data_visual) {

	'use strict';



	exports['default'] = data_visual['default'];

});
define('dummy/components/geo-albers-usa', ['exports', 'ember', 'd3', 'd3/plugins/mbostock/topojson', 'ember-cli-d3/mixins/d3-support', 'ember-cli-d3/mixins/margin-convention'], function (exports, Ember, d3, topojson, GraphicSupport, MarginConvention) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(GraphicSupport['default'], MarginConvention['default'], {
    requiredProperties: ['model'],
    layout: Ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0+2be95fad',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 9
            }
          }
        },
        isEmpty: false,
        arity: 0,
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
        statements: [['content', 'yield', ['loc', [null, [1, 0], [1, 9]]]]],
        locals: [],
        templates: []
      };
    })()),

    albersProjection: Ember['default'].computed('contentWidth', 'contentHeight', function () {
      var width = this.get('contentWidth');
      var height = this.get('contentHeight');

      return d3['default'].geo.albers().scale(500).translate([width / 2 + this.get('margin.left'), height / 2 + this.get('margin.top')]);
    }).readOnly(),

    pathGenerator: Ember['default'].computed('albersProjection', function () {
      var projection = this.get('albersProjection');

      return d3['default'].geo.path().projection(projection);
    }).readOnly(),

    call: function call(context) {
      var us = this.get('model');
      var path = this.get('pathGenerator').context(context);

      path(topojson['default'].feature(us, us.objects.states));

      context.stroke();
    }
  });

});
define('dummy/components/markdown-document', ['exports', 'ember', 'dummy/templates/components/markdown-document', 'ember-cli-d3/utils/lodash'], function (exports, Ember, layout, lodash) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    layout: layout['default'],

    classNames: ['markdown-body'],

    content: null,

    didRender: function didRender() {
      var headers = lodash.slice.call(this.$('h1, h2, h3, h4, h5'));

      var toc = headers.map(function (header) {
        return header.textContent;
      });

      headers.forEach(function (header) {
        header.id = header.textContent.toLowerCase().replace(/ /g, '-');
      });

      this.set('toc', toc);
    }
  });

});
define('dummy/components/polar-sunburst', ['exports', 'ember', 'd3', 'ember-cli-d3/mixins/d3-support', 'ember-cli-d3/mixins/margin-convention', 'ember-cli-d3/utils/d3'], function (exports, Ember, d3, GraphicSupport, MarginConvention, utils__d3) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(GraphicSupport['default'], MarginConvention['default'], {
    layout: Ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0+2be95fad',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 9
            }
          }
        },
        isEmpty: false,
        arity: 0,
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
        statements: [['content', 'yield', ['loc', [null, [1, 0], [1, 9]]]]],
        locals: [],
        templates: []
      };
    })()),

    radius: Ember['default'].computed('contentWidth', 'contentHeight', function () {
      return Math.min(this.get('contentWidth'), this.get('contentHeight')) / 2;
    }).readOnly(),

    xScale: Ember['default'].computed(function () {
      return d3['default'].scale.linear().range([0, 2 * Math.PI]);
    }).readOnly(),

    yScale: Ember['default'].computed('radius', function () {
      return d3['default'].scale.sqrt().range([0, this.get('radius')]);
    }).readOnly(),

    treeModel: Ember['default'].computed('model.data', 'model.series', 'model.key', function () {
      var data = this.get('model.data');
      var series = this.get('model.series');
      var key = this.get('model.key');

      return {
        name: 'root',
        children: data.map(function (datum) {
          return {
            name: datum[key],
            size: series.reduce(function (accum, _ref) {
              var metricPath = _ref.metricPath;

              return accum + Ember['default'].get(datum, metricPath);
            }, 0),
            children: series.map(function (_ref2) {
              var format = _ref2.format;
              var metricPath = _ref2.metricPath;

              return {
                name: format,
                size: Ember['default'].get(datum, metricPath),
                children: []
              };
            })
          };
        })
      };
    }),

    partitionLayout: Ember['default'].computed(function () {
      return d3['default'].layout.partition().sort(null).value(d3['default'].functor(1));
    }),

    arcGenerator: Ember['default'].computed('xScale', 'yScale', function () {
      var xScale = this.get('xScale');
      var yScale = this.get('yScale');

      return d3['default'].svg.arc().startAngle(function (_ref3) {
        var x = _ref3.x;
        return Math.max(0, Math.min(2 * Math.PI, xScale(x)));
      }).endAngle(function (_ref4) {
        var x = _ref4.x;
        var dx = _ref4.dx;
        return Math.max(0, Math.min(2 * Math.PI, xScale(x + dx)));
      }).innerRadius(function (_ref5) {
        var y = _ref5.y;
        return Math.max(0, yScale(y));
      }).outerRadius(function (_ref6) {
        var y = _ref6.y;
        var dy = _ref6.dy;
        return Math.max(0, yScale(y + dy));
      });
    }),

    call: function call(selection) {
      var width = this.get('contentWidth');
      var height = this.get('contentHeight');

      selection.datum(this.get('treeModel')).classed('sunburst', true).attr('transform', 'translate(' + width / 2 + ' ' + (height / 2 + this.get('margin.top')) + ')');

      this.innerLayer(selection);
    },

    innerLayer: utils__d3.join('partitionLayout.nodes', 'path.arc', {
      update: function update(selection) {
        var arc = this.get('arcGenerator');
        var color = d3['default'].scale.category20c();
        var node;

        selection.attr('d', arc).style('fill', function (datum) {
          return color((datum.children ? datum : datum.parent).name);
        })
        //.on("click", function (d) {
        //  node = d;
        //  path.transition()
        //    .duration(1000)
        //    .attrTween("d", arcTweenZoom(d));
        //})
        .each(stash);

        // Setup for switching data: stash the old values for transition.
        function stash(d) {
          d.x0 = d.x;
          d.dx0 = d.dx;
        }

        // When zooming: interpolate the scales.
        //function arcTweenZoom(d) {
        //  var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
        //      yd = d3.interpolate(y.domain(), [d.y, 1]),
        //      yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
        //  return function(d, i) {
        //    return i
        //        ? function(t) { return arc(d); }
        //        : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
        //  };
        //}
      }
    })
  });

});
define('dummy/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('dummy/controllers/gallery/albers-usa', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    dataSource: Ember['default'].inject.service('geospatial-data-source'),

    geospatialData: Ember['default'].computed.alias('dataSource.content')
  });

});
define('dummy/controllers/gallery/bars', ['exports', 'ember', 'dummy/utils/model/dimensional', 'ember-cli-d3/utils/version'], function (exports, Ember, DimensionalDataModel, version) {

  'use strict';


  exports['default'] = Ember['default'].Controller.extend({
    visual: null,

    app: Ember['default'].inject.controller('application'),

    dataSource: Ember['default'].inject.service('dimensional-data-source'),

    isGrouped: Ember['default'].computed.equal('app.currentRouteName', 'gallery.bars.grouped'),
    isStacked: Ember['default'].computed.equal('app.currentRouteName', 'gallery.bars.stacked'),
    isWaterfall: Ember['default'].computed.equal('app.currentRouteName', 'gallery.bars.waterfall'),

    data: Ember['default'].computed.alias('dataSource.data'),
    series: ['dogs', 'cats'],
    key: 'state',

    dimensionalData: version.computed('data', 'series', 'key', {
      get: function get() {
        return DimensionalDataModel['default'].create(this.getProperties('data', 'series', 'key'));
      }
    })

  });

});
define('dummy/controllers/gallery/lines', ['exports', 'ember', 'dummy/utils/model/dimensional', 'ember-cli-d3/utils/version'], function (exports, Ember, DimensionalDataModel, version) {

  'use strict';


  exports['default'] = Ember['default'].Controller.extend({
    visual: null,

    dataSource: Ember['default'].inject.service('dimensional-data-source'),

    data: version.computed('dataSource.data', {
      get: function get() {
        return this.get('dataSource.data').sort(function (valueA, valueB) {
          return valueA.timestamp - valueB.timestamp;
        });
      }
    }),
    series: ['dogs', 'cats'],
    key: 'timestamp',

    tracked: null,

    dimensionalData: version.computed('data', 'series', 'key', {
      get: function get() {
        return DimensionalDataModel['default'].create(this.getProperties('data', 'series', 'key'));
      }
    }),

    actions: {
      track: function track(model) {
        this.set('tracked', model);
      }
    }
  });

});
define('dummy/controllers/gallery/sunburst', ['exports', 'ember', 'dummy/utils/model/dimensional', 'ember-cli-d3/utils/version'], function (exports, Ember, DimensionalDataModel, version) {

  'use strict';


  exports['default'] = Ember['default'].Controller.extend({
    visual: null,

    dataSource: Ember['default'].inject.service('dimensional-data-source'),

    data: Ember['default'].computed.alias('dataSource.data'),
    series: ['dogs', 'cats'],
    key: 'state',

    dimensionalData: version.computed('data', 'series', 'key', {
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
define('dummy/ember-cli-d3/tests/modules/ember-cli-d3/components/data-visual.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-cli-d3/components');
  QUnit.test('modules/ember-cli-d3/components/data-visual.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/ember-cli-d3/components/data-visual.js should pass jshint.');
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
define('dummy/ember-cli-d3/tests/modules/ember-cli-d3/mixins/margin-convention.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-cli-d3/mixins');
  QUnit.test('modules/ember-cli-d3/mixins/margin-convention.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/ember-cli-d3/mixins/margin-convention.js should pass jshint.');
  });

});
define('dummy/ember-cli-d3/tests/modules/ember-cli-d3/system/canvas-proxy.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-cli-d3/system');
  QUnit.test('modules/ember-cli-d3/system/canvas-proxy.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/ember-cli-d3/system/canvas-proxy.js should pass jshint.');
  });

});
define('dummy/ember-cli-d3/tests/modules/ember-cli-d3/system/selection-proxy.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-cli-d3/system');
  QUnit.test('modules/ember-cli-d3/system/selection-proxy.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/ember-cli-d3/system/selection-proxy.js should pass jshint.');
  });

});
define('dummy/ember-cli-d3/tests/modules/ember-cli-d3/system/stage.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-cli-d3/system');
  QUnit.test('modules/ember-cli-d3/system/stage.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/ember-cli-d3/system/stage.js should pass jshint.');
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
define('dummy/ember-cli-d3/tests/modules/ember-cli-d3/utils/version.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/ember-cli-d3/utils');
  QUnit.test('modules/ember-cli-d3/utils/version.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/ember-cli-d3/utils/version.js should pass jshint.');
  });

});
define('dummy/helpers/color-scale', ['exports', 'ember-cli-d3/helpers/color-scale'], function (exports, color_scale) {

	'use strict';



	exports['default'] = color_scale['default'];
	exports.colorScale = color_scale.colorScale;

});
define('dummy/helpers/negative', ['exports', 'ember-cli-d3/helpers/negative'], function (exports, negative) {

	'use strict';



	exports['default'] = negative['default'];
	exports.negative = negative.negative;

});
define('dummy/helpers/transition', ['exports', 'ember-cli-d3/helpers/transition'], function (exports, transition) {

	'use strict';



	exports['default'] = transition['default'];
	exports.transition = transition.transition;

});
define('dummy/helpers/translate', ['exports', 'ember-cli-d3/helpers/translate'], function (exports, translate) {

	'use strict';



	exports['default'] = translate['default'];
	exports.translate = translate.translate;

});
define('dummy/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'dummy/config/environment'], function (exports, initializerFactory, config) {

  'use strict';

  exports['default'] = {
    name: 'App Version',
    initialize: initializerFactory['default'](config['default'].APP.name, config['default'].APP.version)
  };

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

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('dummy/mixins/gallery-route-mixin', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Mixin.create({
    model: function model() {
      return this.store.findRecord('visual', this.routeName);
    },
    setupController: function setupController(controller, model) {
      this.controllerFor(this.routeName.split('.').slice(0, 2).join('/')).setProperties({ model: model });
    }
  });

});
define('dummy/mixins/route-class', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Mixin.create({
    activate: function activate() {
      Ember['default'].$('body').addClass(this.toCssClass());
    },
    deactivate: function deactivate() {
      Ember['default'].$('body').removeClass(this.toCssClass());
    },
    toCssClass: function toCssClass() {
      return Ember['default'].String.dasherize(this.routeName.replace(/\./g, '-'));
    }
  });

});
define('dummy/models/visual', ['exports', 'ember', 'ember-data'], function (exports, Ember, DS) {

  'use strict';

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var VisualModel = DS['default'].Model.extend({
    name: DS['default'].attr('string'),
    alias: DS['default'].attr('array'),
    route: Ember['default'].computed.alias('id'),
    description: DS['default'].attr('string'),
    variations: DS['default'].hasMany('visual'),
    component: DS['default'].attr('string'),
    stage: DS['default'].attr(),
    modelType: DS['default'].attr('string')
  });

  function use(type) {
    return _defineProperty({}, type, true);
  }

  VisualModel.reopenClass({
    FIXTURES: [{
      id: 'gallery.bars.grouped',
      name: 'Grouped Bar Chart',
      alias: [],
      component: 'cart-grouped-bars',
      stage: use('svg'),
      modelType: 'dimensional',
      variations: ['gallery.bars.stacked', 'gallery.bars.waterfall'],
      description: '\n        Bar chart uses either vertical or horizontal bars to\n        compare quantatative data accross multiple categories.\n\n        A grouped bar chart gives you one extra dimension\n        to compare data with. Compare to a stacked bar chart,\n        grouped bar chart has bars precisely aligned with\n        the axis, giving you a precise visual comparison\n        among bars.\n      '
    }, {
      id: 'gallery.bars.stacked',
      name: 'Stacked Bars',
      alias: [],
      component: 'cart-stacked-bars',
      stage: use('svg'),
      modelType: 'dimensional',
      variations: ['gallery.bars.grouped', 'gallery.bars.waterfall'],
      description: '\n        Bar chart uses either vertical or horizontal bars to\n        compare quantatative data accross multiple categories.\n\n        A stacked bar chart gives you one extra dimension\n        to compare data with. Compare to a grouped bar chart,\n        stacked bar chart has a cleaner look at the number of\n        bars increase.\n      '
    }, {
      id: 'gallery.bars.waterfall',
      name: 'Waterfall',
      alias: [],
      component: 'cart-waterfall-bars',
      stage: use('svg'),
      modelType: 'dimensional',
      variations: ['gallery.bars.grouped', 'gallery.bars.stacked'],
      description: '\n      '
    }, {
      id: 'gallery.lines',
      name: 'Lines',
      alias: [],
      component: 'cart-lines',
      stage: use('svg'),
      modelType: 'temporal',
      variations: [],
      description: '\n        Line chart shows quantatative data over a numerical\n        interval. The slope the lines gives you visual indication\n        on the rate of change from one tick to the next\n      '
    }, {
      id: 'gallery.sunburst',
      name: 'Sunburst',
      alias: [],
      component: 'polar-sunburst',
      stage: use('svg'),
      modelType: 'dimensional',
      variations: [],
      description: '\n      '
    }, {
      id: 'gallery.albers-usa',
      name: 'Albers USA Projection',
      alias: [],
      component: 'geo-albers-usa',
      stage: use('canvas'),
      modelType: 'geospatial',
      variations: [],
      description: '\n      '
    }]
  });

  exports['default'] = VisualModel;

});
define('dummy/router', ['exports', 'ember', 'dummy/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('home', { path: '/' });
    this.route('guides');
    this.route('gallery', function () {
      this.route('bars', function () {
        this.route('grouped');
        this.route('stacked');
        this.route('waterfall');
      });
      this.route('lines');
      this.route('area');
      this.route('stacked');
      //this.route('histogram');
      //this.route('scatter-plot');
      this.route('sunburst');
      this.route('albers-usa');
    });
  });

  exports['default'] = Router;

});
define('dummy/routes/gallery/albers-usa', ['exports', 'ember', 'dummy/mixins/route-class', 'dummy/mixins/gallery-route-mixin'], function (exports, Ember, AttachClassName, Gallery) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend(AttachClassName['default'], Gallery['default'], {});

});
define('dummy/routes/gallery/bars/grouped', ['exports', 'ember', 'dummy/mixins/route-class', 'dummy/mixins/gallery-route-mixin'], function (exports, Ember, AttachClassName, Gallery) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend(AttachClassName['default'], Gallery['default'], {});

});
define('dummy/routes/gallery/bars/index', ['exports', 'ember', 'dummy/mixins/route-class'], function (exports, Ember, AttachClassName) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend(AttachClassName['default'], {
    redirect: function redirect(visuals, transition) {
      this.transitionTo('gallery.bars.grouped');
    }
  });

});
define('dummy/routes/gallery/bars/stacked', ['exports', 'ember', 'dummy/mixins/route-class', 'dummy/mixins/gallery-route-mixin'], function (exports, Ember, AttachClassName, Gallery) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend(AttachClassName['default'], Gallery['default'], {});

});
define('dummy/routes/gallery/bars/waterfall', ['exports', 'ember', 'dummy/mixins/route-class', 'dummy/mixins/gallery-route-mixin'], function (exports, Ember, AttachClassName, Gallery) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend(AttachClassName['default'], Gallery['default'], {});

});
define('dummy/routes/gallery/lines/index', ['exports', 'ember', 'dummy/mixins/route-class'], function (exports, Ember, AttachClassName) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend(AttachClassName['default'], {
    model: function model() {
      return this.store.findRecord('visual', 'gallery.lines');
    },

    setupController: function setupController(controller, model) {
      this.controllerFor('gallery/lines').setProperties({ model: model });
    }
  });

});
define('dummy/routes/gallery/sunburst', ['exports', 'ember', 'dummy/mixins/route-class', 'dummy/mixins/gallery-route-mixin'], function (exports, Ember, AttachClassName, Gallery) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend(AttachClassName['default'], Gallery['default'], {});

});
define('dummy/routes/gallery', ['exports', 'ember', 'dummy/mixins/route-class'], function (exports, Ember, AttachClassName) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend(AttachClassName['default'], {
    model: function model() {
      return this.store.findAll('visual');
    }
  });

});
define('dummy/routes/guides', ['exports', 'ember', 'dummy/mixins/route-class'], function (exports, Ember, AttachClassName) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend(AttachClassName['default'], {
    model: function model() {
      return Ember['default'].$.get('guides.html');
    }
  });

});
define('dummy/routes/home', ['exports', 'ember', 'dummy/mixins/route-class'], function (exports, Ember, AttachClassName) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend(AttachClassName['default'], {});

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
define('dummy/services/geospatial-data-source', ['exports', 'ember', 'ic-ajax'], function (exports, Ember, ic_ajax) {

  'use strict';

  exports['default'] = Ember['default'].Service.extend(Ember['default'].PromiseProxyMixin, {
    data: Ember['default'].computed.alias('content'),

    init: function init() {
      this._super.apply(this, arguments);

      this.set('promise', ic_ajax.request('us.json'));
    }
  });

});
define('dummy/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0+2be95fad",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 6
            },
            "end": {
              "line": 10,
              "column": 63
            }
          },
          "moduleName": "dummy/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("ember-cli-d3");
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
          "topLevel": null,
          "revision": "Ember@2.1.0+2be95fad",
          "loc": {
            "source": null,
            "start": {
              "line": 15,
              "column": 12
            },
            "end": {
              "line": 15,
              "column": 39
            }
          },
          "moduleName": "dummy/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Guides");
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
          "topLevel": null,
          "revision": "Ember@2.1.0+2be95fad",
          "loc": {
            "source": null,
            "start": {
              "line": 16,
              "column": 12
            },
            "end": {
              "line": 16,
              "column": 41
            }
          },
          "moduleName": "dummy/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Gallery");
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
    return {
      meta: {
        "topLevel": false,
        "revision": "Ember@2.1.0+2be95fad",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 23,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/application.hbs"
      },
      isEmpty: false,
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
        dom.setAttribute(el2,"class","container");
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
        dom.setAttribute(el4,"data-target","#nav-links");
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
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","collapse navbar-collapse");
        dom.setAttribute(el3,"id","nav-links");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4,"class","nav navbar-nav");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("section");
        dom.setAttribute(el1,"class","container");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var element1 = dom.childAt(element0, [3, 1]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),3,3);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [3]),0,0);
        morphs[3] = dom.createMorphAt(dom.childAt(fragment, [2]),0,0);
        return morphs;
      },
      statements: [
        ["block","link-to",["home"],["classNames","navbar-brand"],0,null,["loc",[null,[10,6],[10,75]]]],
        ["block","link-to",["guides"],[],1,null,["loc",[null,[15,12],[15,51]]]],
        ["block","link-to",["gallery"],[],2,null,["loc",[null,[16,12],[16,53]]]],
        ["content","outlet",["loc",[null,[22,27],[22,37]]]]
      ],
      locals: [],
      templates: [child0, child1, child2]
    };
  }()));

});
define('dummy/templates/components/block-page', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0+2be95fad",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "dummy/templates/components/block-page.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
          return morphs;
        },
        statements: [
          ["content","tag",["loc",[null,[2,8],[2,15]]]]
        ],
        locals: ["tag"],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0+2be95fad",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 4
            },
            "end": {
              "line": 23,
              "column": 4
            }
          },
          "moduleName": "dummy/templates/components/block-page.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","col-xs-6");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
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
          ["inline","block-thumb",[],["visual",["subexpr","@mut",[["get","visual",["loc",[null,[21,29],[21,35]]]]],[],[]]],["loc",[null,[21,8],[21,37]]]]
        ],
        locals: ["visual"],
        templates: []
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0+2be95fad",
          "loc": {
            "source": null,
            "start": {
              "line": 23,
              "column": 4
            },
            "end": {
              "line": 27,
              "column": 4
            }
          },
          "moduleName": "dummy/templates/components/block-page.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","col-xs-12");
          var el2 = dom.createTextNode("\n        None\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
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
    return {
      meta: {
        "topLevel": false,
        "revision": "Ember@2.1.0+2be95fad",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 30,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/components/block-page.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","aspect-ratio aspect-ratio-21-9 col-xs-12");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","visual-content");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        dom.setAttribute(el2,"class","visual-name col-sm-12");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-sm-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h3");
        dom.setAttribute(el3,"class","col-xs-12 row");
        var el4 = dom.createTextNode("Description");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3,"class","col-xs-12 row");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-sm-6 row");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h3");
        dom.setAttribute(el3,"class","col-xs-12");
        var el4 = dom.createTextNode("Variations");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [3]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [1, 1, 1]),1,1);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [3, 3]),0,0);
        morphs[4] = dom.createMorphAt(dom.childAt(element0, [5]),3,3);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["block","each",[["get","visual.tags",["loc",[null,[1,8],[1,19]]]]],[],0,null,["loc",[null,[1,0],[3,9]]]],
        ["content","yield",["loc",[null,[7,6],[7,15]]]],
        ["content","visual.name",["loc",[null,[12,36],[12,51]]]],
        ["content","visual.description",["loc",[null,[15,29],[15,51]]]],
        ["block","each",[["get","visual.variations",["loc",[null,[19,12],[19,29]]]]],[],1,2,["loc",[null,[19,4],[27,13]]]]
      ],
      locals: [],
      templates: [child0, child1, child2]
    };
  }()));

});
define('dummy/templates/components/block-thumb', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "topLevel": null,
              "revision": "Ember@2.1.0+2be95fad",
              "loc": {
                "source": null,
                "start": {
                  "line": 4,
                  "column": 6
                },
                "end": {
                  "line": 9,
                  "column": 6
                }
              },
              "moduleName": "dummy/templates/components/block-thumb.hbs"
            },
            isEmpty: false,
            arity: 3,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("        ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
              return morphs;
            },
            statements: [
              ["inline","component",[["get","visual.component",["loc",[null,[5,20],[5,36]]]]],["select",["subexpr","@mut",[["get","ctx.svg.select.chart",["loc",[null,[6,17],[6,37]]]]],[],[]],"model",["subexpr","@mut",[["get","model",["loc",[null,[6,44],[6,49]]]]],[],[]],"width",["subexpr","@mut",[["get","width",["loc",[null,[6,56],[6,61]]]]],[],[]],"height",["subexpr","@mut",[["get","height",["loc",[null,[6,69],[6,75]]]]],[],[]],"margin","10","stroke",["subexpr","color-scale",["category10"],[],["loc",[null,[7,29],[7,55]]]]],["loc",[null,[5,8],[8,10]]]]
            ],
            locals: ["ctx","width","height"],
            templates: []
          };
        }());
        return {
          meta: {
            "topLevel": null,
            "revision": "Ember@2.1.0+2be95fad",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 4
              },
              "end": {
                "line": 10,
                "column": 4
              }
            },
            "moduleName": "dummy/templates/components/block-thumb.hbs"
          },
          isEmpty: false,
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
            ["block","data-visual",[],[],0,null,["loc",[null,[4,6],[9,22]]]]
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
                "topLevel": null,
                "revision": "Ember@2.1.0+2be95fad",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 11,
                    "column": 6
                  },
                  "end": {
                    "line": 16,
                    "column": 6
                  }
                },
                "moduleName": "dummy/templates/components/block-thumb.hbs"
              },
              isEmpty: false,
              arity: 3,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("        ");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
                return morphs;
              },
              statements: [
                ["inline","component",[["get","visual.component",["loc",[null,[12,20],[12,36]]]]],["select",["subexpr","@mut",[["get","ctx.canvas",["loc",[null,[13,17],[13,27]]]]],[],[]],"model",["subexpr","@mut",[["get","model",["loc",[null,[13,34],[13,39]]]]],[],[]],"width",["subexpr","@mut",[["get","width",["loc",[null,[13,46],[13,51]]]]],[],[]],"height",["subexpr","@mut",[["get","height",["loc",[null,[13,59],[13,65]]]]],[],[]],"margin","10","stroke",["subexpr","color-scale",["category10"],[],["loc",[null,[14,29],[14,55]]]]],["loc",[null,[12,8],[15,10]]]]
              ],
              locals: ["ctx","width","height"],
              templates: []
            };
          }());
          return {
            meta: {
              "topLevel": null,
              "revision": "Ember@2.1.0+2be95fad",
              "loc": {
                "source": null,
                "start": {
                  "line": 10,
                  "column": 4
                },
                "end": {
                  "line": 17,
                  "column": 4
                }
              },
              "moduleName": "dummy/templates/components/block-thumb.hbs"
            },
            isEmpty: false,
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
              ["block","data-visual",[],[],0,null,["loc",[null,[11,6],[16,22]]]]
            ],
            locals: [],
            templates: [child0]
          };
        }());
        var child1 = (function() {
          return {
            meta: {
              "topLevel": null,
              "revision": "Ember@2.1.0+2be95fad",
              "loc": {
                "source": null,
                "start": {
                  "line": 17,
                  "column": 4
                },
                "end": {
                  "line": 20,
                  "column": 4
                }
              },
              "moduleName": "dummy/templates/components/block-thumb.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("      Visual Model stage type not set:\n      ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n    ");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
              return morphs;
            },
            statements: [
              ["inline","log",[["get","visual.stage",["loc",[null,[19,12],[19,24]]]]],[],["loc",[null,[19,6],[19,26]]]]
            ],
            locals: [],
            templates: []
          };
        }());
        return {
          meta: {
            "topLevel": null,
            "revision": "Ember@2.1.0+2be95fad",
            "loc": {
              "source": null,
              "start": {
                "line": 10,
                "column": 4
              },
              "end": {
                "line": 20,
                "column": 4
              }
            },
            "moduleName": "dummy/templates/components/block-thumb.hbs"
          },
          isEmpty: false,
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
            ["block","if",[["get","visual.stage.canvas",["loc",[null,[10,14],[10,33]]]]],[],0,1,["loc",[null,[10,4],[20,4]]]]
          ],
          locals: [],
          templates: [child0, child1]
        };
      }());
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0+2be95fad",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 21,
              "column": 2
            }
          },
          "moduleName": "dummy/templates/components/block-thumb.hbs"
        },
        isEmpty: false,
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
          ["block","if",[["get","visual.stage.svg",["loc",[null,[3,10],[3,26]]]]],[],0,1,["loc",[null,[3,4],[20,11]]]]
        ],
        locals: [],
        templates: [child0, child1]
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0+2be95fad",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 23,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/components/block-thumb.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","aspect-ratio aspect-ratio-21-9");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),1,1);
        return morphs;
      },
      statements: [
        ["block","link-to",[["get","visual.route",["loc",[null,[2,13],[2,25]]]]],["classNames","thumbnail"],0,null,["loc",[null,[2,2],[21,14]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('dummy/templates/components/markdown-document', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0+2be95fad",
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
        "moduleName": "dummy/templates/components/markdown-document.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createUnsafeMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","content",["loc",[null,[1,0],[1,13]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('dummy/templates/gallery/albers-usa', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "topLevel": null,
              "revision": "Ember@2.1.0+2be95fad",
              "loc": {
                "source": null,
                "start": {
                  "line": 3,
                  "column": 4
                },
                "end": {
                  "line": 6,
                  "column": 4
                }
              },
              "moduleName": "dummy/templates/gallery/albers-usa.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("\n");
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
        return {
          meta: {
            "topLevel": null,
            "revision": "Ember@2.1.0+2be95fad",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 7,
                "column": 2
              }
            },
            "moduleName": "dummy/templates/gallery/albers-usa.hbs"
          },
          isEmpty: false,
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
            ["block","geo-albers-usa",[],["select",["subexpr","@mut",[["get","ctx.canvas",["loc",[null,[3,29],[3,39]]]]],[],[]],"model",["subexpr","@mut",[["get","geospatialData",["loc",[null,[3,46],[3,60]]]]],[],[]],"width",["subexpr","@mut",[["get","width",["loc",[null,[3,67],[3,72]]]]],[],[]],"height",["subexpr","@mut",[["get","height",["loc",[null,[3,80],[3,86]]]]],[],[]],"margin","10","stroke",["subexpr","color-scale",["category10"],[],["loc",[null,[4,29],[4,55]]]]],0,null,["loc",[null,[3,4],[6,23]]]]
          ],
          locals: ["ctx","width","height"],
          templates: [child0]
        };
      }());
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0+2be95fad",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 8,
              "column": 0
            }
          },
          "moduleName": "dummy/templates/gallery/albers-usa.hbs"
        },
        isEmpty: false,
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
          ["block","data-visual",[],[],0,null,["loc",[null,[2,2],[7,18]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0+2be95fad",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/gallery/albers-usa.hbs"
      },
      isEmpty: false,
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
        ["block","block-page",[],["visual",["subexpr","@mut",[["get","model",["loc",[null,[1,21],[1,26]]]]],[],[]]],0,null,["loc",[null,[1,0],[8,15]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('dummy/templates/gallery/bars/waterfall', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0+2be95fad",
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
        "moduleName": "dummy/templates/gallery/bars/waterfall.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
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
        ["content","outlet",["loc",[null,[1,0],[1,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('dummy/templates/gallery/bars', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          var child0 = (function() {
            return {
              meta: {
                "topLevel": null,
                "revision": "Ember@2.1.0+2be95fad",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 4,
                    "column": 6
                  },
                  "end": {
                    "line": 15,
                    "column": 6
                  }
                },
                "moduleName": "dummy/templates/gallery/bars.hbs"
              },
              isEmpty: false,
              arity: 5,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("\n        ");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n        ");
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
                ["inline","cart-axis",[],["select",["subexpr","transition",[["get","ctx.svg.select.chart.x-axis",["loc",[null,[8,39],[8,66]]]]],[],["loc",[null,[8,27],[8,67]]]],"scale",["subexpr","@mut",[["get","x-scale",["loc",[null,[8,74],[8,81]]]]],[],[]],"orient","bottom","tickSize",["subexpr","negative",[["get","height",["loc",[null,[9,45],[9,51]]]]],[],["loc",[null,[9,35],[9,52]]]],"tickPadding",6],["loc",[null,[8,8],[10,10]]]],
                ["inline","cart-axis",[],["select",["subexpr","transition",[["get","ctx.svg.select.chart.y-axis",["loc",[null,[11,39],[11,66]]]]],[],["loc",[null,[11,27],[11,67]]]],"scale",["subexpr","@mut",[["get","y-scale",["loc",[null,[11,74],[11,81]]]]],[],[]],"orient","left","tickSize",["subexpr","negative",[["get","width",["loc",[null,[12,43],[12,48]]]]],[],["loc",[null,[12,33],[12,49]]]],"tickPadding",6],["loc",[null,[11,8],[13,10]]]]
              ],
              locals: ["selection","x-scale","y-scale","width","height"],
              templates: []
            };
          }());
          return {
            meta: {
              "topLevel": null,
              "revision": "Ember@2.1.0+2be95fad",
              "loc": {
                "source": null,
                "start": {
                  "line": 3,
                  "column": 4
                },
                "end": {
                  "line": 16,
                  "column": 4
                }
              },
              "moduleName": "dummy/templates/gallery/bars.hbs"
            },
            isEmpty: false,
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
              ["block","cart-grouped-bars",[],["select",["subexpr","transition",[["get","ctx.svg.select.chart",["loc",[null,[4,46],[4,66]]]]],[],["loc",[null,[4,34],[4,67]]]],"model",["subexpr","@mut",[["get","dimensionalData",["loc",[null,[4,74],[4,89]]]]],[],[]],"width",["subexpr","@mut",[["get","width",["loc",[null,[4,96],[4,101]]]]],[],[]],"height",["subexpr","@mut",[["get","height",["loc",[null,[4,109],[4,115]]]]],[],[]],"margin","10 10 25 65","stroke",["subexpr","color-scale",["category10"],[],["loc",[null,[5,40],[5,66]]]]],0,null,["loc",[null,[4,6],[15,28]]]]
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
                  "topLevel": null,
                  "revision": "Ember@2.1.0+2be95fad",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 17,
                      "column": 6
                    },
                    "end": {
                      "line": 28,
                      "column": 6
                    }
                  },
                  "moduleName": "dummy/templates/gallery/bars.hbs"
                },
                isEmpty: false,
                arity: 5,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("\n        ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createComment("");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n        ");
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
                  ["inline","cart-axis",[],["select",["subexpr","transition",[["get","ctx.svg.select.chart.x-axis",["loc",[null,[21,39],[21,66]]]]],[],["loc",[null,[21,27],[21,67]]]],"scale",["subexpr","@mut",[["get","x-scale",["loc",[null,[21,74],[21,81]]]]],[],[]],"orient","bottom","tickSize",["subexpr","negative",[["get","height",["loc",[null,[22,45],[22,51]]]]],[],["loc",[null,[22,35],[22,52]]]],"tickPadding",6],["loc",[null,[21,8],[23,10]]]],
                  ["inline","cart-axis",[],["select",["subexpr","transition",[["get","ctx.svg.select.chart.y-axis",["loc",[null,[24,39],[24,66]]]]],[],["loc",[null,[24,27],[24,67]]]],"scale",["subexpr","@mut",[["get","y-scale",["loc",[null,[24,74],[24,81]]]]],[],[]],"orient","left","tickSize",["subexpr","negative",[["get","width",["loc",[null,[25,43],[25,48]]]]],[],["loc",[null,[25,33],[25,49]]]],"tickPadding",6],["loc",[null,[24,8],[26,10]]]]
                ],
                locals: ["selection","x-scale","y-scale","width","height"],
                templates: []
              };
            }());
            return {
              meta: {
                "topLevel": null,
                "revision": "Ember@2.1.0+2be95fad",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 16,
                    "column": 4
                  },
                  "end": {
                    "line": 29,
                    "column": 4
                  }
                },
                "moduleName": "dummy/templates/gallery/bars.hbs"
              },
              isEmpty: false,
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
                ["block","cart-stacked-bars",[],["select",["subexpr","transition",[["get","ctx.svg.select.chart",["loc",[null,[17,46],[17,66]]]]],[],["loc",[null,[17,34],[17,67]]]],"model",["subexpr","@mut",[["get","dimensionalData",["loc",[null,[17,74],[17,89]]]]],[],[]],"width",["subexpr","@mut",[["get","width",["loc",[null,[17,96],[17,101]]]]],[],[]],"height",["subexpr","@mut",[["get","height",["loc",[null,[17,109],[17,115]]]]],[],[]],"margin","10 10 25 65","stroke",["subexpr","color-scale",["category10"],[],["loc",[null,[18,40],[18,66]]]]],0,null,["loc",[null,[17,6],[28,28]]]]
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
                    "topLevel": null,
                    "revision": "Ember@2.1.0+2be95fad",
                    "loc": {
                      "source": null,
                      "start": {
                        "line": 30,
                        "column": 6
                      },
                      "end": {
                        "line": 43,
                        "column": 6
                      }
                    },
                    "moduleName": "dummy/templates/gallery/bars.hbs"
                  },
                  isEmpty: false,
                  arity: 5,
                  cachedFragment: null,
                  hasRendered: false,
                  buildFragment: function buildFragment(dom) {
                    var el0 = dom.createDocumentFragment();
                    var el1 = dom.createTextNode("\n        ");
                    dom.appendChild(el0, el1);
                    var el1 = dom.createComment("");
                    dom.appendChild(el0, el1);
                    var el1 = dom.createTextNode("\n\n        ");
                    dom.appendChild(el0, el1);
                    var el1 = dom.createComment("");
                    dom.appendChild(el0, el1);
                    var el1 = dom.createTextNode("\n        ");
                    dom.appendChild(el0, el1);
                    var el1 = dom.createComment("");
                    dom.appendChild(el0, el1);
                    var el1 = dom.createTextNode("\n\n");
                    dom.appendChild(el0, el1);
                    return el0;
                  },
                  buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                    var morphs = new Array(3);
                    morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
                    morphs[1] = dom.createMorphAt(fragment,3,3,contextualElement);
                    morphs[2] = dom.createMorphAt(fragment,5,5,contextualElement);
                    return morphs;
                  },
                  statements: [
                    ["inline","cart-marker",[],["select",["subexpr","@mut",[["get","ctx.svg.defs",["loc",[null,[34,29],[34,41]]]]],[],[]],"shape","tick","applyTo",["subexpr","@mut",[["get","selection",["loc",[null,[34,63],[34,72]]]]],[],[]],"applyAt","marker-start"],["loc",[null,[34,8],[34,97]]]],
                    ["inline","cart-axis",[],["select",["subexpr","transition",[["get","ctx.svg.select.chart.x-axis",["loc",[null,[36,39],[36,66]]]]],[],["loc",[null,[36,27],[36,67]]]],"scale",["subexpr","@mut",[["get","x-scale",["loc",[null,[36,74],[36,81]]]]],[],[]],"orient","bottom","tickSize",["subexpr","negative",[["get","height",["loc",[null,[37,45],[37,51]]]]],[],["loc",[null,[37,35],[37,52]]]],"tickPadding",6],["loc",[null,[36,8],[38,10]]]],
                    ["inline","cart-axis",[],["select",["subexpr","transition",[["get","ctx.svg.select.chart.y-axis",["loc",[null,[39,39],[39,66]]]]],[],["loc",[null,[39,27],[39,67]]]],"scale",["subexpr","@mut",[["get","y-scale",["loc",[null,[39,74],[39,81]]]]],[],[]],"orient","left","tickSize",["subexpr","negative",[["get","width",["loc",[null,[40,43],[40,48]]]]],[],["loc",[null,[40,33],[40,49]]]],"tickPadding",6],["loc",[null,[39,8],[41,10]]]]
                  ],
                  locals: ["selection","x-scale","y-scale","width","height"],
                  templates: []
                };
              }());
              return {
                meta: {
                  "topLevel": null,
                  "revision": "Ember@2.1.0+2be95fad",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 29,
                      "column": 4
                    },
                    "end": {
                      "line": 44,
                      "column": 4
                    }
                  },
                  "moduleName": "dummy/templates/gallery/bars.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createComment("");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("    ");
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
                  ["block","cart-waterfall-bars",[],["select",["subexpr","transition",[["get","ctx.svg.select.chart",["loc",[null,[30,48],[30,68]]]]],[],["loc",[null,[30,36],[30,69]]]],"model",["subexpr","@mut",[["get","dimensionalData",["loc",[null,[30,76],[30,91]]]]],[],[]],"width",["subexpr","@mut",[["get","width",["loc",[null,[30,98],[30,103]]]]],[],[]],"height",["subexpr","@mut",[["get","height",["loc",[null,[30,111],[30,117]]]]],[],[]],"margin","10 10 25 65","stroke",["subexpr","color-scale",["category10"],[],["loc",[null,[31,40],[31,66]]]]],0,null,["loc",[null,[30,6],[43,30]]]]
                ],
                locals: [],
                templates: [child0]
              };
            }());
            return {
              meta: {
                "topLevel": null,
                "revision": "Ember@2.1.0+2be95fad",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 29,
                    "column": 4
                  },
                  "end": {
                    "line": 44,
                    "column": 4
                  }
                },
                "moduleName": "dummy/templates/gallery/bars.hbs"
              },
              isEmpty: false,
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
                ["block","if",[["get","isWaterfall",["loc",[null,[29,14],[29,25]]]]],[],0,null,["loc",[null,[29,4],[44,4]]]]
              ],
              locals: [],
              templates: [child0]
            };
          }());
          return {
            meta: {
              "topLevel": null,
              "revision": "Ember@2.1.0+2be95fad",
              "loc": {
                "source": null,
                "start": {
                  "line": 16,
                  "column": 4
                },
                "end": {
                  "line": 44,
                  "column": 4
                }
              },
              "moduleName": "dummy/templates/gallery/bars.hbs"
            },
            isEmpty: false,
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
              ["block","if",[["get","isStacked",["loc",[null,[16,14],[16,23]]]]],[],0,1,["loc",[null,[16,4],[44,4]]]]
            ],
            locals: [],
            templates: [child0, child1]
          };
        }());
        return {
          meta: {
            "topLevel": null,
            "revision": "Ember@2.1.0+2be95fad",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 45,
                "column": 2
              }
            },
            "moduleName": "dummy/templates/gallery/bars.hbs"
          },
          isEmpty: false,
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
            ["block","if",[["get","isGrouped",["loc",[null,[3,10],[3,19]]]]],[],0,1,["loc",[null,[3,4],[44,11]]]]
          ],
          locals: ["ctx","width","height"],
          templates: [child0, child1]
        };
      }());
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0+2be95fad",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 46,
              "column": 0
            }
          },
          "moduleName": "dummy/templates/gallery/bars.hbs"
        },
        isEmpty: false,
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
          ["block","data-visual",[],[],0,null,["loc",[null,[2,2],[45,18]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0+2be95fad",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 47,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/gallery/bars.hbs"
      },
      isEmpty: false,
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
        ["block","block-page",[],["visual",["subexpr","@mut",[["get","model",["loc",[null,[1,21],[1,26]]]]],[],[]]],0,null,["loc",[null,[1,0],[46,15]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('dummy/templates/gallery/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0+2be95fad",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 6,
              "column": 2
            }
          },
          "moduleName": "dummy/templates/gallery/index.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","col-sm-4");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
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
          ["inline","block-thumb",[],["visual",["subexpr","@mut",[["get","visual",["loc",[null,[4,27],[4,33]]]]],[],[]]],["loc",[null,[4,6],[4,35]]]]
        ],
        locals: ["visual"],
        templates: []
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0+2be95fad",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/gallery/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),1,1);
        return morphs;
      },
      statements: [
        ["block","each",[["get","model",["loc",[null,[2,10],[2,15]]]]],[],0,null,["loc",[null,[2,2],[6,11]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('dummy/templates/gallery/lines', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "topLevel": null,
              "revision": "Ember@2.1.0+2be95fad",
              "loc": {
                "source": null,
                "start": {
                  "line": 3,
                  "column": 4
                },
                "end": {
                  "line": 19,
                  "column": 4
                }
              },
              "moduleName": "dummy/templates/gallery/lines.hbs"
            },
            isEmpty: false,
            arity: 5,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("\n      ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n\n      ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n\n      ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(3);
              morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
              morphs[1] = dom.createMorphAt(fragment,3,3,contextualElement);
              morphs[2] = dom.createMorphAt(fragment,5,5,contextualElement);
              return morphs;
            },
            statements: [
              ["inline","cart-tracker",[],["select",["subexpr","@mut",[["get","ctx.svg.select.chart.tracker",["loc",[null,[7,28],[7,56]]]]],[],[]],"model",["subexpr","@mut",[["get","tracked",["loc",[null,[7,63],[7,70]]]]],[],[]],"xScale",["subexpr","@mut",[["get","xScale",["loc",[null,[8,15],[8,21]]]]],[],[]],"yScale",["subexpr","@mut",[["get","yScale",["loc",[null,[8,29],[8,35]]]]],[],[]],"width",["subexpr","@mut",[["get","width",["loc",[null,[8,42],[8,47]]]]],[],[]],"height",["subexpr","@mut",[["get","height",["loc",[null,[8,55],[8,61]]]]],[],[]]],["loc",[null,[7,6],[9,8]]]],
              ["inline","cart-axis",[],["select",["subexpr","transition",[["get","ctx.svg.select.chart.x-axis",["loc",[null,[11,37],[11,64]]]]],[],["loc",[null,[11,25],[11,65]]]],"scale",["subexpr","@mut",[["get","xScale",["loc",[null,[11,72],[11,78]]]]],[],[]],"orient","bottom","tickSize",["subexpr","negative",[["get","height",["loc",[null,[12,43],[12,49]]]]],[],["loc",[null,[12,33],[12,50]]]],"ticks",8,"tickPadding",6],["loc",[null,[11,6],[13,8]]]],
              ["inline","cart-axis",[],["select",["subexpr","transition",[["get","ctx.svg.select.chart.y-axis",["loc",[null,[15,37],[15,64]]]]],[],["loc",[null,[15,25],[15,65]]]],"scale",["subexpr","@mut",[["get","yScale",["loc",[null,[15,72],[15,78]]]]],[],[]],"orient","left","tickSize",["subexpr","negative",[["get","width",["loc",[null,[16,41],[16,46]]]]],[],["loc",[null,[16,31],[16,47]]]],"tickPadding",6],["loc",[null,[15,6],[17,8]]]]
            ],
            locals: ["selection","xScale","yScale","width","height"],
            templates: []
          };
        }());
        return {
          meta: {
            "topLevel": null,
            "revision": "Ember@2.1.0+2be95fad",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 20,
                "column": 2
              }
            },
            "moduleName": "dummy/templates/gallery/lines.hbs"
          },
          isEmpty: false,
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
            ["block","cart-lines",[],["select",["subexpr","transition",[["get","ctx.svg.select.chart",["loc",[null,[3,37],[3,57]]]]],[],["loc",[null,[3,25],[3,58]]]],"model",["subexpr","@mut",[["get","dimensionalData",["loc",[null,[3,65],[3,80]]]]],[],[]],"width",["subexpr","@mut",[["get","width",["loc",[null,[3,87],[3,92]]]]],[],[]],"height",["subexpr","@mut",[["get","height",["loc",[null,[3,100],[3,106]]]]],[],[]],"margin","10 30 25 65","stroke",["subexpr","color-scale",["category10"],[],["loc",[null,[4,38],[4,64]]]],"onhover",["subexpr","action",["track"],[],["loc",[null,[4,73],[4,89]]]]],0,null,["loc",[null,[3,4],[19,19]]]]
          ],
          locals: ["ctx","width","height"],
          templates: [child0]
        };
      }());
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0+2be95fad",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 21,
              "column": 0
            }
          },
          "moduleName": "dummy/templates/gallery/lines.hbs"
        },
        isEmpty: false,
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
          ["block","data-visual",[],[],0,null,["loc",[null,[2,2],[20,18]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0+2be95fad",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 22,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/gallery/lines.hbs"
      },
      isEmpty: false,
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
        ["block","block-page",[],["visual",["subexpr","@mut",[["get","model",["loc",[null,[1,21],[1,26]]]]],[],[]]],0,null,["loc",[null,[1,0],[21,15]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('dummy/templates/gallery/sunburst', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "topLevel": null,
              "revision": "Ember@2.1.0+2be95fad",
              "loc": {
                "source": null,
                "start": {
                  "line": 3,
                  "column": 4
                },
                "end": {
                  "line": 7,
                  "column": 4
                }
              },
              "moduleName": "dummy/templates/gallery/sunburst.hbs"
            },
            isEmpty: false,
            arity: 5,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes() { return []; },
            statements: [

            ],
            locals: ["selection","x-scale","y-scale","width","height"],
            templates: []
          };
        }());
        return {
          meta: {
            "topLevel": null,
            "revision": "Ember@2.1.0+2be95fad",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 8,
                "column": 2
              }
            },
            "moduleName": "dummy/templates/gallery/sunburst.hbs"
          },
          isEmpty: false,
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
            ["block","polar-sunburst",[],["select",["subexpr","@mut",[["get","ctx.svg.select.chart",["loc",[null,[3,29],[3,49]]]]],[],[]],"model",["subexpr","@mut",[["get","dimensionalData",["loc",[null,[3,56],[3,71]]]]],[],[]],"width",["subexpr","@mut",[["get","width",["loc",[null,[3,78],[3,83]]]]],[],[]],"height",["subexpr","@mut",[["get","height",["loc",[null,[3,91],[3,97]]]]],[],[]],"margin","10","stroke",["subexpr","color-scale",["category10"],[],["loc",[null,[4,29],[4,55]]]]],0,null,["loc",[null,[3,4],[7,23]]]]
          ],
          locals: ["ctx","width","height"],
          templates: [child0]
        };
      }());
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0+2be95fad",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 9,
              "column": 0
            }
          },
          "moduleName": "dummy/templates/gallery/sunburst.hbs"
        },
        isEmpty: false,
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
          ["block","data-visual",[],[],0,null,["loc",[null,[2,2],[8,18]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0+2be95fad",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/gallery/sunburst.hbs"
      },
      isEmpty: false,
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
        ["block","block-page",[],["visual",["subexpr","@mut",[["get","model",["loc",[null,[1,21],[1,26]]]]],[],[]]],0,null,["loc",[null,[1,0],[9,15]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('dummy/templates/guides', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0+2be95fad",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/guides.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row col-md-9");
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
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
        return morphs;
      },
      statements: [
        ["inline","markdown-document",[],["content",["subexpr","@mut",[["get","model",["loc",[null,[2,30],[2,35]]]]],[],[]]],["loc",[null,[2,2],[2,37]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('dummy/templates/home', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0+2be95fad",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 2
            },
            "end": {
              "line": 7,
              "column": 2
            }
          },
          "moduleName": "dummy/templates/home.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","btn btn-default");
          var el2 = dom.createTextNode("Guides");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
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
          "topLevel": null,
          "revision": "Ember@2.1.0+2be95fad",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 2
            },
            "end": {
              "line": 10,
              "column": 2
            }
          },
          "moduleName": "dummy/templates/home.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","btn btn-default");
          var el2 = dom.createTextNode("Gallery");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
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
    return {
      meta: {
        "topLevel": false,
        "revision": "Ember@2.1.0+2be95fad",
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
        "moduleName": "dummy/templates/home.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Create Ambitious");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Data Visuals");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","links");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [4]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(element0,1,1);
        morphs[1] = dom.createMorphAt(element0,2,2);
        return morphs;
      },
      statements: [
        ["block","link-to",["guides"],[],0,null,["loc",[null,[5,2],[7,14]]]],
        ["block","link-to",["gallery"],[],1,null,["loc",[null,[8,2],[10,14]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('dummy/tests/acceptance/gallery/bars-test', ['ember', 'qunit', 'dummy/tests/helpers/start-app', 'ember-cli-d3/utils/version'], function (Ember, qunit, startApp, version) {

  'use strict';

  qunit.module('Acceptance | gallery/bars', {
    beforeEach: function beforeEach() {
      this.application = startApp['default']();
    },

    afterEach: function afterEach() {
      Ember['default'].run(this.application, 'destroy');
    }
  });

  if (version['default'].hasGlimmer) {
    qunit.test('visiting /gallery/bars', function (assert) {
      visit('/gallery/bars');

      andThen(function () {
        var bars = Ember['default'].$('#ember-testing .visual-content .bar .shape').toArray().map(function (bar) {
          return bar.__transition__;
        });

        assert.equal(currentURL(), '/gallery/bars');
        assert.equal(bars.length, 8, '8 bars rendered');

        bars.forEach(function (checkThis) {
          assert.ok(!checkThis, 'Found bar still transitioning');
        });
      });
    });
  }

});
define('dummy/tests/acceptance/gallery/bars-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - acceptance/gallery');
  QUnit.test('acceptance/gallery/bars-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'acceptance/gallery/bars-test.js should pass jshint.'); 
  });

});
define('dummy/tests/acceptance/gallery-test', ['ember', 'd3', 'qunit', 'dummy/models/visual', 'dummy/tests/helpers/start-app', 'ember-cli-d3/utils/version'], function (Ember, d3, qunit, VisualModel, startApp, version) {

  'use strict';

  qunit.module('Acceptance | gallery', {
    beforeEach: function beforeEach() {
      this.application = startApp['default']();
    },

    afterEach: function afterEach() {
      Ember['default'].run(this.application, 'destroy');
    }
  });

  if (version['default'].hasGlimmer) {
    qunit.test('visiting /gallery', function (assert) {
      visit('/gallery');

      andThen(function () {
        assert.equal(currentURL(), '/gallery');
      });

      VisualModel['default'].FIXTURES.forEach(function (_ref) {
        var id = _ref.id;

        var pathname = '/' + id.replace(/\./g, '/');

        visit(pathname);

        andThen(function () {
          assert.equal(currentURL(), pathname, 'Successfully rendered ' + id + ' without errors');
          assert.ok(d3['default'].selectAll('#ember-testing .shape').length, 'Shapes are rendered');
        });
      });
    });
  }

});
define('dummy/tests/acceptance/gallery-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - acceptance');
  QUnit.test('acceptance/gallery-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'acceptance/gallery-test.js should pass jshint.'); 
  });

});
define('dummy/tests/adapters/application.jshint', function () {

  'use strict';

  QUnit.module('JSHint - adapters');
  QUnit.test('adapters/application.js should pass jshint', function(assert) { 
    assert.ok(true, 'adapters/application.js should pass jshint.'); 
  });

});
define('dummy/tests/app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('app.js should pass jshint', function(assert) { 
    assert.ok(true, 'app.js should pass jshint.'); 
  });

});
define('dummy/tests/components/block-page.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/block-page.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/block-page.js should pass jshint.'); 
  });

});
define('dummy/tests/components/block-thumb.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/block-thumb.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/block-thumb.js should pass jshint.'); 
  });

});
define('dummy/tests/components/cart-axis.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/cart-axis.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/cart-axis.js should pass jshint.'); 
  });

});
define('dummy/tests/components/cart-grouped-bars.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/cart-grouped-bars.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/cart-grouped-bars.js should pass jshint.'); 
  });

});
define('dummy/tests/components/cart-lines.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/cart-lines.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/cart-lines.js should pass jshint.'); 
  });

});
define('dummy/tests/components/cart-marker.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/cart-marker.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/cart-marker.js should pass jshint.'); 
  });

});
define('dummy/tests/components/cart-stacked-bars.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/cart-stacked-bars.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/cart-stacked-bars.js should pass jshint.'); 
  });

});
define('dummy/tests/components/cart-tracker.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/cart-tracker.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/cart-tracker.js should pass jshint.'); 
  });

});
define('dummy/tests/components/cart-waterfall-bars.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/cart-waterfall-bars.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/cart-waterfall-bars.js should pass jshint.'); 
  });

});
define('dummy/tests/components/geo-albers-usa.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/geo-albers-usa.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/geo-albers-usa.js should pass jshint.'); 
  });

});
define('dummy/tests/components/markdown-document.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/markdown-document.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/markdown-document.js should pass jshint.'); 
  });

});
define('dummy/tests/components/polar-sunburst.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/polar-sunburst.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/polar-sunburst.js should pass jshint.'); 
  });

});
define('dummy/tests/controllers/gallery/albers-usa.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/gallery');
  QUnit.test('controllers/gallery/albers-usa.js should pass jshint', function(assert) { 
    assert.ok(true, 'controllers/gallery/albers-usa.js should pass jshint.'); 
  });

});
define('dummy/tests/controllers/gallery/bars.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/gallery');
  QUnit.test('controllers/gallery/bars.js should pass jshint', function(assert) { 
    assert.ok(true, 'controllers/gallery/bars.js should pass jshint.'); 
  });

});
define('dummy/tests/controllers/gallery/lines.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/gallery');
  QUnit.test('controllers/gallery/lines.js should pass jshint', function(assert) { 
    assert.ok(true, 'controllers/gallery/lines.js should pass jshint.'); 
  });

});
define('dummy/tests/controllers/gallery/sunburst.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/gallery');
  QUnit.test('controllers/gallery/sunburst.js should pass jshint', function(assert) { 
    assert.ok(true, 'controllers/gallery/sunburst.js should pass jshint.'); 
  });

});
define('dummy/tests/helpers/data-generator', ['exports', 'd3'], function (exports, d3) {

  'use strict';

  exports.randomInt = randomInt;
  exports.dimensional = dimensional;

  var states = ['California', 'Texas', 'New York', 'Florida', 'Illinois', 'Pennsylvania', 'Ohio', 'New Jersey', 'North Carolina', 'Georgia', 'Virginia', 'Massachusetts', 'Michigan', 'Washington', 'Maryland', 'Indiana', 'Minnesota', 'Colorado', 'Tennessee', 'Wisconsin', 'Arizona', 'Missouri', 'Connecticut', 'Louisiana', 'Oregon', 'Alabama', 'Oklahoma', 'South Carolina', 'Kentucky', 'Iowa', 'Kansas', 'Utah', 'Nevada', 'Arkansas', 'Nebraska', 'Mississippi', 'District of Columbia', 'New Mexico', 'Hawaii', 'West Virginia', 'New Hampshire', 'Idaho', 'Delaware', 'North Dakota', 'Alaska', 'Maine', 'South Dakota', 'Wyoming', 'Rhode Island', 'Montana', 'Vermont'];

  function randomInt() {
    return Math.floor(Date.now() * Math.random());
  }

  function dimensional(series) {
    var count = arguments.length <= 1 || arguments[1] === undefined ? 8 : arguments[1];
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var generator = d3['default'].random.normal(options.mean || 2000, options.stddev || 2000);

    return d3['default'].range(count).map(function (id) {
      var base = { id: id, state: states[id], timestamp: new Date(id * 3.15569e10 * 2) };

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
define('dummy/tests/helpers/graph', ['exports', 'ember', 'd3'], function (exports, Ember, d3) {

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

  var make = {
    svg: function svg() {
      var tagName = arguments.length <= 0 || arguments[0] === undefined ? 'svg' : arguments[0];

      return document.createElementNS(d3['default'].ns.prefix.svg, tagName);
    }
  };function graph(context, _assert) {
    var container = document.getElementById('ember-testing');
    var promise;

    return {
      render: function render(template) {
        context.render(template);

        return this;
      },
      update: function update(name, value) {
        context.set(name, value);

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

          _assert.push(false, 'Not Found', 'Found', 'No transition found on ' + elementToString(item) + ' from selector `' + selector + '`');
        }

        _assert.ok(allPass, 'All elements in `' + selector + '` are transitioning');

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
          // XXX This uses private API
          var index = context.container.lookup("-view-registry:main") || Ember['default'].View.views;
          var component = index[id];
          var selection = component && (component.get('select._selection') || component.get('select.selection'));

          _assert.ok(!!component, 'Found the component #' + id);
          _assert.ok(!!selection, 'Found the component selection #' + id);

          callback(selection, component);
        });

        return this;
      },

      then: function then(resolve, reject) {
        return Ember['default'].RSVP.resolve(promise).then(resolve, reject);
      }
    };
  }

  exports.make = make;

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
define('dummy/tests/integration/components/cart-grouped-bars-test', ['d3', 'dummy/tests/helpers/data-generator', 'ember-qunit', 'dummy/utils/model/dimensional', 'dummy/tests/helpers/graph'], function (d3, data_generator, ember_qunit, DimensiontalModel, graph) {

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
              'topLevel': null,
              'revision': 'Ember@2.1.0+2be95fad',
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
            isEmpty: false,
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
            statements: [['inline', 'cart-axis', [], ['select', ['subexpr', 'transition', [['get', 'ctx.svg.select.chart.x-axis', ['loc', [null, [7, 41], [7, 68]]]]], [], ['loc', [null, [7, 29], [7, 69]]]], 'scale', ['subexpr', '@mut', [['get', 'x-scale', ['loc', [null, [7, 76], [7, 83]]]]], [], []], 'orient', 'bottom', 'tickSize', ['subexpr', 'negative', [['get', 'height', ['loc', [null, [8, 47], [8, 53]]]]], [], ['loc', [null, [8, 37], [8, 54]]]]], ['loc', [null, [7, 10], [9, 12]]]], ['inline', 'cart-axis', [], ['select', ['subexpr', 'transition', [['get', 'ctx.svg.select.chart.y-axis', ['loc', [null, [10, 41], [10, 68]]]]], [], ['loc', [null, [10, 29], [10, 69]]]], 'scale', ['subexpr', '@mut', [['get', 'y-scale', ['loc', [null, [10, 76], [10, 83]]]]], [], []], 'orient', 'right', 'tickSize', ['subexpr', 'negative', [['get', 'width', ['loc', [null, [11, 46], [11, 51]]]]], [], ['loc', [null, [11, 36], [11, 52]]]], 'transform', ['subexpr', 'translate', [['get', 'width', ['loc', [null, [12, 33], [12, 38]]]]], [], ['loc', [null, [12, 22], [12, 39]]]]], ['loc', [null, [10, 10], [13, 12]]]]],
            locals: ['selection', 'x-scale', 'y-scale', 'width', 'height'],
            templates: []
          };
        })();

        return {
          meta: {
            'topLevel': null,
            'revision': 'Ember@2.1.0+2be95fad',
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
          isEmpty: false,
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
          statements: [['block', 'cart-grouped-bars', [], ['id', 'bars', 'select', ['subexpr', 'transition', [['get', 'ctx.svg.select.chart', ['loc', [null, [3, 58], [3, 78]]]]], [], ['loc', [null, [3, 46], [3, 79]]]], 'model', ['subexpr', '@mut', [['get', 'model', ['loc', [null, [3, 86], [3, 91]]]]], [], []], 'width', ['subexpr', '@mut', [['get', 'width', ['loc', [null, [3, 98], [3, 103]]]]], [], []], 'height', ['subexpr', '@mut', [['get', 'height', ['loc', [null, [3, 111], [3, 117]]]]], [], []], 'margin', '10 60 20 10', 'stroke', ['subexpr', 'color-scale', ['category10'], [], ['loc', [null, [4, 42], [4, 68]]]]], 0, null, ['loc', [null, [3, 8], [15, 30]]]]],
          locals: ['ctx', 'width', 'height'],
          templates: [child0]
        };
      })();

      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0+2be95fad',
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
        isEmpty: false,
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

        assert.deepEqual(d3['default'].select(this).selectAll('.bar').data(), data, metricPath + ' data not bound');
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
define('dummy/tests/mixins/gallery-route-mixin.jshint', function () {

  'use strict';

  QUnit.module('JSHint - mixins');
  QUnit.test('mixins/gallery-route-mixin.js should pass jshint', function(assert) { 
    assert.ok(true, 'mixins/gallery-route-mixin.js should pass jshint.'); 
  });

});
define('dummy/tests/mixins/route-class.jshint', function () {

  'use strict';

  QUnit.module('JSHint - mixins');
  QUnit.test('mixins/route-class.js should pass jshint', function(assert) { 
    assert.ok(true, 'mixins/route-class.js should pass jshint.'); 
  });

});
define('dummy/tests/models/visual.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/visual.js should pass jshint', function(assert) { 
    assert.ok(true, 'models/visual.js should pass jshint.'); 
  });

});
define('dummy/tests/router.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('router.js should pass jshint', function(assert) { 
    assert.ok(true, 'router.js should pass jshint.'); 
  });

});
define('dummy/tests/routes/gallery/albers-usa.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/gallery');
  QUnit.test('routes/gallery/albers-usa.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/gallery/albers-usa.js should pass jshint.'); 
  });

});
define('dummy/tests/routes/gallery/bars/grouped.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/gallery/bars');
  QUnit.test('routes/gallery/bars/grouped.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/gallery/bars/grouped.js should pass jshint.'); 
  });

});
define('dummy/tests/routes/gallery/bars/index.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/gallery/bars');
  QUnit.test('routes/gallery/bars/index.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/gallery/bars/index.js should pass jshint.'); 
  });

});
define('dummy/tests/routes/gallery/bars/stacked.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/gallery/bars');
  QUnit.test('routes/gallery/bars/stacked.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/gallery/bars/stacked.js should pass jshint.'); 
  });

});
define('dummy/tests/routes/gallery/bars/waterfall.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/gallery/bars');
  QUnit.test('routes/gallery/bars/waterfall.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/gallery/bars/waterfall.js should pass jshint.'); 
  });

});
define('dummy/tests/routes/gallery/lines/index.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/gallery/lines');
  QUnit.test('routes/gallery/lines/index.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/gallery/lines/index.js should pass jshint.'); 
  });

});
define('dummy/tests/routes/gallery/sunburst.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/gallery');
  QUnit.test('routes/gallery/sunburst.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/gallery/sunburst.js should pass jshint.'); 
  });

});
define('dummy/tests/routes/gallery.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/gallery.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/gallery.js should pass jshint.'); 
  });

});
define('dummy/tests/routes/guides.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/guides.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/guides.js should pass jshint.'); 
  });

});
define('dummy/tests/routes/home.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/home.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/home.js should pass jshint.'); 
  });

});
define('dummy/tests/services/dimensional-data-source.jshint', function () {

  'use strict';

  QUnit.module('JSHint - services');
  QUnit.test('services/dimensional-data-source.js should pass jshint', function(assert) { 
    assert.ok(true, 'services/dimensional-data-source.js should pass jshint.'); 
  });

});
define('dummy/tests/services/geospatial-data-source.jshint', function () {

  'use strict';

  QUnit.module('JSHint - services');
  QUnit.test('services/geospatial-data-source.js should pass jshint', function(assert) { 
    assert.ok(true, 'services/geospatial-data-source.js should pass jshint.'); 
  });

});
define('dummy/tests/test-helper', ['dummy/tests/helpers/resolver', 'ember-qunit', 'ember-cli-d3/utils/version'], function (resolver, ember_qunit, version) {

  'use strict';

  if (!version.hasGlimmer) {
    /* global require */
    require('dummy/initializers/ember-cli-auto-register-helpers').initialize();
  }

  ember_qunit.setResolver(resolver['default']);

});
define('dummy/tests/test-helper.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('test-helper.js should pass jshint', function(assert) { 
    assert.ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('dummy/tests/transforms/array.jshint', function () {

  'use strict';

  QUnit.module('JSHint - transforms');
  QUnit.test('transforms/array.js should pass jshint', function(assert) { 
    assert.ok(true, 'transforms/array.js should pass jshint.'); 
  });

});
define('dummy/tests/unit/helpers/color-scale-test', ['dummy/helpers/color-scale', 'qunit', 'd3'], function (color_scale, qunit, d3) {

  'use strict';

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  qunit.module('Unit | Helper | color scale');

  qunit.test('Scales preset on d3.scale.* can be accessed as alias', function (assert) {
    var checks = [[color_scale.colorScale(['category10']).range(), d3['default'].scale.category10().range()], [color_scale.colorScale(['category20']).range(), d3['default'].scale.category20().range()], [color_scale.colorScale(['category20b']).range(), d3['default'].scale.category20b().range()], [color_scale.colorScale(['category20c']).range(), d3['default'].scale.category20c().range()]];

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
define('dummy/tests/unit/helpers/transition-test', ['ember-cli-d3/system/selection-proxy', 'dummy/helpers/transition', 'qunit'], function (SelectionProxy, transition, qunit) {

  'use strict';

  qunit.module('Unit | Helper | transition');

  qunit.test('empty selection should not throw', function (assert) {
    assert.expect(0);

    transition.transition([], {});
  });

  qunit.test('apply d3 transition options when set', function (assert) {
    var svg = SelectionProxy['default'].create({ element: document.createElement('div') });
    var delay = Math.floor(Math.random() * 1000);
    var duration = Math.floor(Math.random() * 1000);
    var sel = transition.transition([svg.get('select.chart')], { delay: delay, duration: duration }).get('selection');

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
define('dummy/tests/unit/mixins/d3-support-test', ['ember', 'ember-cli-d3/mixins/d3-support', 'ember-cli-d3/system/selection-proxy', 'qunit', 'ember-cli-d3/utils/version', 'dummy/tests/helpers/graph', 'd3'], function (Ember, GraphicSupportMixin, SelectionProxy, qunit, version, graph, d3) {

  'use strict';

  qunit.module('Unit | Mixin | d3 support');

  if (!version.hasGlimmer) {
    qunit.test('Drive calls with binding if no glimmer', function (assert) {
      var count = 0;
      var svg = SelectionProxy['default'].create({ element: document.createElement('div') });
      var GraphicSupportObject = Ember['default'].Object.extend(GraphicSupportMixin['default'], {
        select: svg.get('select.chart'),
        target: 'abc',
        boundBinding: 'target',
        call: function call() {
          count++;
        }
      });
      var subject = GraphicSupportObject.create();

      assert.equal(subject.get('target'), 'abc');
      assert.equal(subject.get('bound'), 'abc');

      Ember['default'].run.begin();
      subject.set('target', 'efg');
      subject.set('target', '123');
      Ember['default'].run.end();

      assert.equal(subject.get('target'), '123');
      assert.equal(subject.get('bound'), '123');

      assert.equal(count, 1);
    });
  }

});
define('dummy/tests/unit/mixins/d3-support-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/mixins');
  QUnit.test('unit/mixins/d3-support-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/mixins/d3-support-test.js should pass jshint.'); 
  });

});
define('dummy/tests/unit/mixins/margin-convention-test', ['ember', 'ember-cli-d3/mixins/d3-support', 'qunit'], function (Ember, MarginConventionMixin, qunit) {

  'use strict';

  qunit.module('Unit | Mixin | margin convention');

  qunit.test('Calculate content size based on set size and margin', function (assert) {
    var MarginConventionObject = Ember['default'].Object.extend(MarginConventionMixin['default'], {});
    var subject = MarginConventionObject.create({
      margin: '10 20 30 40',
      width: 400,
      height: 300
    });

    assert.equal(subject.get('contentWidth', 240));
    assert.equal(subject.get('contentHeight', 260));
  });

});
define('dummy/tests/unit/mixins/margin-convention-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/mixins');
  QUnit.test('unit/mixins/margin-convention-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/mixins/margin-convention-test.js should pass jshint.'); 
  });

});
define('dummy/tests/unit/utils/css-test', ['qunit', 'ember-cli-d3/utils/css'], function (qunit, css) {

  'use strict';

  qunit.module('Unit | Utility | css');

  qunit.test('css#box', function (assert) {
    var checks = {
      '60': { top: 60, right: 60, bottom: 60, left: 60 },
      '20 30': { top: 20, right: 30, bottom: 20, left: 30 },
      '20 30 40': { top: 20, right: 30, bottom: 40, left: 30 },
      '20 30 40 50': { top: 20, right: 30, bottom: 40, left: 50 }
    };
    var expr, expected, actual;

    for (expr in checks) {
      expected = checks[expr];
      actual = css.box(expr);

      assert.deepEqual(actual, expected, 'Behave same as CSS box model');
    }
  });

});
define('dummy/tests/unit/utils/css-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/utils');
  QUnit.test('unit/utils/css-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/utils/css-test.js should pass jshint.'); 
  });

});
define('dummy/tests/unit/utils/d3-test', ['qunit', 'ember-cli-d3/utils/d3', 'd3'], function (qunit, d3, _d3) {

  'use strict';

  qunit.module('Unit | Utility | d3');

  qunit.test('d3#guid', function (assert) {
    var guids = _d3['default'].range(10).map(d3.guid).map(function (guid) {
      return guid.substring(13);
    }).map(Number);

    var checker = _d3['default'].range(guids[0], guids[guids.length - 1] + 1, 1);

    assert.deepEqual(guids, checker, 'Guids are uniq and in sequence');
  });

  qunit.test('d3#accessor', function (assert) {
    var checker = Math.random();
    var nested = {
      shallow: checker,
      path1: {
        path2: {
          path3: {
            prop: checker
          }
        }
      }
    };

    assert.equal(d3.accessor('shallow')(nested), checker, 'Accessor can access shallow property');
    assert.equal(d3.accessor('path1.path2.path3.prop')(nested), checker, 'Accessor can access deep property');
  });

  qunit.test('d3#assign', function (assert) {
    var assignable = _d3['default'].svg.axis();
    var properties = {
      orient: 'right',
      innerTickSize: 10,
      outerTickSize: 20
    };

    d3.assign(assignable, properties);

    assert.equal(assignable.orient(), properties.orient, '`orient` assigned');
    assert.equal(assignable.innerTickSize(), properties.innerTickSize, '`innerTickSize` assigned');
    assert.equal(assignable.outerTickSize(), properties.outerTickSize, '`outerTickSize` assigned');
  });

  qunit.test('d3#translateX', function (assert) {
    assert.equal(d3.translateX(_d3['default'].functor(10))(), 'translate(10 0)', '`translateX` accepts functions');
    assert.equal(d3.translateX(10)(), 'translate(10 0)', '`translateX` accepts number also');
  });

  qunit.test('d3#rotate', function (assert) {
    assert.equal(d3.rotate(_d3['default'].functor(10))(), 'rotate(10)', '`rotate` accepts functions');
    assert.equal(d3.rotate(10)(), 'rotate(10)', '`rotate` accepts number also');
  });

  qunit.test('d3#join.parseDataExpr', function (assert) {
    var _join$parseDataExpr = d3.join.parseDataExpr('path.to.data[path.to.key]');

    var dataPath = _join$parseDataExpr.dataPath;
    var keyPath = _join$parseDataExpr.keyPath;

    var _join$parseDataExpr2 = d3.join.parseDataExpr([1, 2, 3]);

    var inlineData = _join$parseDataExpr2.inlineData;

    assert.equal(dataPath, 'path.to.data', 'Parsed data path');
    assert.equal(keyPath, 'path.to.key', 'Parsed key path');
    assert.deepEqual(inlineData, [1, 2, 3], 'Allow inline data');
  });

  qunit.test('d3#join.parseCssExpr', function (assert) {
    var _join$parseCssExpr = d3.join.parseCssExpr('rect.bar');

    var rectTag = _join$parseCssExpr.tagName;
    var barCls = _join$parseCssExpr.cssName;

    var _join$parseCssExpr2 = d3.join.parseCssExpr('.group');

    var gTag = _join$parseCssExpr2.tagName;
    var groupCls = _join$parseCssExpr2.cssName;

    assert.equal(rectTag, 'rect', 'Parsed tagName');
    assert.equal(barCls, 'bar', 'Parsed class name');

    assert.equal(gTag, 'g', 'default tag is <g>');
    assert.equal(groupCls, 'group', 'Parsed class name');
  });

  qunit.test('d3#join', function (assert) {
    var data = [0, 1];
    var chart = d3.join(data, '.group', {
      update: function update(selection) {
        selection.attr('transform', d3.translateX(function (index) {
          return index * 10;
        }));
      }
    });
    var svg = document.createElementNS(_d3['default'].ns.prefix.svg, 'svg');
    var update = chart(_d3['default'].select(svg));
    var children = svg.childNodes;

    assert.equal(typeof update.enter, 'function', '`join` returns update selection with enter');
    assert.equal(typeof update.exit, 'function', '`join` returns update selection with exit');

    assert.equal(data.length, children.length, '`join` update selection with same number of children');

    assert.equal(typeof chart.enter, 'function', '`join` exposes enter on itself');
    assert.equal(typeof chart.update, 'function', '`join` exposes update on itself');
    assert.equal(typeof chart.exit, 'function', '`join` exposes exit on itself');
  });

});
define('dummy/tests/unit/utils/d3-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/utils');
  QUnit.test('unit/utils/d3-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/utils/d3-test.js should pass jshint.'); 
  });

});
define('dummy/tests/unit/utils/lodash-test', ['qunit', 'ember-cli-d3/utils/lodash'], function (qunit, lodash) {

  'use strict';

  qunit.module('Unit | Utility | lodash');

  qunit.test('lodash#identity', function (assert) {
    var idFns = [0, 1, 2, 3].map(lodash.identity);
    var checker = Math.random();

    assert.equal(idFns[0](checker), checker, 'Identity at index 0');
    assert.equal(idFns[1](null, checker), checker, 'Identity at index 1');
    assert.equal(idFns[2](null, null, checker), checker, 'Identity at index 2');
    assert.equal(idFns[3](null, null, null, checker), checker, 'Identity at index 3');
  });

  qunit.test('lodash#flow', function (assert) {
    var checker = Math.random();

    lodash.flow(function (hi) {
      return 'Hello' + checker;
    }, function (hi) {
      return hi + 'World!';
    }, function (arg) {
      assert.equal(arg, 'Hello' + checker + 'World!');
    })(checker);
  });

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
define('dummy/tests/utils/model/dimensional.jshint', function () {

  'use strict';

  QUnit.module('JSHint - utils/model');
  QUnit.test('utils/model/dimensional.js should pass jshint', function(assert) { 
    assert.ok(true, 'utils/model/dimensional.js should pass jshint.'); 
  });

});
define('dummy/transforms/array', ['exports', 'ember', 'ember-data'], function (exports, Ember, DS) {

  'use strict';

  exports['default'] = DS['default'].Transform.extend({
    deserialize: function deserialize(serialized) {
      return Ember['default'].typeOf(serialized) === 'array' ? serialized : [];
    },

    serialize: function serialize(deserialized) {
      switch (Ember['default'].typeOf(deserialized)) {
        case 'array':
          return deserialized;
        case 'string':
          return deserialized.split(',').map(function (item) {
            return item.trim();
          });
        default:
          return [];
      }
    }
  });

});
define('dummy/utils/model/dimensional', ['exports', 'ember', 'ember-cli-d3/utils/version'], function (exports, Ember, version) {

  'use strict';


  exports['default'] = Ember['default'].Object.extend({
    key: null,
    data: null,
    // series contains metadata like format and labeling
    series: version.computed({
      set: function set(name, newValue) {
        return newValue.map(function (series) {
          Ember['default'].assert(name + ' must be a collection of strings or object { metricPath, labelPath, format }', function () {
            return ~['string', 'object'].indexOf(typeof series);
          });

          if (typeof series === 'object') {
            return series;
          }

          return { metricPath: series, labelPath: series, format: series };
        });
      }
    }),

    min: version.computed('extent', {
      get: function get() {
        return this.get('extent.0');
      }
    }).readOnly(),
    max: version.computed('extent', {
      get: function get() {
        return this.get('extent.1');
      }
    }).readOnly(),
    extent: version.computed('data', 'series', {
      get: function get() {
        var data = this.get('data');
        var series = this.get('series');
        var extent = [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY];
        var dataIndex;
        var dataLen = data.length;
        var seriesIndex;
        var seriesLen = series.length;

        for (dataIndex = 0; dataIndex < dataLen; dataIndex++) {
          for (seriesIndex = 0; seriesIndex < seriesLen; seriesIndex++) {
            extent[0] = Math.min(extent[0], data[dataIndex][series[seriesIndex].metricPath]);
            extent[1] = Math.max(extent[1], data[dataIndex][series[seriesIndex].metricPath]);
          }
        }

        return extent;
      }
    }).readOnly()

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
  require("dummy/app")["default"].create({"name":"ember-cli-d3","version":"1.0.0+baf5e4a8"});
}

/* jshint ignore:end */
//# sourceMappingURL=dummy.map