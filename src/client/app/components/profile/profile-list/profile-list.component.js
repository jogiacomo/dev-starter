class ProfileListCtrl {
  constructor(User, $state, $stateParams, $scope, $location) {
    'ngInject';

    this._User = User;
    this._$state = $state;
    this._$location = $location;
    this.title = $state.current.title;

    if (!this.listConfig) {
      this.listConfig = {};
    }

    this.setListTo(this.listConfig);

    $scope.$on('setListTo', (ev, newList) => {
      this.setListTo(newList);
    });

    $scope.$on('setPageTo', (ev, pageNumber) => {
      this.setPageTo(pageNumber);
    });

  }

  setListTo(newList) {
    // Set the current list to an empty array
    this.list = [];

    // Set listConfig to the new list's config
    this.listConfig = newList;

    this.runQuery();
  }

  setPageTo(pageNumber) {
    // Set the current list to an empty array
    this.list = [];

    this.listConfig.currentPage = pageNumber;

    this.runQuery();
  }

  runQuery() {
    // Show the loading indicator
    this.loading = true;
   // Create an object for this query
    let queryConfig = {
      filters: this.listConfig.filters || {}
    };

    // Set the limit filter from the component's attribute
    queryConfig.filters.limit = this.limit;

    let url = window.location.href;

    if (parseInt(url[url.length-1]) > 1 && !this.listConfig.currentPage) {
      this.listConfig.currentPage = parseInt(url[url.length-1]);
    }

    // If there is no page set, set page as 1
    if (!this.listConfig.currentPage) {
      this.listConfig.currentPage = 1;
    }

    // Add the offset filter
    queryConfig.filters.offset = (this.limit * (this.listConfig.currentPage - 1));

    this._User.findAll(this._User.current).then((res) => {
      this.loading = false;

      this.listConfig.pageSize = Math.ceil(res.length / this.limit);

      if (this.listConfig.currentPage > 1) {
        var startAt = this.limit * (this.listConfig.currentPage - 1);
        var endAt = this.listConfig.currentPage * this.limit;
        if (endAt > res.length) {
          endAt = res.length;
        }
      } else {
        startAt = 0;
        if (res.length < this.limit) {
          endAt = res.length;
        } else {
          endAt = this.limit;
        }
      }

      for (let i = startAt; i < endAt; i++) {
        this.list.push(res[i]);
      }
      localStorage.setItem('profiles', JSON.stringify(res));

    });

    this._$location.path(this._$state.current.url).search({page: this.listConfig.currentPage});
  }

}

let ProfileList = {
  bindings: {
    limit: '=',
    listConfig: '='
  },
  controller: ProfileListCtrl,
  templateUrl: 'components/profile/profile-list/profile-list.html'
};

export default ProfileList;
