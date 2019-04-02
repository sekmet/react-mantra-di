"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _mocha = require("mocha");

var _chai = require("chai");

var _ = require("../");

var _enzyme = require("enzyme");

var _react = _interopRequireDefault(require("react"));

var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-16"));

/* */
// setup file
(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact.default()
});
(0, _mocha.describe)('Dependancy Injection', function () {
  (0, _mocha.it)('should inject context and allow to use them', function () {
    var context = {
      name: 'arunoda'
    };

    var Layout =
    /*#__PURE__*/
    function (_React$Component) {
      (0, _inherits2.default)(Layout, _React$Component);

      function Layout() {
        (0, _classCallCheck2.default)(this, Layout);
        return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Layout).apply(this, arguments));
      }

      (0, _createClass2.default)(Layout, [{
        key: "render",
        value: function render() {
          return this.props.children;
        }
      }]);
      return Layout;
    }(_react.default.Component);

    var LayoutWithDeps = (0, _.injectDeps)(context)(Layout);

    var Comp = function Comp(_ref) {
      var name = _ref.name;
      return _react.default.createElement("p", null, name);
    };

    var mapper = function mapper(c) {
      return {
        name: c.name
      };
    };

    var CompWithDeps = (0, _.useDeps)(mapper)(Comp);
    var el = (0, _enzyme.shallow)(_react.default.createElement("div", null, _react.default.createElement(LayoutWithDeps, null, _react.default.createElement(CompWithDeps, null))));
    (0, _chai.expect)(el.html()).to.match(/arunoda/);
  });
  (0, _mocha.it)('should inject actions and allow to use them', function () {
    var context = {
      name: 'arunoda'
    };
    var actions = {
      default: {
        getFullName: function getFullName(_ref2, surname) {
          var name = _ref2.name;
          return "".concat(name, "-").concat(surname);
        }
      }
    };

    var Layout = function Layout(_ref3) {
      var children = _ref3.children;
      return children;
    };

    var LayoutWithDeps = (0, _.injectDeps)(context, actions)(Layout);

    var Comp = function Comp(_ref4) {
      var getName = _ref4.getName;
      return _react.default.createElement("p", null, getName('susiripala'));
    };

    var mapper = function mapper(c, a) {
      return {
        getName: a.default.getFullName
      };
    };

    var CompWithDeps = (0, _.useDeps)(mapper)(Comp);
    var el = (0, _enzyme.shallow)(_react.default.createElement("div", null, _react.default.createElement(LayoutWithDeps, null, _react.default.createElement(CompWithDeps, null))));
    (0, _chai.expect)(el.html()).to.match(/arunoda-susiripala/);
  });
  (0, _mocha.it)('should let use inject actions multiple times', function () {
    var context = {
      name: 'arunoda'
    };
    var actions = {
      default: {
        getFullName: function getFullName(_ref5, surname) {
          var name = _ref5.name;
          return "".concat(name, "-").concat(surname);
        }
      }
    };

    var Layout = function Layout(_ref6) {
      var children = _ref6.children;
      return children;
    }; // Injecting again to make sure action binding works fine.


    (0, _.injectDeps)(context, actions)(Layout);
    var LayoutWithDeps = (0, _.injectDeps)(context, actions)(Layout);

    var Comp = function Comp(_ref7) {
      var getName = _ref7.getName;
      return _react.default.createElement("p", null, getName('susiripala'));
    };

    var mapper = function mapper(c, a) {
      return {
        getName: a.default.getFullName
      };
    };

    var CompWithDeps = (0, _.useDeps)(mapper)(Comp);
    var el = (0, _enzyme.shallow)(_react.default.createElement("div", null, _react.default.createElement(LayoutWithDeps, null, _react.default.createElement(CompWithDeps, null))));
    (0, _chai.expect)(el.html()).to.match(/arunoda-susiripala/);
  });
  (0, _mocha.it)('should use a default mapper if no mapper is provided', function () {
    var context = {
      name: 'arunoda'
    };
    var actions = {
      default: {
        getFullName: function getFullName(_ref8, surname) {
          var name = _ref8.name;
          return "".concat(name, "-").concat(surname);
        }
      }
    };

    var Layout = function Layout(_ref9) {
      var children = _ref9.children;
      return children;
    };

    var LayoutWithDeps = (0, _.injectDeps)(context, actions)(Layout);

    var Comp = function Comp(props) {
      return _react.default.createElement("p", null, props.actions().default.getFullName(props.context().name));
    };

    var CompWithDeps = (0, _.useDeps)()(Comp);
    var el = (0, _enzyme.shallow)(_react.default.createElement("div", null, _react.default.createElement(LayoutWithDeps, null, _react.default.createElement(CompWithDeps, null))));
    (0, _chai.expect)(el.html()).to.match(/arunoda-arunoda/);
  });
  (0, _mocha.it)('should preseve original props', function () {
    var context = {};

    var Layout = function Layout(_ref10) {
      var children = _ref10.children;
      return children;
    };

    var LayoutWithDeps = (0, _.injectDeps)(context)(Layout);

    var Comp = function Comp(_ref11) {
      var name = _ref11.name;
      return _react.default.createElement("p", null, name);
    };

    var CompWithDeps = (0, _.useDeps)()(Comp);
    var el = (0, _enzyme.shallow)(_react.default.createElement("div", null, _react.default.createElement(LayoutWithDeps, null, _react.default.createElement(CompWithDeps, {
      name: "arunoda"
    }))));
    (0, _chai.expect)(el.html()).to.match(/arunoda/);
  });
});
(0, _mocha.describe)('Misc', function () {
  (0, _mocha.describe)('static fields', function () {
    (0, _mocha.it)('should preseve when injecting deps', function () {
      var Layout = function Layout() {
        return _react.default.createElement("p", null);
      };

      Layout.theme = 'light';
      var LayoutWithDeps = (0, _.injectDeps)({})(Layout);
      (0, _chai.expect)(LayoutWithDeps.theme).to.be.equal('light');
    });
    (0, _mocha.it)('should preseve when using deps', function () {
      var Comp = function Comp() {
        return _react.default.createElement("p", null);
      };

      Comp.theme = 'light';
      var CompWithDeps = (0, _.useDeps)()(Comp);
      (0, _chai.expect)(CompWithDeps.theme).to.be.equal('light');
    });
  });
  (0, _mocha.describe)('displayName', function () {
    (0, _mocha.it)('should extend when injecting deps', function () {
      var Layout = function Layout() {
        return _react.default.createElement("p", null);
      };

      Layout.displayName = 'TheLayout';
      var LayoutWithDeps = (0, _.injectDeps)({})(Layout);
      (0, _chai.expect)(LayoutWithDeps.displayName).to.be.equal('WithDeps(TheLayout)');
    });
    (0, _mocha.it)('should extend when using deps', function () {
      var Comp = function Comp() {
        return _react.default.createElement("p", null);
      };

      Comp.displayName = 'TheComp';
      var CompWithDeps = (0, _.useDeps)()(Comp);
      (0, _chai.expect)(CompWithDeps.displayName).to.be.equal('UseDeps(TheComp)');
    });
  });
});