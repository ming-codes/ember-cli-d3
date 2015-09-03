
import Ember from 'ember';

function elementToString(el) {
  var base = el.tagName;
  var cls = el.classList;

  if (cls.length) {
    cls = Array.prototype.slice.call(cls).join(' ');
    base += ` class="${cls}"`;
  }

  return `<${base}>`;
}

function indexComponents(views, hash = {}) {
  var count = views.length;
  var view;

  while (view = views[--count]) {
    hash[view.elementId] = view;

    indexComponents(view.get('childViews'), hash);
  }

  return hash;
}

export default function graph(context, assert) {
  var container = document.getElementById('ember-testing');
  var viewIndex;
  var promise;

  return {
    render(template) {
      context.render(template);

      return this.update();
    },
    update(name, value) {
      // XXX This uses private API
      var registry = context.container.lookup("-view-registry:main");

      if (name) {
        context.set(name, value);
      }

      viewIndex = indexComponents(Object.keys(registry).map(key => {
        return registry[key];
      }));

      return this;
    },
    transitioning(selector, name, timeout = 5000) {
      var list = container.querySelectorAll(selector);
      var transition = [];
      var allPass = true;
      var now = Date.now();
      var index, len, item, key, found;

      outerloop:
      for (index = 0, len = list.length; index < len; index++) {
        item = list[index];

        for (key in item) {
          // First condition is fast check and covers 99% of the case;
          // Second condition is real check;
          if (key[1] === '_' && !key.indexOf('__transition')) {
            if (!name || key === `__transition_${name}`) {
              transition.push(key, item);
            }

            continue outerloop;
          }
        }

        allPass = false;

        assert.ok(false, `No transition found on ${elementToString(item)} from selector \`${selector}\``);
      }

      assert.ok(allPass, `All elements in \`${selector}\` are transitioning`);

      promise = Ember.RSVP.resolve(promise).then(() => {
        return new Ember.RSVP.Promise((resolve, reject) => {
          var rate = 17 * 4;

          setTimeout(function schedule() {
            var count = transition.length / 2;
            var elapsed = Date.now() - now;
            var done = true;
            var key, node;

            if (elapsed >= timeout) {
              reject(`Transition from selector \`${selector}\` timed out`);
            }

            while (count) {
              node = transition[count * 2 - 1];
              key = transition[count * 2];

              done = done && !node[key];

              count--;
            }

            if (done) {
              resolve();
            }
            else {
              setTimeout(schedule, rate);
            }

          }, rate);
        });
      });

      return this;
    },
    assert(id, callback) {
      promise = Ember.RSVP.resolve(promise).then(() => {
        var component = viewIndex[id];
        var selection = component && (component.get('select._selection') || component.get('select.selection'));

        callback(selection, component);
      });

      return this;
    },

    then(resolve, reject) {
      return Ember.RSVP.resolve(promise).then(resolve, reject);
    }
  };
}
