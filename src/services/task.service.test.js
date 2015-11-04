import task from './task.service';
describe('Service:TaskService', function () {
    var taskService, $http, $q, $rootScope;
    beforeEach(angular.mock.module(task));
    beforeEach(angular.mock.inject(function (_$rootScope_, _$http_, _TaskService_, _$q_) {
        taskService = _TaskService_;
        $rootScope = _$rootScope_;
        $http = _$http_;
        $q = _$q_;
    }));
    it('listSite success return site filtered by condition', function () {
        //success
        var res = {'success': true, result: 'demo'};
        spyOn($http, 'get').and.returnValue($q.when(res));
        var result;
        taskService.listSite({}).then(data=> {
            result = data;
        });
        $rootScope.$digest();
        expect(result).toBe('demo');
    });
    it('listSite fail does not return result', function () {
        //fail
        var res = {'success': false, result: 'demo'};
        spyOn($http, 'get').and.returnValue($q.when(res));
        var result;
        taskService.listSite({}).then(data=> {
            result = data;
        }, data=> {
            result = 'fail';
        });
        $rootScope.$digest();
        expect(result).toBe('fail');
    });
});