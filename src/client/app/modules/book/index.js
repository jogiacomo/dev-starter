import angular from 'angular';

// Create the book module where our functionality can attach to
let bookModule = angular.module('app.book', []);

// Include our UI-Router config settings
import BookConfig from './book.config';
bookModule.config(BookConfig);

// Controllers
import BookCtrl from './book.controller';
bookModule.controller('BookCtrl', BookCtrl);

export default bookModule;