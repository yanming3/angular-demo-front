'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _angularUiRouter = require('angular-ui-router');

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _taskQueryController = require('./task.query.controller');

var _taskQueryController2 = _interopRequireDefault(_taskQueryController);

var _servicesTaskService = require('../../services/task.service');

var _servicesTaskService2 = _interopRequireDefault(_servicesTaskService);

exports['default'] = _angular2['default'].module('app.taskQuery', [_angularUiRouter2['default'], _servicesTaskService2['default']]).config(_routes2['default']).controller('QueryCtrl', _taskQueryController2['default']).name;
module.exports = exports['default'];

//# sourceMappingURL=index-compiled.js.map