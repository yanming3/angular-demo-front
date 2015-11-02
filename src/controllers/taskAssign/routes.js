const $inject = ['$routeProvider'];

const routes = function ($routeProvider) {
    $routeProvider
        .when('/assign', {
            template: require('./task.assign.html'),
            controller: 'AssignCtrl',
            controllerAs: 'vm',
            access: {requiredLogin: true}
        });
};
routes.$inject = $inject;

export default routes;
