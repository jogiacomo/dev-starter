import angular from 'angular';

let componentsModule = angular.module('app.components', []);


// Components
import ErrorList from './error/error-list/error-list.component';
componentsModule.component('errorList', ErrorList);

import ProfileList from './profile/profile-list/profile-list.component';
componentsModule.component('profileList', ProfileList);

import BookEdit from './book/book-edit/book-edit.component';
componentsModule.component('bookEdit', BookEdit);

import BookList from './book/book-list/book-list.component';
componentsModule.component('bookList', BookList);

import BookNew from './book/book-new/book-new.component';
componentsModule.component('bookNew', BookNew);

import BookSearch from './book/book-search/book-search.component';
componentsModule.component('bookSearch', BookSearch);

export default componentsModule;
