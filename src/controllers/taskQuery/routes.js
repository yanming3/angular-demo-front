const routes= function routes($routeProvider) {
    $routeProvider
        .when('/query', {
            template: require('./task.query.html'),
            controller: 'QueryCtrl',
            controllerAs: 'vm',
            access: {requiredLogin: true}
        });
};
routes.$inject = ['$routeProvider'];
export default routes;