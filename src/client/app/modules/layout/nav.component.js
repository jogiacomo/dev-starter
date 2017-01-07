class AppNavCtrl {
    /** @ngInject */
  constructor(AppConstants, User, Article, Utils, $translate, $timeout, $scope, Logger) {
    'ngInject';
    this.appName = AppConstants.appName;
    this._User = User;
    this._Article = Article;
    this._Utils = Utils;
    this._$translate = $translate;
    this._$timeout = $timeout;
    this._Logger = Logger;
    // Get today's date to generate the year
    this.date = new Date();

    //this.user = User.current;
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    /*$scope.$watch('User.current', (newUser) => {
      this.user = newUser;
    });*/

    this.languages = [
      { key: 'en', name: 'English' },
      { key: 'fr', name: 'Français' }
    ];

    this.selectedLanguage = localStorage.lang;

    if (!this.selectedLanguage) {
      this.selectedLanguage = 'en'
    };

    this.setActive();

    Article.findAll().then((res) => { this.articles = res; })
  }

  dropdown () {
    angular.element(document.querySelector('.ui.dropdown')).dropdown();
  }

  changeLanguage() {
    this._Logger.info('Message', 'text', 'Info Logger');
    let textEN = angular.element(document.querySelector(".en-EN")).context;
    let textFR = angular.element(document.querySelector(".fr-FR")).context;
    if(textFR.className.includes('active')) {
      this.selectedLanguage = 'fr';
    } else {
      this.selectedLanguage = 'en';
    }

    window.location.reload();
    localStorage.setItem('lang', this.selectedLanguage);
    this._$translate.use(this.selectedLanguage); 
  }

  setActive() {
    this._$translate.use(this.selectedLanguage); 
    if (this.selectedLanguage === 'fr') {
      this.isEN = false;
      this.isFR = true;
    } else {
      this.isEN = true;
      this.isFR = false;
    }
  }

  logout () {
    //this._$timeout(this._Utils.setIsFollowedToFalse(this._User.users), 3000);
    //this._$timeout(this._Utils.setArticleFollowedToFalse(this.articles), 3000);
    //this._User.current = null;
    this._User.logout();
  }
}

let AppNav = {
  controller: AppNavCtrl,
  templateUrl: 'modules/layout/nav.html'
};

export default AppNav;