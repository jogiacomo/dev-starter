//Resource need to be tested

export default class MongoLabResource {
    constructor($http, $q, AppConstants) {
      'ngInject';
      this._$http = $http;
      this.deferred = $q.defer();
      this.config = angular.extend({
        BASE_URL: AppConstants.api
      }, AppConstants.MONGOLAB_CONFIG);

      this.resource = angular.extend(this, this.config);
    }

    getResource () {
      return this.resource;
    }

    resourceBuilder (data) {
      angular.extend(this, data);
    }
    
    /**
     * Return the dbUrl String
     * @return {String}
     */ 
    getDBUrl () {
      return this.config.BASE_URL + this.config.DB_NAME;
    }

    getDefaultParams () {
      return { apiKey: this.config.API_KEY };
    }

    /**
     * Return the apiKey String
     * @return {String}
     */ 
    getApiKey () {
      return this.config.API_KEY;
    }

    /**
     * Return the query String to retrieve all collections in database
     * @return {String}
     */
    getCollectionsList () {
      return this.getDBUrl() + '/collections/?apiKey=' + this.config.API_KEY;
    }

    /**
     * Return the query string to retrieve all documents specific to some query collection
     * @param {String} collectionName - The collection name value
     * @param {String} query - The query string. Default to '?'
     */ 
    getCollectionName (collectionName, query) {
      if(!query) {
        query = '?';
      } else if (query.includes('?')) {
        query = '/' + query;
      } else {
        query = '?' + query;
      }
      this.resource.collectionName = collectionName;
      let queryString = this.getDBUrl() + '/collections/' + collectionName + query + 'apiKey=' + this.config.API_KEY;
      return queryString;
    }

    /**
     * Return all documents contained by some collection with or without specifying optional parameter
     * @param {Object} options - The specified options parameter(s)
     * 
     * Documentation : http://docs.mlab.com/data-api/#authentication => List documents
     *                 https://docs.mongodb.com/v3.0/reference/operator/
     * 
     * This example detailed how to use options. 
     * var options = {
     *      q: {"fname": "Malcom", "lname": "Reynolds"},
     *      s: {"priority": 1, "difficulty": -1},
     *      c: true,
     *      f:{"firstName": 1, "lastName": 1},
     *      sk: 20
     * }
     * 
     * https://api.mlab.com/api/1/databases/my-db/collections/my-coll?q={"fname":"Malcom","lname":"Reynolds"}&s={"priority":1,"difficulty":-1}&c=true&f={"firstName":1,"lastName":1}&sk=30&apiKey=myAPIKey
     * 
     */
    findAll (options) {
      if (options === null || options === undefined) {
        var queryString = this.getCollectionName(this.resource.collectionName);
      } else {
        let optionsMapping = Object.keys(options);
        var str = '';
        optionsMapping.forEach((key) => {
          str = str + key + '=' + JSON.stringify(options[key]) + '&'; 
        });
        queryString = this.getCollectionName(this.resource.collectionName, str);
      }
      
      return this._$http.get(queryString)
      .then((res) => { 
        if(res.data.length === 0) {
          throw new Error('One of the property value in object options does not exist in database.')
        } else {
          return res;
        }
      });
    }

    findByValue (optional) {
      let key = Object.keys(optional)[0];
      let str = key + '=' + JSON.stringify(optional[key]) + '&';
      let queryString = this.getCollectionName(this.resource.collectionName, str);
      return this._$http.get(queryString)
      .then((res) => { 
        return res;
      });
    }

    /**
     * Return single document
     * @param {String} id - The document collection id
     */ 
    findOne (id) {
      let queryString = this.getCollectionName(this.resource.collectionName, id + '?');
      return this._$http.get(queryString).then((res) => {
         return res;
      });
    }

    /**
     * Save single or multiple documents by specifying data parameter
     * @param {Object} data - Literal object or array of objects to specify document(s) to save
     * 
     * This example detailed how to use options. 
     * data = { x: 1 } => save single document
     * data = [ { x: 1 }, { x: 2 }] => save two documents
     * 
     */ 
    save (fields) {
      let queryString = this.getCollectionName(this.resource.collectionName);
      return this._$http.post(queryString, fields).then((res) => { return res; });
    }

    /**
     * Update single or multiple documents by specifying data & optional parameter
     * @param {Object} options - The specified options parameter(s)
     * @param {Object} data - Literal object or array of objects to specify document(s) to save
     * 
     * Documentation : http://docs.mlab.com/data-api/#authentication => Update multiple documents
     *                                                                  View, update or delete a single document
     * 
     * This example detailed how to use options. 
     * data = { "$set" : { "x" : 3 } } => set single
     * data = [ { x: 1 }, { x: 2 }] => replace documents
     * 
     */ 
    update (options, fields) {
      if (options !== null && options !== undefined && options !== '') {
        let optionsMapping = Object.keys(options);
        var str = '';
        optionsMapping.forEach((key) => {
          str = str + key + '=' + JSON.stringify(options[key]) + '&'; 
        });
        var queryString =this.getCollectionName(this.resource.collectionName, str);
      } else {
        queryString =this.getCollectionName(this.resource.collectionName);
      }
      return this._$http.put(queryString, fields).then((res) => { return res; });
    }

    /**
     * Get single document and delete it
     * @param {String} id - The document collection id
     */ 
    delete (id) {
      let queryString = this.getCollectionName(this.resource.collectionName, id + '?');
      return this._$http.delete(queryString);
    }
}
