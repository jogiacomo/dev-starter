import angular from 'angular';

// Create the module where our functionality can attach to
let layoutModule = angular.module('app.layout', []);


// Components
import AppMenu from './menu.component';
layoutModule.component('appMenu', AppMenu);

import AppNav from './nav.component';
layoutModule.component('appNav', AppNav);


export default layoutModule;

