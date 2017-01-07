class SettingsCtrl {
    
  constructor(User, AppConstants, $scope, $state, $window) {
    'ngInject';

    this._User = User;
    this.appName = AppConstants.appName;
    this._$state = $state;
    this.title = $state.current.title;
    this.currentUser = User.current;

    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

    this.formData = {
      email: this.currentUser.email,
      bio: this.currentUser.bio,
      username: this.currentUser.username,
      image: this.currentUser.image,
      token: this.currentUser.token,
      password: this.currentUser.password,
      city: this.currentUser.city,
      country: this.currentUser.country,
      zip: this.currentUser.zip
    }

    if (this.currentUser.image !== '') {
      $scope.imageURL = this.currentUser.image;
    }

    this.logout = User.logout.bind(User);
    this.token = localStorage.getItem('jwtToken');

  }

  submitForm() {
    this.loading = true;
    this.isSubmitting = true;
    let token = { q: {'token': this.token } };
    this.formData.image = this.currentUser.image;
    this._User.update(token, this.formData).then(
      (user) => {
        this._$state.go('app.profile', {username:user.config.data.username})
      },
      (err) => {
        this.isSubmitting = false;
        this.errors = err.data.errors;
      }
    );
  } 

  logout () {
    return this.logout;
  }

}

export default SettingsCtrl;
