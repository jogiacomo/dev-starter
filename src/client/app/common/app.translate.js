import {
  en,
  fr
} from './translations';

export default $translateProvider => {
  "ngInject";
  $translateProvider
  .useSanitizeValueStrategy('escapeParameters')
  .translations('en', en)
  .translations('fr', fr)
  .preferredLanguage('en')
  .fallbackLanguage('en');
};