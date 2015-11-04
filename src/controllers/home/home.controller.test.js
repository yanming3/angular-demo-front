import home from './index';
describe('Controller: Home', function () {
    var $rootScope, $controller, $q, ctrl, authService;

    beforeEach(angular.mock.module(home));

    beforeEach(angular.mock.inject(function (_$controller_, _$q_, _$rootScope_, _authService_) {
        $rootScope = _$rootScope_;
        $q = _$q_;
        authService = _authService_;
        $controller = _$controller_;
        ctrl = $controller('HomeController', {authService: authService});
    }));

    it('isAuth is set on startup', function () {
        spyOn(authService, 'isAuth');
        $controller('HomeController', {authService: authService});
        expect(authService.isAuth).toHaveBeenCalled();
    });

    it('grabs the user info if the user is authenticated', function () {
        spyOn(authService, 'isAuth').and.returnValue(true);
        spyOn(authService, 'getUser');
        $controller('HomeController', {authService: authService});
        expect(authService.getUser).toHaveBeenCalled();
    });

    it('it resets everything on #logout', function () {
        spyOn(authService, 'logout');

        var event = {
            preventDefault: angular.noop
        };

        ctrl.logout(event);

        expect(ctrl.isAuth).toBeFalsy();
        expect(ctrl.user).toBeNull();
        expect(authService.logout).toHaveBeenCalled();
    });
});