import login from './index';
describe('Controller:Login', function () {
    var $controller, ctrl, authService, $location, $q,$rootScope;
    beforeEach(angular.mock.module(login));
    beforeEach(angular.mock.inject(function (_$rootScope_,_$controller_, _$q_, _$location_, _authService_, _config_) {
        authService = _authService_;
        $rootScope=_$rootScope_;
        $location = _$location_;
        $controller = _$controller_;
        $q = _$q_;
        ctrl = $controller('LoginController', {authService: authService});
    }));

    it('login success redirect query', function () {
        spyOn(authService, 'login').and.returnValue($q.when());
        spyOn($location, 'path');
        ctrl.user = {
            name: 'demo',
            password: '12345'
        };
        ctrl.login();
        $rootScope.$digest();
        expect(authService.login).toHaveBeenCalled();
        expect($location.path).toHaveBeenCalledWith('query');
    });
    it('login fail redirect login', function () {
        spyOn(authService, 'login').and.returnValue($q.reject());
        spyOn($location, 'path');
        ctrl.user = {
            name: 'demo',
            password: '12345'
        };
        ctrl.login();
        $rootScope.$digest();
        expect(authService.login).toHaveBeenCalled();
        expect($location.path).toHaveBeenCalledWith('login');
    });
});