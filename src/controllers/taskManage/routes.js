const routes=function routes($routeProvider) {
    $routeProvider
        .when('/manage', {
            template: require('./task.manage.html'),
            controller: 'ManageCtrl',
            controllerAs: 'vm',
            access: {requiredLogin: true}
        });
};

routes.$inject = ['$routeProvider'];
export default routes;