import angular from 'angular';
import './auth';
import './layout';
import './home';
import './settings';
import './profile';
import './book';

let appModules = angular.module('app.modules', [
    'app.layout',
    'app.auth',
    'app.home',
    'app.settings',
    'app.profile',
    'app.book'
]);

export default appModules;
