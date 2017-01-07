function FollowBtn (User, Article, $state, $timeout) {
  'ngInject';

  return {
    restrict: 'EA',
    scope: {
      profile: '=',
      submitting: '=',
      logged: '=',
      article: '=',
      buttonprofile: '=',
      buttonarticle: '=',
      followed: '='
    },
    templateUrl: 'directives/buttons/follow-btn/follow-btn.html',
    link: function(scope, element, attrs) {
      scope.submit = () => {
        scope.users = JSON.parse(localStorage.getItem('profiles'));
        scope.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        localStorage.setItem('isSubmitting', true);


        if (!scope.currentUser) {
          $state.go('app.login');
          return;
        }

        if (scope.article) {

          if (User.current.articlesFollowing && User.current.articlesFollowing.indexOf(scope.article.title) !== -1) {
            Article.unsuscribe(scope.article).then(
              () => {
                localStorage.setItem('isSubmitting', false);
                localStorage.setItem('isFollowed', false);
                $state.go($state.$current, null, { reload: true });
                return;
              }
            )
          } else {
            Article.suscribe(scope.article).then(
              () => {
                localStorage.setItem('isSubmitting', false);
                localStorage.setItem('isFollowed', true);
                $state.go($state.$current, null, { reload: true });
                return;
              }
            )
          }

        } else {

          // If following already, unfollow
          if (User.current.following && User.current.following.indexOf(scope.profile.username) !== -1) {
            User.unsuscribe(scope.profile).then(
              () => {
                localStorage.setItem('isSubmitting', false);
                $state.go($state.$current, null, { reload: true });
              }
            )
          } else {
            User.suscribe(scope.profile).then(
              () => {
                localStorage.setItem('isSubmitting', false);
                $state.go($state.$current, null, { reload: true });
              }
            )
          }
        }
      };
    }
  };
};

export default FollowBtn;