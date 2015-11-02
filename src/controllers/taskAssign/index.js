import angular from 'angular';
import ngRoute from 'angular-route';

import routing from './routes';
import AssignCtrl from './task.assign.controller';
import taskService from '../../services/task.service';

export default angular.module('app.taskAssign', [ngRoute, taskService])
    .config(routing)
    .controller('AssignCtrl', AssignCtrl)
    .name;
