import authInterceptor from './auth.interceptor'

function AppConfig($logProvider, cfpLoadingBarProvider, toastrConfig, $httpProvider, $stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  // Enable log
  $logProvider.debugEnabled(true);

  // Set options third-party lib
  toastrConfig.allowHtml = false;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;
  

  // Remove loading bar spinner
  //cfpLoadingBarProvider.includeSpinner = false;

  $httpProvider.interceptors.push(authInterceptor);

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'modules/layout/layout.html',
    resolve: {
      auth: function(User) {
        return User.verifyAuth();
      }
    }
  });

  $urlRouterProvider.otherwise('/');

}

export default AppConfig;

