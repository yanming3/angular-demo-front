'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var $inject = ['$scope', '$uibModalInstance', 'sites', 'TaskService'];

var PopupCtrl = (function () {
    function PopupCtrl($scope, $uibModalInstance, sites, TaskService) {
        _classCallCheck(this, PopupCtrl);

        this.$scope = $scope;
        this.$uibModalInstance = $uibModalInstance;
        this.$scope.sites = sites;
        this.TaskService = TaskService;
    }

    _createClass(PopupCtrl, [{
        key: 'getUser',
        value: function getUser(val) {
            return this.TaskService.listUser(val);
        }
    }, {
        key: 'cancel',
        value: function cancel() {
            this.$uibModalInstance.dismiss('cancel');
        }
    }, {
        key: 'ok',
        value: function ok() {
            var _this = this;

            if (this.$scope.noResults == undefined || this.$scope.noResults == true) {
                alert("请选择要分配任务的人员!");
                return;
            }
            this.TaskService.createTask({ userId: this.$scope.user.userId, sites: this.$scope.sites }).then(function (data) {
                alert("任务分配成功!");
                _this.$uibModalInstance.close();
            }, function (reason) {
                alert("任务分配失败!");
                _this.$uibModalInstance.close();
            }, function (update) {});
        }
    }]);

    return PopupCtrl;
})();

PopupCtrl.$inject = $inject;

exports['default'] = PopupCtrl;
module.exports = exports['default'];

//# sourceMappingURL=task.popup.controller-compiled.js.map