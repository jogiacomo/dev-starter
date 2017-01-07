export default class <%= upCaseName %> {
  constructor(AppConstants, MongoLabResource, Logger, $http, $state, $q) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._MongoLabResource = MongoLabResource;
    this._Logger = Logger;
    this._$http = $http;
    this._$state = $state;
    this._$q = $q;
    this.collectionUrl = '';
    
  }

  save<%= upCaseName %> (<%= name %>) {
    this.collectionUrl = this._MongoLabResource.getCollectionName('<%= name %>s');
    let deferred = this._$q.defer();
    this._MongoLabResource.save(<%= name %>)
      .then((res) => {
        this.callback(deferred, res);
      });
      return deferred.promise;
  }

  find<%= upCaseName %> (id) {
    this.collectionUrl = this._MongoLabResource.getCollectionName('<%= name %>s');
    let deferred = this._$q.defer();
    this._MongoLabResource.findOne(id)
      .then((res) => {
        this.callback(deferred, res);
      });
    return deferred.promise;
  }

  findAll (query) {
    this.collectionUrl = this._MongoLabResource.getCollectionName('<%= name %>s');
    let deferred = this._$q.defer();
    this._MongoLabResource.findAll(query)
      .then((res) => {
        this.callback(deferred, res);
      });
    return deferred.promise;
  }

  edit<%= upCaseName %> (options, <%= name %>) {
    this.collectionUrl = this._MongoLabResource.getCollectionName('<%= name %>s');
    let deferred = this._$q.defer();
    this._MongoLabResource.update(options, <%= name %>)
      .then((res) => {
        this.callback(deferred, res);
      });
    return deferred.promise;
  }

  remove<%= upCaseName %> (id) {
    this.collectionUrl = this._MongoLabResource.getCollectionName('<%= name %>s');
    let deferred = this._$q.defer();
    this._MongoLabResource.delete(id)
      .then((res) => {
        this.callback(deferred, res);
      });
    return deferred.promise;
  }

  callback (promise, response) {
    if (response.statusText === 'OK') {
      if (response.config.data) {
        promise.resolve(response.config.data);
      } else {
        promise.resolve(response.data);
      }
      this._Logger.success('Resolve with success : Service', response.data, 'Callback succeeded');
    } else {
      promise.reject('Error');
      this._Logger.success('Reject with error : Service', response, 'Callback Failed');
    }
    return promise;
  }


}