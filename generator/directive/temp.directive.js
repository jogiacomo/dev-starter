function <%= upCaseName %> () {
  'ngInject';
  var helper = {};

  return {
    require: '',
    restrict: 'EA',
    transclude: true,
    scope: {},
    templateUrl: 'directives/<%= parent %>/<%= name %>/<%= name %>.html',
    link: function(scope, element, attrs) {

    }
  };
};

export default <%= upCaseName %>;