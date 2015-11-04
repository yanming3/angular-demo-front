import angular from 'angular';
import ngRoute from 'angular-route';
import constant from '../constant/constant';

import jwtDecode from 'jwt-decode';

class AuthService {
    constructor($http, config) {
        this.$http = $http;
        this.config = config;
        this.token = localStorage.getItem('jwt');
        this.user = this.token && jwtDecode(this.token);
    }

    isAuth() {
        return !!this.token;
    }

    getUser() {
        return this.user;
    }

    login(username, password) {
        return this.$http.post(this.config.apiUrl + '/sessions/create',
            JSON.stringify({username, password})
        ).then((res) => {
                this.token = res.data.id_token;
                localStorage.setItem('jwt', this.token);
            });
    }

    logout() {
        localStorage.removeItem('jwt');
        this.token = null;
        this.user = null;
    }
}

AuthService.$inject = ['$http', 'config'];

/*class AuthInterceptor {
    constructor($q, $location) {
        this.$q = $q;
        this.$location = $location;
    }

    request(config) {
        const token = localStorage.getItem('jwt');
        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
    }

    responseError(response) {
        if (response.status === 401 || response.status === 403) {
            this.$location.path('/login');
        }
        return this.$q.reject(response);
    }
}
AuthInterceptor.$inject = ['$q','$location'];*/

function interceptor($httpProvider) {
    //$httpProvider.interceptors.push('authInterceptor');
    $httpProvider.interceptors.push(
        ['$q', '$location',function($q, $location) {
        return {
            'request': function (config) {
                const token = localStorage.getItem('jwt');
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            },
            'responseError': function(response) {
                if (response.status === 401 || response.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(response);
            }
        };
    }]);
}
interceptor.$inject = ['$httpProvider'];

export default angular.module('services.auth', [ngRoute,constant])
    .service('authService', AuthService)
    .config(interceptor)
    .name;