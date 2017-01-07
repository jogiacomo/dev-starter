class <%= upCaseName %>Ctrl {
  constructor(AppConstants, <%= name %>, $state) {
    'ngInject';

    this.appName = AppConstants.appName;
    this.<%= name %> = <%= name %>;

  }


}

export default <%= upCaseName %>Ctrl