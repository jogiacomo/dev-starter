let <%= upCaseName %>Config = ($stateProvider) => {
  'ngInject';

  $stateProvider
  .state('app.<%= name %>-view', {
    url: '/<%= name %>/:<%= name %>Id',
    controller: '<%= upCaseName %>Ctrl',
    controllerAs: '$ctrl',
    templateUrl: 'modules/<%= name %>/<%= name %>.html',
    title: '<%= upCaseName %>',
    resolve: {
      <%= name %>: function(<%= upCaseName %>, $state, $stateParams) {
        return <%= upCaseName %>.find<%= upCaseName %>($stateParams).then(
          (<%= name %>) => {
            return <%= name %>;
          },
          (err) => $state.go('app.home')
        );
      }
    }
  })
  
  .state('app.<%= name %>-list', {
    url: '/<%= name %>s',
    templateUrl: 'modules/<%= name %>/<%= name %>-list.html',
    title: '<%= upCaseName %> List'
  })
  
  .state('app.<%= name %>-new', {
    url: '/<%= name %>s/new',
    templateUrl: 'modules/<%= name %>/<%= name %>-new.html',
    title: 'New <%= upCaseName %>'
  })
  
  .state('app.<%= name %>-edit', {
    url: '/<%= name %>s/:<%= name %>Id/edit',
    templateUrl: 'modules/<%= name %>/<%= name %>-edit.html',
    title: 'Edit <%= upCaseName %>',
    resolve: {
      <%= name %>: function(<%= upCaseName %>, $state, $stateParams) {
        return <%= upCaseName %>.find<%= upCaseName %>($stateParams).then(
          (<%= name %>) => {
            return <%= name %>;
          },
          (err) => $state.go('app.home')
        );
      }
    }
  });

};

export default <%= upCaseName %>Config;