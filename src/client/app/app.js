import angular from 'angular';
import appRun  from './common/app.run';

import 'ionic-native';
import 'ionic-sdk/release/js/ionic-angular';
import 'onsenui/js/angular-onsenui';

import './common';
import './services';
import './modules';
import './components';
import './directives';

const requires = [
  'app.common',
  'app.modules',
  'app.components',
  'app.directives',
  'app.services',
  'ionic',
  'ionic.native',
  'onsen'
];

window.app = angular.module('app', requires);

angular.module('app').run(appRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});

