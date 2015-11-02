const $inject = ['$routeProvider'];

const routing = function ($routeProvider) {
    //$locationProvider.html5Mode(true);
    $routeProvider.otherwise({redirectTo: '/'});
};

routing.$inject = $inject;
export default routing ;