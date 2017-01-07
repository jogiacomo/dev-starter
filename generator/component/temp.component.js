import <%= upCaseName %>Ctrl from './<%= name %>.controller';

let <%= upCaseName %> = {
  bindings: {},
  controller: <%= upCaseName %>Ctrl,
  templateUrl: 'components/<%= parent %>/<%= name %>/<%= name %>.html'
};

export default <%= upCaseName %>;
