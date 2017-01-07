class HomeCtrl {
  constructor(User, AppConstants, $scope, $state) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._$scope = $scope;

    this.data = $state.current.data;

  }

  changeList(newList) {
    this._$scope.$broadcast('setListTo', newList);
  }


}

export default HomeCtrl;

