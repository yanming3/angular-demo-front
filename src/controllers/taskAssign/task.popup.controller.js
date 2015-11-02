const $inject = ['$scope', '$uibModalInstance', 'sites', 'TaskService'];
class PopupCtrl {
    constructor($scope, $uibModalInstance, sites, TaskService) {
        this.$scope = $scope;
        this.$uibModalInstance = $uibModalInstance;
        this.$scope.sites = sites;
        this.TaskService = TaskService;
    }

    getUser(val) {
        return this.TaskService.listUser(val);
    }

    cancel() {
        this.$uibModalInstance.dismiss('cancel');
    }

    ok() {
        if (this.$scope.noResults == undefined || this.$scope.noResults == true) {
            alert("请选择要分配任务的人员!");
            return;
        }
        this.TaskService.createTask({userId: this.$scope.user.userId, sites: this.$scope.sites}).then(data=> {
            alert("任务分配成功!");
            this.$uibModalInstance.close();
        }, reason=> {
            alert("任务分配失败!");
            this.$uibModalInstance.close();
        }, update=> {
        });

    }

}
PopupCtrl.$inject = $inject;

export default PopupCtrl;