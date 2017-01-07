import angular from 'angular';

let directivesModule = angular.module('app.directives', []);

import ShowAuthed from './show-auth.directive';
directivesModule.directive('showAuthed', ShowAuthed);

import fileUpload from './buttons/upload/file-upload.directive';
directivesModule.directive('fileUpload', fileUpload);

import likeBtn from './buttons/like-btn/like-btn.directive';
directivesModule.directive('likeBtn', likeBtn);

import followBtn from './buttons/follow-btn/follow-btn.directive';
directivesModule.directive('followBtn', followBtn);

import favoriteBtn from './buttons/favorite-btn/favorite-btn.directive';
directivesModule.directive('favoriteBtn', favoriteBtn);

import paginationDir from './pagination/pagination.directive';
directivesModule.directive('paginationDir', paginationDir);

import mapDir from './map/map.directive';
directivesModule.directive('mapDir', mapDir);

import dropdownDir from './dropdown/dropdown.directive';
directivesModule.directive('dropdownDir', dropdownDir);

import datepickerDir from './datepicker/datepicker.directive';
directivesModule.directive('datepickerDir', datepickerDir);

import animateRatio from './animate-ratio.directive';
directivesModule.directive('animateRatio', animateRatio);

import watchMenu from './watch-menu.directive';
directivesModule.directive('watchMenu', watchMenu);

export default directivesModule;
