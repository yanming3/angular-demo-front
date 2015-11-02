import './login.css';

import angular from 'angular';
import ngRoute from 'angular-route';

import routing from './login.routes';
import LoginController from './login.controller';
import authService from '../../services/auth.service';

export default angular.module('app.login', [ngRoute, authService])
  .config(routing)
  .controller('LoginController', LoginController)
  .name;