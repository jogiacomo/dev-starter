class AppMenuCtrl {
  constructor(AppConstants, User, $scope) {
    'ngInject';
    this.appName = AppConstants.appName;
    this.currentUser = User.current;

    $scope.$watch('User.current', (newUser) => {
      this.currentUser = newUser;
    });
  }

}

let AppMenu = {
  controller: AppMenuCtrl,
  templateUrl: 'modules/layout/menu.html'
};

export default AppMenu;

