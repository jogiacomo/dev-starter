class ProfileCtrl {
  constructor(AppConstants, User, profile, $state, $scope) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._User = User;
    this._$state = $state;
    this.title = $state.current.title;

    this.profile = profile;

    if (localStorage.getItem('isSubmitting')) {
      this.isSubmitting = JSON.parse(localStorage.getItem('isSubmitting'));
    } else {
      this.isSubmitting = false;
    }

    if (localStorage.isFollowed) {
      this.isFollowed = JSON.parse(localStorage.isFollowed);
    } else {
      this.isFollowed = false;
    }
    
    localStorage.removeItem('isSubmitting');
    localStorage.removeItem('isFollowed');

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.isButtonArticle = false;
    this.isButtonProfile = true;

    // Show edit profile is this profile is the current user's
    if (this.currentUser) {
      this.isUser = (this.currentUser.username === this.profile.username);
    } else {
      this.isUser = false;
    }

  }



}

export default ProfileCtrl