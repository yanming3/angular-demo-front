class AssignCtrl {
    constructor($scope, $uibModal, i18nService, uiGridConstants, TaskService) {
        i18nService.setCurrentLang('zh-cn');

        this.$uibModal = $uibModal;
        this.$scope = $scope;
        this.uiGridConstants = uiGridConstants;
        this.TaskService = TaskService;
        this.condition = {};
        this.visible = true;

        this.initGrid();
        const _this=this;

        this.TaskService.listRegion().then(data => {
            _this.provinces = data;
        });
        this.query();
    }
    initGrid(){
        const _this=this;
        _this.$scope.open = site=> {
            _this.openAssignPage(site);
        }
        _this.$scope.paginationOptions = {
            page: 1,
            pageSize: 25,
            sort: null
        };
        _this.$scope.gridOptions = {
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            useExternalPagination: true,
            useExternalSorting: false,
            enableSorting: true,
            enableColumnResizing: true,
            minRowsToShow: 10,
            multiSelect: true,
            enableRowSelection: true,
            enableRowHeaderSelection: true,
            enableFullRowSelection: true,
            enableSelectAll: true,
            showGridFooter: true,
            columnDefs: [{
                displayName: 'Id',
                name: 'siteId',
                visible: false
            },
                {
                    displayName: '名称',
                    name: 'siteName'
                }, {
                    displayName: '地址',
                    name: 'locationHint'
                }, {
                    displayName: '所属省份',
                    name: 'province'
                }, {
                    displayName: '所属城市',
                    name: 'city'
                }, {
                    displayName: '所属行政区',
                    name: 'district'
                }, {
                    displayName: '操作',
                    name: 'operation',
                    cellTemplate: '<button class="btn btn-primary"  ng-click="grid.appScope.open(row.entity.siteId)">分配</button>'
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
                        _this.query();
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

    reset() {
        this.condition = {};
    }
    query() {
        let params = angular.copy(this.condition);
        params.page = this.$scope.paginationOptions.page
        params.pageSize = this.$scope.paginationOptions.pageSize;
        if (params.regionId) {
            params.regionId = params.regionId.regionId;
        }
        const _that=this;

        this.TaskService.listSite(params).then(data=> {
            _that.$scope.gridOptions.totalItems = data.total;
            _that.$scope.gridOptions.data = data.data;
        }, reason=> {
            console.log('Failed: ' + reason);
        }, update=> {
            console.log('Got notification: ' + update);
        });
    }

    openAssignPage(site) {
        let sites = [];
        sites.push(site);
        require.ensure(['./task.popup.controller'],require=>{
            let modalInstance = this.$uibModal.open({
                animation: true,
                template: require('./task.popup.html'),
                controller: require('./task.popup.controller'),
                controllerAs: 'vm',
                size: "lg",
                resolve: {
                    sites:  ()=> {
                        return sites;
                    }
                }
            });

            modalInstance.result.then(()=> {
            }, ()=> {
            });
        });
    }

    addNew() {
        const datas = this.$scope.gridApi.selection.getSelectedRows();
        if (datas) {
            var sites = [];
            datas.forEach(function (item, index) {
                sites.push(item.siteId);
            });
            this.openAssignPage(sites);
        }
    }
};
AssignCtrl.$inject = ['$scope', '$uibModal', 'i18nService', 'uiGridConstants', 'TaskService'];
export default AssignCtrl;
