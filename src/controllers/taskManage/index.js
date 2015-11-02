import angular from 'angular';
import ngRoute from 'angular-route';

import routing from './routes';
import ManageCtrl from './task.manage.controller';
import taskService from '../../services/task.service';

export default angular.module('app.taskManage', [ngRoute, taskService])
    .config(routing)
    .controller('ManageCtrl', ManageCtrl)
    .name;