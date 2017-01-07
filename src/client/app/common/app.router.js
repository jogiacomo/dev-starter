export default ($urlMatcherFactoryProvider, $locationProvider, $urlRouterProvider) => {
  "ngInject";
  $urlMatcherFactoryProvider.strictMode(false);
  $locationProvider.html5Mode(false);
  $urlRouterProvider.otherwise('/404');
};