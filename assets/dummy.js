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
define('dummy/components/bing-map', ['exports', 'ember', 'dummy/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: ['bing-map'],
    lat: 30.1,
    lng: -81.4,
    zoom: 10,
    mapTypeId: 'r', // r:road, a:aerial
    markers: [{
      lat: null, // add markers locations
      lng: null // to add another marker, simply create a new object inside
    }],

    polygonLocation: {
      location1: {
        lat: 30.1,
        lng: -81.6
      },
      location2: {
        lat: 30.1,
        lng: -81.4
      },
      location3: {
        lat: 30,
        lng: -81.4
      },
      location4: {
        lat: 30,
        lng: -81.6
      } },

    init: function init() {
      this._super();
      if (!config['default'].bingAPI) {
        throw 'Missing BING API KEY';
      }
      this.api = Microsoft.Maps;
      this.map = null;
    },

    didInsertElement: function didInsertElement() {
      this.createMap();
    },

    willDestroyElement: function willDestroyElement() {
      this.removeMap();
    },

    center: Ember['default'].computed('lat', 'lng', function () {
      var latitude = this.get('lat');
      var longitude = this.api.Location.normalizeLongitude(this.get('lng'));
      return new this.api.Location(latitude, longitude);
    }),

    mapOptions: Ember['default'].computed('center', 'zoom', 'mapTypeId', function () {
      var opts = this.getProperties('center', 'zoom', 'mapTypeId');
      opts.credentials = config['default'].bingAPI;
      return opts;
    }),

    createMap: function createMap() {
      var _this = this;

      var el = this.$()[0];
      var opts = this.get('mapOptions');

      var getMarker = this.get('getMarker');
      this.map = new Microsoft.Maps.Map(el, opts);

      getMarker.forEach(function (location) {
        var marker = new Microsoft.Maps.Pushpin(location);
        _this.map.entities.push(marker); //add marker to map
        _this.map.entities.push(_this.get('createPolygon'));
      });
    },

    removeMap: function removeMap() {
      this.map.dispose();
    },

    getMarker: Ember['default'].computed(function () {
      var location = [];
      var lat = this.lat;
      var lng = this.lng;
      location.push(new Microsoft.Maps.Location(lat, lng));

      return location;
    }),

    createPolygon: Ember['default'].computed(function () {
      var polygonLocation = this.get('polygonLocation');

      var location1 = new Microsoft.Maps.Location(polygonLocation.location1.lat, polygonLocation.location1.lng);
      var location2 = new Microsoft.Maps.Location(polygonLocation.location2.lat, polygonLocation.location2.lng);
      var location3 = new Microsoft.Maps.Location(polygonLocation.location3.lat, polygonLocation.location3.lng);
      var location4 = new Microsoft.Maps.Location(polygonLocation.location4.lat, polygonLocation.location4.lng);

      var vertices = new Array(location1, location2, location3, location4, location1);
      var polygoncolor = new Microsoft.Maps.Color(100, 100, 0, 100);
      var polygon = new Microsoft.Maps.Polygon(vertices, { fillColor: polygoncolor, strokeColor: polygoncolor });
      console.log(polygonLocation, polygonLocation.location1.lat, polygonLocation.location1.lng);
      return polygon;
    })

  });
  // marker array

});
define('dummy/initializers/app-version', ['exports', 'dummy/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(container, application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('dummy/initializers/export-application-global', ['exports', 'ember', 'dummy/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  }

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('dummy/router', ['exports', 'ember', 'dummy/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  exports['default'] = Router.map(function () {});

});
define('dummy/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"style","position: relative; width: 700px; height: 700px");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [0]),1,1);
        var morph1 = dom.createMorphAt(fragment,2,2,contextualElement);
        content(env, morph0, context, "bing-map");
        content(env, morph1, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('dummy/templates/components/bing-map', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("bing-map.hbs");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('dummy/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
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

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
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

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('dummy/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('dummy/tests/test-helper', ['dummy/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('dummy/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('dummy/tests/unit/components/bing-map-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('bing-map', {});

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // Renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
  });

  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('dummy/tests/unit/components/bing-map-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/bing-map-test.js should pass jshint', function() { 
    ok(true, 'unit/components/bing-map-test.js should pass jshint.'); 
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
  require("dummy/app")["default"].create({"name":"ember-cli-bing-map","version":"0.0.7.982a41d6"});
}

/* jshint ignore:end */
//# sourceMappingURL=dummy.map