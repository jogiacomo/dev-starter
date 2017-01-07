function AppRun(AppConstants, $rootScope, $timeout, cfpLoadingBar, $ionicPlatform) {
  'ngInject';

  var diff,
      timeoutPromise;

  // App is loading, so set isAppLoading to true and start a timer
  $rootScope.isAppLoading = true;
  $rootScope.startTime = new Date();

  // Start loading bar for app loading
  cfpLoadingBar.start();

  // Subscribe to broadcast of $stateChangeSuccess state event via AngularUI Router
  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams, error) => {
    $rootScope.setPageTitle(toState.title);

    // Cancel timeout promise (if it exists) from executing, if route success occurs before the 400ms elapses
    if (timeoutPromise) {
      $timeout.cancel(timeoutPromise);
    }

    // Logic to handle elapsed time of app loading phase else handle app routing
    if ($rootScope.isAppLoading) {
      // Find the elapsed difference between the present time and the startTime set in our config
      diff = new Date() - $rootScope.startTime;

      // If 800ms has elapsed, isAppLoading is set to false
      // else create a timeout to set isAppLoading to false after 800ms has elapsed since the startTime was set
      if (diff > 800) {
        $rootScope.isAppLoading = false;
        cfpLoadingBar.complete();
      } else {
        $timeout(function () {
          $rootScope.isAppLoading = false;
          cfpLoadingBar.complete();
        }, 800 - diff);
      }

    } else if ($rootScope.isAppRouting) {
      // App finished routing, complete loading bar
      $rootScope.isAppRouting = false;
      cfpLoadingBar.complete();
    }

  });

    // Subscribe to broadcast of $stateChangeStart state event via AngularUI Router
  $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams, error) => {

    // If app is not already loading (since we started the loading bar in the config with the isAppLoading)
    if (!$rootScope.isAppLoading) {

      // $timeout returns a deferred promise to execute by the defined time of 400ms
      // set isAppRouting true and start loading bar
      // if route success or error takes 400ms or greater, timeout will execute
      timeoutPromise = $timeout(function () {
        $rootScope.isAppRouting = true;
        cfpLoadingBar.start();
      }, 400);

    }

  });

  // Helper method for setting the page's title
  $rootScope.setPageTitle = (title) => {
    $rootScope.pageTitle = '';
    if (title) {
      $rootScope.pageTitle += title;
      $rootScope.pageTitle += ' \u2014 ';
    }
    $rootScope.pageTitle += AppConstants.appName;
  };

  $ionicPlatform.ready(() => {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

}

export default AppRun;
