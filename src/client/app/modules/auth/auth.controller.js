class AuthCtrl {
  constructor(User, Logger, $state) {
   'ngInject';
   this._User = User;
   this.title = $state.current.title;
   this._$state = $state;
   this._log = Logger;
   this.authType = $state.current.name.replace('app.', '');
  }

  submitForm() {
    this.isSubmitting = true;
    this._User.attemptAuth(this.authType, this.formData).then(
      // Callback for success
      (res) => {
        this.isSubmitting = false;
        this._log.success('Resolve with success : Ctrl', res, 'Login succeeded');
        this._$state.go('app.home');
        window.location.reload();
      },
      // Callback for failure
      (err) => {
        this.isSubmitting = false;
        this.errors = err.data.errors;
        this._log.success('Reject with error : Ctrl', this.errors, 'Login Failed');
      }
    );
  }

}

export default AuthCtrl;
