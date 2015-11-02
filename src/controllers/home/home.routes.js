const routes = function ($routeProvider) {
    $routeProvider
        .when('/', {
            template: require('./home.html'),
            controller: 'HomeController',
            controllerAs: 'home',
            access: { requiredLogin: true }
        });
}
routes.$inject = ['$routeProvider'];

export default routes;