'use strict';

import angular from 'angular';
import ngRoute from 'angular-route';

import routing from './home.routes';
import HomeController from './home.controller';
import authService from '../../services/auth.service';

export default angular.module('app.home', [ngRoute, authService])
  .config(routing)
  .controller('HomeController', HomeController)
  .name;