import auth from './auth.service';
describe('Service:AuthService', function () {
    var $rootScope, $http, config, authService, $q;
    beforeEach(angular.mock.module(auth));
    beforeEach(angular.mock.inject(function (_$rootScope_, _$http_, _config_, _authService_, _$q_) {
        $http = _$http_;
        $q = _$q_;
        $rootScope = _$rootScope_;
        config = _config_;
        authService = _authService_;
    }));

    it('isAuth return boolean based on token', function () {
        authService.token = 'demo';
        expect(authService.isAuth()).toBeTruthy();
        authService.token = null;
        expect(authService.isAuth()).toBeFalsy();
    });
    it('getUser return user', function () {
        authService.user = 'demo';
        expect(authService.getUser()).toBe('demo');
    });

    it('login success', function () {
        var res = {
            data: {
                id_token: 'demo'
            }
        };
        spyOn($http, 'post').and.returnValue($q.when(res));
        spyOn(localStorage, 'setItem');
        authService.login('deom', '12345');
        $rootScope.$digest();
        expect(localStorage.setItem).toHaveBeenCalledWith('jwt', 'demo');
        expect(authService.token).toBe('demo');
    });
});