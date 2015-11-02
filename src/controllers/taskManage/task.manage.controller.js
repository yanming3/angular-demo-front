const $inject = ['$scope', 'i18nService', 'uiGridConstants', 'TaskService'];
class ManageCtrl {
    constructor($scope, i18nService, uiGridConstants, TaskService) {
        this.$scope = $scope;
        i18nService.setCurrentLang('zh-cn');
        this.uiGridConstants = uiGridConstants;
        this.TaskService = TaskService;
        this.statusList = [{'label': '完成', 'value': '1'}, {'label': '未完成', 'value': '0'}];
        this.condition = {};
        this.condition.status = {'label': '未完成', 'value': '0'};
        this.visible = true;
        const _this=this;

        this.TaskService.listRegion().then(data=> {
            _this.provinces = data;
        }, reason=> {
            console.log('Failed: ' + reason);
        });

        this.initGrid();

        this.query();
    }
    initGrid(){
        this.paginationOptions = {
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
                    displayName: '扫描人姓名',
                    name: 'userName'
                }, {
                    displayName: '扫描人账号',
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
                            _this.paginationOptions.sort = null;
                        } else {
                            _this.paginationOptions.sort = sortColumns[0].sort.direction;
                        }
                        _this.getPage();
                    });
                _this.$scope.gridApi.pagination.on
                    .paginationChanged(
                    _this.$scope,
                    function (newPage, pageSize) {
                        _this.paginationOptions.page = newPage;
                        _this.paginationOptions.pageSize = pageSize;
                        _this.query();
                    });
            }
        };
    }
   finish (status) {
    const datas = this.$scope.gridApi.selection.getSelectedRows();
    if (!datas) {
        alert('请选择要更新的任务!');
        return;
    }
    let tasks = [];
    for (let i = 0; i < datas.length; i++) {
        let item = datas[i];
        if ((item.isDone == '1') && status == '1') {
            alert('该任务已经完成！');
            return;
        }
        if ((item.isDone == '0') && status == '0') {
            alert('该任务未完成！');
            return;
        }
        tasks.push(item.taskId);
    }
    this.TaskService.finishTask(tasks, status).then(function () {
        alert('任务状态更新成功!');
        query();
    }, function () {
        alert('任务状态更新失败!');
        query();
    });
}
    reset() {
        this.$scope.condition = {};
        this.$scope.condition.status = {'label': '未完成', 'value': '0'};
    }

    query() {
        var params = angular.copy(this.condition);
        params.page = this.paginationOptions.page
        params.pageSize = this.paginationOptions.pageSize;
        if (params.regionId) {
            params.regionId = params.regionId.regionId;
        }
        if (params.userId) {
            params.userId = (params.userId.userId ? params.userId.userId : params.userId);
        }
        if (params.status) {
            params.status = params.status.value;
        }
        const _this=this;
        this.TaskService.listTask(params).then(data=> {
            _this.$scope.gridOptions.totalItems = data.total;
            _this.$scope.gridOptions.data = data.data;
        }, reason=> {
            alert('Failed: ' + reason);
        }, update =>{
            alert('Got notification: ' + update);
        });
    }

    togglePanel() {
        this.visible = !this.visible;
    }

    getUser(val) {
        return this.TaskService.listUser(val);
    }
}
ManageCtrl.$inject=$inject;
export default ManageCtrl;