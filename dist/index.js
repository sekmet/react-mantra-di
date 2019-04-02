"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectDeps = injectDeps;
exports.useDeps = useDeps;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var _createReactClass = _interopRequireDefault(require("create-react-class"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _recompose = require("recompose");

function injectDeps(context, _actions) {
  var actions = {};

  for (var key in _actions) {
    if (_actions.hasOwnProperty(key)) {
      var actionMap = _actions[key];
      var newActionMap = {};

      for (var actionName in actionMap) {
        if (actionMap.hasOwnProperty(actionName)) {
          newActionMap[actionName] = actionMap[actionName].bind(null, context);
        }
      }

      actions[key] = newActionMap;
    }
  }

  return function (Component) {
    var ComponentWithDeps = (0, _createReactClass.default)({
      childContextTypes: {
        context: _propTypes.default.object,
        actions: _propTypes.default.object
      },
      getChildContext: function getChildContext() {
        return {
          context: context,
          actions: actions
        };
      },
      render: function render() {
        return _react.default.createElement(Component, this.props);
      }
    });
    ComponentWithDeps.displayName = "WithDeps(".concat((0, _recompose.getDisplayName)(Component), ")");
    return (0, _hoistNonReactStatics.default)(ComponentWithDeps, Component);
  };
}

var defaultMapper = function defaultMapper(_context, _actions2) {
  return {
    context: function context() {
      return _context;
    },
    actions: function actions() {
      return _actions2;
    }
  };
};

function useDeps() {
  var mapper = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultMapper;
  return function (Component) {
    var ComponentUseDeps = (0, _createReactClass.default)({
      render: function render() {
        var _this$context = this.context,
            context = _this$context.context,
            actions = _this$context.actions;
        var mappedProps = mapper(context, actions);
        var newProps = (0, _objectSpread2.default)({}, this.props, mappedProps);
        return _react.default.createElement(Component, newProps);
      },
      contextTypes: {
        context: _propTypes.default.object,
        actions: _propTypes.default.object
      }
    });
    ComponentUseDeps.displayName = "UseDeps(".concat((0, _recompose.getDisplayName)(Component), ")");
    return (0, _hoistNonReactStatics.default)(ComponentUseDeps, Component);
  };
}