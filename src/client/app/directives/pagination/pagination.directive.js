function paginationDir () {
  'ngInject';
  var helper = {};

  return {
    restrict: 'EA',
    scope: {
      pageSize: '=',
      currentPage: '='
    },
    templateUrl: 'directives/pagination/pagination.html',
    link: function(scope, element, attrs) {

      //scope.currentPage = 1;
      //scope.pageSize = 4;

      scope.pageRange = (total) => {
        let pages = [];

        for (var i = 0; i < total; i++) {
          pages.push(i + 1)
        }

        return pages;
      };

      scope.changePage = (number) => {
        scope.$emit('setPageTo', number);
      }
    }
  };
};

export default paginationDir;