const $inject = ['$scope', 'i18nService', 'uiGridConstants', 'TaskService'];
class QueryCtrl {
    constructor($scope, i18nService, uiGridConstants, TaskService) {
        this.$scope = $scope;
        this.i18nService = i18nService;
        this.uiGridConstants = uiGridConstants;
        this.TaskService = TaskService;
        i18nService.setCurrentLang('zh-cn');
        this.statusList = [{'label': '完成', 'value': '1'}, {'label': '未完成', 'value': '0'}];
        this.condition = {};
        this.condition.status = {'label': '未完成', 'value': '0'};
        this.visible = true;
        const _this = this;

        this.TaskService.listRegion().then(data=> {
            _this.provinces = data;
        }, reason=> {
            console.log('Failed: ' + reason);
        });
        this.initGrid();
        this.query();
    }

    initGrid() {
        this.$scope.paginationOptions = {
            page: 1,
            pageSize: 25,
            sort: null
        };
        const _this=this;
        this.$scope.gridOptions = {
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            useExternalPagination: true,
            useExternalSorting: false,
            enableSorting: true,
            enableColumnResizing: true,
            minRowsToShow: 10,
            showGridFooter: true,
            columnDefs: [{
                displayName: 'Id',
                name: 'taskId',
                visible: false
            },
                {
                    displayName: '名称',
                    name: 'siteName'
                }, {
                    displayName: '地址',
                    name: 'locationHint'
                }, {
                    displayName: '姓名',
                    name: 'userName'
                }, {
                    displayName: '账号',
                    name: 'mobile'
                }, {
                    displayName: '完成状态',
                    name: 'isDone',
                    cellTemplate: '<span>{{row.entity.isDone|statusFilter}}</span>'
                }, {
                    displayName: '扫描状态',
                    name: 'isScanned',
                    cellTemplate: '<span>{{row.entity.isScanned|scanFilter}}</span>'
                }, {
                    displayName: '分配人',
                    name: 'assigner'
                }, {
                    displayName: '分配时间',
                    name: 'createTime'
                }],
            onRegisterApi: function (gridApi) {
                _this.$scope.gridApi = gridApi;
                _this.$scope.gridApi.core.on
                    .sortChanged(
                    _this.$scope,
                    function (grid, sortColumns) {
                        if (sortColumns.length == 0) {
                            _this.$scope.paginationOptions.sort = null;
                        } else {
                            _this.$scope.paginationOptions.sort = sortColumns[0].sort.direction;
                        }
                        _this.getPage();
                    });
                _this.$scope.gridApi.pagination.on
                    .paginationChanged(
                    _this.$scope,
                    function (newPage, pageSize) {
                        _this.$scope.paginationOptions.page = newPage;
                        _this.$scope.paginationOptions.pageSize = pageSize;
                        _this.query();
                    });
            }
        };

    }

    togglePanel() {
        this.visible = !this.visible;
    }

    getUser(val) {
        return this.TaskService.listUser(val);
    }

    reset() {

    }

    query() {
        var params = angular.copy(this.condition);
        params.page = this.$scope.paginationOptions.page;
        params.pageSize = this.$scope.paginationOptions.pageSize;
        if (params.regionId) {
            params.regionId = params.regionId.regionId;
        }
        if (params.userId) {
            params.userId = (params.userId.userId ? params.userId.userId : params.userId);
        }
        if (params.status) {
            params.status = params.status.value;
        }
        var _this = this;
        this.TaskService.listTask(params).then((data)=> {
            _this.$scope.gridOptions.totalItems = data.total;
            _this.$scope.gridOptions.data = data.data;
        }, (reason)=> {
            alert('Failed: ' + reason);
        }, (updaate)=> {
            alert('Got notification: ' + update);
        });
    }
}
;
QueryCtrl.$inject = $inject;

export default QueryCtrl;
