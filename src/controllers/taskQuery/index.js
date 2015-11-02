import angular from 'angular';
import ngRoute from 'angular-route';

import routing from './routes';
import QueryCtrl from './task.query.controller';
import taskService from '../../services/task.service';

export default angular.module('app.taskQuery', [ngRoute, taskService])
    .config(routing)
    .controller('QueryCtrl', QueryCtrl)
    .name;