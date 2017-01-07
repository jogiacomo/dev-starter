let ProfileConfig = ($stateProvider) => {
  'ngInject';

  $stateProvider

  .state('app.profile-list', {
    url: '/profiles',
    templateUrl: 'modules/profile/profile-list.html',
    title: 'Profile List',
    resolve: {
      profiles: (User) => {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return User.findAll(currentUser).then(
          (profiles) => {
            var profileList = profiles;
            if (!currentUser) {
              localStorage.setItem('isFollowed', false);
            }
            localStorage.setItem('profiles', JSON.stringify(profileList));
            return profiles;
          },
          (err) => $state.go('app.home')
        );
      }
    }
  })

  .state('app.profile', {
    url: '/@:username',
    controller: 'ProfileCtrl as $ctrl',
    templateUrl: 'modules/profile/profile.html',
    title: 'Profile',
    resolve: {
      profile: (User, $state, $stateParams) => {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if ($stateParams.username === '') {
          $stateParams.username = currentUser.username;
        }
        return User.getUsername($stateParams.username).then(
          (profile) => {
            var currentProfile = profile;
            if (currentUser) {
              if (currentUser.following && currentUser.following.indexOf(profile.username) !== -1) {
                localStorage.setItem('isFollowed', true);
              } else {
                localStorage.setItem('isFollowed', false);
              }
            }
            localStorage.setItem('profile', JSON.stringify(currentProfile));
            return profile;
          },
          (err) => $state.go('app.home')
        );
      }
    }
  })

  .state('app.profile-articles', {
    url:'/@:username/articles',
    templateUrl: 'modules/profile/profile-articles.html',
    title: 'My Articles'
  })

  .state('app.profile.favorites', {
    url:'/@:username/articles/favorites',
    templateUrl: 'modules/profile/profile-articles-favorites.html',
    title: 'Favorites Articles'
  });

  
};

export default ProfileConfig;
