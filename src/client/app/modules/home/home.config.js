function HomeConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.home', {
    url: '/',
    parent: 'app',
    controller: 'HomeCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'modules/home/home.html',
    title: 'Home',
    data: {
      displayName: 'Home'
    }
  });

};

export default HomeConfig;
