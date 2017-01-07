function dropdownDir (User, $translate, $timeout) {
  'ngInject';
  var helper = {};

  return {
    restrict: 'EA',
    scope: {
      isProfile: '=',
      isLanguage: '=',
      user: '='
    },
    templateUrl: 'directives/dropdown/dropdown.html',
    link: function(scope, element, attrs) {

      scope.user = User.current;

      scope.languages = [
        { key: 'en', name: 'English' },
        { key: 'fr', name: 'Français' }
      ];
      scope.selectedLanguage = 'en';

      scope.dropdown = (className) => {
        className = '.ui.dropdown' + '.' + className;
        $(className).dropdown();
      };

      scope.changeLanguage = () => {
        let textEN = angular.element(document.querySelector(".en-EN")).context;
        let textFR = angular.element(document.querySelector(".fr-FR")).context;
        if (textFR.className.includes('active')) {
          scope.selectedLanguage = 'fr';
        } else {
          scope.selectedLanguage = 'en';
        }
        $translate.use(scope.selectedLanguage); 
      };

      scope.logout = () => {
        User.logout();
      };

    }
  };
};

export default dropdownDir;