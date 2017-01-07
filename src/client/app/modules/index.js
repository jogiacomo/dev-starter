import angular from 'angular';
import './auth';
import './layout';
import './home';
import './settings';
import './profile';
import './article';
import './announcement';
import './contact';
import './album';
import './artist';
import './book';

let appModules = angular.module('app.modules', [
    'app.layout',
    'app.auth',
    'app.home',
    'app.settings',
    'app.profile',
    'app.article',
    'app.announcement',
    'app.contact',
    'app.album',
    'app.artist',
    'app.book'
]);

export default appModules;
