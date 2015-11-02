const $inject = ['$http', '$q', 'config'];
class TaskService {
  constructor($http, $q, config) {
    this.$http = $http;
    this.$q = $q;
    this.config = config;
  }

  listSite(params) {
    const url = this.config.apiUrl + '/api/site';
    let deferred = this.$q.defer();
    this.$http.get(url, {params: params})
      .success(
      function (data) {
        if (data.success == true) {
          deferred.resolve(data.result);
        }
        else {
          deferred.reject();
        }
      }).error(function (data, status, headers, config) {
        deferred.reject();
      });
    return deferred.promise;
  }

  listTask(params) {
    const url = this.config.apiUrl + '/api/task';
    var deferred = this.$q.defer();
    this.$http.get(url, {params: params})
      .success(
      function (data) {
        if (data.success == true) {
          deferred.resolve(data.result);
        }
        else {
          deferred.reject();
        }
      }).error(function (data, status, headers, config) {
        deferred.reject();
      });
    return deferred.promise;
  }

  listRegion() {
    let deferred = this.$q.defer();
    const url = this.config.apiUrl + '/api/region';
    this.$http.get(url)
      .success(
      function (data) {
        if (data.success == true) {
          deferred.resolve(data.result);
        }
        else {
          deferred.reject();
        }
      }).error(function (data, status, headers, config) {
        deferred.reject();
      });
    return deferred.promise;
  }

  listUser(val) {
    const url = this.config.apiUrl + '/appscan/user';
    return this.$http.get(url, {
      params: {
        keyWord: val
      }
    }).then(function (response) {
      return response.data.result.map(function (item) {
        item.userName = item.userName + '-' + item.mobile;
        return item;
      });
    });
  }

  createTask(params) {
    let deferred = this.$q.defer();
    const url = this.config.apiUrl + '/api/task';
    this.$http.post(url, params, {headers: {'Access-Control-Allow-Origin': '*'}}).
      success(function (data, status, headers, config) {
        if (data.success == true) {
          deferred.resolve(data);
        }
        else {
          deferred.reject();
        }
      }).
      error(function (data, status, headers, config) {
        deferred.reject();
      });
    return deferred.promise;
  }

  finishTask(tasks, status) {
    let deferred = this.$q.defer();
    let params = {status: status, tasks: tasks};
    const url = this.config.apiUrl + '/appscan/task';
    this.$http.put(url, params).
      success(function (data, status, headers, config) {
        if (data.success == true) {
          deferred.resolve(data);
        }
        else {
          deferred.reject();
        }
      }).
      error(function (data, status, headers, config) {
        deferred.reject();
      });
    return deferred.promise;
  }
}
TaskService.$inject = $inject;
export default angular.module('services', [])
    .service('TaskService', TaskService)
    .name;
