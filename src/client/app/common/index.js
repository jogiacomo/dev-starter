import angular from 'angular';

import 'angular-ui-router';
import 'angular-translate';
import './app.templates';
import 'angular-toastr';
import 'angularjs-toaster';
import 'angular-cookies';
import 'angular-file-upload';
import 'angular-loading-bar';
import 'angular-nvd3';
import 'angular-filter';
import 'angular-animate';
import 'angular-sanitize';

let commonModule = angular.module('app.common', [
  'ui.router',
  'pascalprecht.translate',
  'toastr',
  'templates',
  'ngCookies',
  'angularFileUpload',
  'angular-loading-bar',
  'nvd3',
  'ngAnimate',
  'ngSanitize',
  'angular.filter',
  'toaster'
]);

import router from './app.router';
commonModule.config(router);

import translate from './app.translate';
commonModule.config(translate);

import appConfig from './app.config';
commonModule.config(appConfig);

import constants from './app.constants';
commonModule.constant('AppConstants', constants);

export default commonModule;

