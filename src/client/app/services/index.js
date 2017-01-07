import angular from 'angular';

let servicesModule = angular.module('app.services', []);

import LoggerService from './logger.service';
servicesModule.service('Logger', LoggerService);

import ToastService from './toast.service';
servicesModule.service('Toast', ToastService);

import UserService from './user.service';
servicesModule.service('User', UserService);

import JwtService from './jwt.service';
servicesModule.service('JWT', JwtService);

import MongoLabResource from './mongolab/mongolab.resource';
servicesModule.service('MongoLabResource', MongoLabResource);

import Base64 from './Base64.service';
servicesModule.service('Base64', Base64);

import S3Upload from './s3/s3-upload.service';
servicesModule.service('S3Upload', S3Upload);

import UtilsService from './utils/utils.service';
servicesModule.service('Utils', UtilsService);

import ArticleService from './article.service';
servicesModule.service('Article', ArticleService);

import ContactService from './contact.service';
servicesModule.service('Contact', ContactService);

import AlbumService from './album.service';
servicesModule.service('Album', AlbumService);

import ArtistService from './artist.service';
servicesModule.service('Artist', ArtistService);

import AnnouncementService from './announcement.service';
servicesModule.service('Announcement', AnnouncementService);

import BookService from './book.service';
servicesModule.service('Book', BookService);

export default servicesModule;
