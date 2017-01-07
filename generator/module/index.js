import angular from 'angular';

// Create the <%= name %> module where our functionality can attach to
let <%= name %>Module = angular.module('app.<%= name %>', []);

// Include our UI-Router config settings
import <%= upCaseName %>Config from './<%= name %>.config';
<%= name %>Module.config(<%= upCaseName %>Config);

// Controllers
import <%= upCaseName %>Ctrl from './<%= name %>.controller';
<%= name %>Module.controller('<%= upCaseName %>Ctrl', <%= upCaseName %>Ctrl);

export default <%= name %>Module;