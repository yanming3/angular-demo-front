'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('bootstrap/dist/css/bootstrap.css');

require('angular-ui-grid/ui-grid.css');

require('./styles/main.css');

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _angularUiRouter = require('angular-ui-router');

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

require('angular-ui-grid/ui-grid.js');

var _angularUiBootstrap = require('angular-ui-bootstrap');

var _angularUiBootstrap2 = _interopRequireDefault(_angularUiBootstrap);

var _controllersTaskAssignIndex = require('./controllers/taskAssign/index');

var _controllersTaskAssignIndex2 = _interopRequireDefault(_controllersTaskAssignIndex);

var _controllersTaskManageIndex = require('./controllers/taskManage/index');

var _controllersTaskManageIndex2 = _interopRequireDefault(_controllersTaskManageIndex);

var _controllersTaskQueryIndex = require('./controllers/taskQuery/index');

var _controllersTaskQueryIndex2 = _interopRequireDefault(_controllersTaskQueryIndex);

var _appRoutes = require('./app.routes');

var _appRoutes2 = _interopRequireDefault(_appRoutes);

_angular2['default'].module('app', ['ui.grid', 'ui.grid.pagination', 'ui.grid.resizeColumns', 'ui.grid.selection', _angularUiBootstrap2['default'], _angularUiRouter2['default'], _controllersTaskAssignIndex2['default'], _controllersTaskManageIndex2['default'], _controllersTaskQueryIndex2['default']]).constant('config', {
    apiUrl: 'http://10.36.40.26:7001'
}).config(_appRoutes2['default']).filter('scanFilter', function () {
    var filterfun = function filterfun(status) {
        if (status == '1') {
            return '已扫描';
        } else if (status == '0') {
            return '未扫描';
        } else {
            return status;
        }
    };
    return filterfun;
}).filter('statusFilter', function () {
    var filterfun = function filterfun(status) {
        if (status == '1') {
            return '已完成';
        } else if (status == '0') {
            return '未完成';
        } else {
            return status;
        }
    };
    return filterfun;
});

(function () {
    _angular2['default'].module('ui.grid').config(['$provide', function ($provide) {
        $provide.decorator('i18nService', ['$delegate', function ($delegate) {
            $delegate.add('zh-cn', {
                aggregate: {
                    label: '行'
                },
                groupPanel: {
                    description: '拖曳表头到此处进行分组'
                },
                search: {
                    placeholder: '查找',
                    showingItems: '已显示行数：',
                    selectedItems: '已选择行数：',
                    totalItems: '总行数：',
                    size: '每页显示行数：',
                    first: '首页',
                    next: '下一页',
                    previous: '上一页',
                    last: '末页'
                },
                menu: {
                    text: '选择列：'
                },
                sort: {
                    ascending: '升序',
                    descending: '降序',
                    remove: '取消排序'
                },
                column: {
                    hide: '隐藏列'
                },
                aggregation: {
                    count: '计数：',
                    sum: '求和：',
                    avg: '均值：',
                    min: '最小值：',
                    max: '最大值：'
                },
                pinning: {
                    pinLeft: '左侧固定',
                    pinRight: '右侧固定',
                    unpin: '取消固定'
                },
                gridMenu: {
                    columns: '列：',
                    importerTitle: '导入文件',
                    exporterAllAsCsv: '导出全部数据到CSV',
                    exporterVisibleAsCsv: '导出可见数据到CSV',
                    exporterSelectedAsCsv: '导出已选数据到CSV',
                    exporterAllAsPdf: '导出全部数据到PDF',
                    exporterVisibleAsPdf: '导出可见数据到PDF',
                    exporterSelectedAsPdf: '导出已选数据到PDF'
                },
                importer: {
                    noHeaders: '无法获取列名，确定文件包含表头？',
                    noObjects: '无法获取数据，确定文件包含数据？',
                    invalidCsv: '无法处理文件，确定是合法的CSV文件？',
                    invalidJson: '无法处理文件，确定是合法的JSON文件？',
                    jsonNotArray: '导入的文件不是JSON数组！'
                },
                pagination: {
                    sizes: '条/页',
                    totalItems: '条',
                    of: '条，共'
                }
            });
            return $delegate;
        }]);
    }]);
})();

//# sourceMappingURL=app-compiled.js.map