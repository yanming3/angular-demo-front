const routes = function routes($routeProvider) {
    $routeProvider
        .when('/login', {
            template: require('./login.html'),
            controller: 'LoginController',
            controllerAs: 'login',
            access: {requiredLogin: false}
        });
};
routes.$inject = ['$routeProvider'];
export default routes;