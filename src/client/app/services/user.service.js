export default class User {
  constructor(JWT, MongoLabResource, AppConstants, Logger, Base64, $http, $state, $q) {
    'ngInject';

    this._JWT = JWT;
    this._MongoLabResource = MongoLabResource;
    this._AppConstants = AppConstants;
    this._log = Logger;
    this._Base64 = Base64;
    this._$http = $http;
    this._$state = $state;
    this._$q = $q;
    this.collectionUrl = ''

    // Object to store our user properties
    this.current = null;
    this.users = null;

  }

  // Try to authenticate by registering or logging in
  attemptAuth(type, credentials) {
    this._log.info('The user credentials : Service', credentials, 'Logging credentials');
    //let route = (type === 'login') ? '/login' : '/register';
    if (type === 'login') {
      return this.login(credentials);
    } else {
      return this.register(credentials);
    }

  }

  login (credentials) {
    this.collectionUrl = this._MongoLabResource.getCollectionName('users');
    let deferred = this._$q.defer();
    var user = {
      q: { 'email': credentials.email, 'password': credentials.password}
    };
    this._MongoLabResource.findAll(user)
      .then((res) => {
        if (res.statusText === 'OK') {
          this.current = res.data[0];
          localStorage.setItem('currentUser', JSON.stringify(this.current));
          // Set the JWT token
          this._JWT.save(res.data[0].token);
          deferred.resolve(this.current);
          this._log.success('Resolve with success : Service', this.current, 'Login succeeded');
        }  else {
          deferred.reject('Error');
          this._log.success('Reject with error : Service', credentials, 'Login Failed');
        }
    });
    return deferred.promise;
  }

  register (credentials) {
    this.collectionUrl = this._MongoLabResource.getCollectionName('users');
    let deferred = this._$q.defer();
    credentials.password = this._Base64.encode(credentials.password);
    credentials.token = this._Base64.encode(credentials.username) + '.' +
                        this._Base64.encode(credentials.email) + '.' + credentials.password;
    this._MongoLabResource.save(credentials)
    .then((res) => {
      if (res.statusText === 'OK') {
        // Set the JWT token
        this._JWT.save(credentials.token);
        // Store the user's info for easy lookup
        this.current = res.data;
        this.current.following = [];
        this.current.articleFollowing = [];
        this.current.articleLiked = [];
        localStorage.setItem('currentUser', JSON.stringify(this.current));
        deferred.resolve(this.current);
        this._log.success('Resolve with success : Service', this.current, 'Register succeeded');
      }  else {
        deferred.reject('Error');
        this._log.success('Reject with error : Service', credentials, 'Register Failed');
      }
    });
    return deferred.promise;
  }

  logout() {
    this.current = null;
    this._JWT.destroy();
    // Do a hard reload of current state to ensure all data is flushed
    this._$state.go(this._$state.$current, null, { reload: true });
  }

  verifyAuth() {
    let deferred = this._$q.defer();

    // Check for JWT token first
    if (!this._JWT.get()) {
      deferred.resolve(false);
      return deferred.promise;
    }

    // If there's a JWT & user is already set
    if (this.current) {
      deferred.resolve(true);

    // If current user isn't set, get it from the server.
    // If server doesn't 401, set current user & resolve promise.
    } else {
      let headers = {
          Authorization: 'Token ' + this._JWT.get()
        };
        let queryStr = 'q={"token": "' + this._JWT.get() + '"}&';
      this._$http.get(
        this._MongoLabResource.getCollectionName('users', queryStr),
        headers
      ).then(
        (res) => {
          this.current = res.data[0];
          deferred.resolve(true);
        },
        // If an error happens, that means the user's token was invalid.
        (err) => {
          this._JWT.destroy();
          deferred.resolve(false);
        }
        // Reject automatically handled by auth interceptor
        // Will boot them to homepage
      );
    }

    return deferred.promise;
  }

  // This method will be used by UI-Router resolves
  ensureAuthIs(bool) {
    let deferred = this._$q.defer();

    this.verifyAuth().then((authValid) => {
      // if it's the opposite, redirect home
      if (authValid !== bool) {
        this._$state.go('app.home');
        deferred.resolve(false);
      } else {
        deferred.resolve(true);
      }
    })

    return deferred.promise;
  }

  getUsername (username) {
    this.collectionUrl = this._MongoLabResource.getCollectionName('users');
    let deferred = this._$q.defer();
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._MongoLabResource.findByValue({ q: { username: username } })
      .then((res) => {
        //this.current = res.data[0];
        if (currentUser) {
          if (currentUser.following.indexOf(username) !== -1) {
            //res.data[0].isFollowed = true;
            localStorage.setItem('isFollowed', true);
          }
        }
        deferred.resolve(res.data[0]);
      });
    return deferred.promise;
  }

  findAll (currentUser) {
    this.collectionUrl = this._MongoLabResource.getCollectionName('users');
    let deferred = this._$q.defer();
    var arrayList = [];
    this._MongoLabResource.findAll()
    .then(
      (res) => {
        this.users = res.data;
        if (currentUser) {
          this.users.forEach(function(user) {
            if (user.username !== currentUser.username) {
              arrayList.push(user);
            }
          }, this);
          deferred.resolve(arrayList);
        } else {
          deferred.resolve(this.users);
        }

      }
    );
    return deferred.promise;
  }

  // Update the current user's name, email, password, etc
  update(options, fields) {
    this.collectionUrl = this._MongoLabResource.getCollectionName('users');
    return this._MongoLabResource.update(options, fields)
    .then(
      (res) => {
        this.current = res.config.data;
        return res;
      }
    );
  }

  suscribe (profile) {
    this.collectionUrl = this._MongoLabResource.getCollectionName('users');
    let deferred = this._$q.defer();
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!profile.followers) {
      profile.followers = [];
    }
    if (profile.followers.indexOf(currentUser.username) === -1) {
      profile.followers.push(currentUser.username);
    }
    currentUser.following.push(profile.username);
    this.update({ q: {'username': profile.username } }, profile);
    this.update({ q: {'username': currentUser.username } }, currentUser);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    deferred.resolve(true);
  
    return deferred.promise;
  }

  unsuscribe (profile) {
    this.collectionUrl = this._MongoLabResource.getCollectionName('users');
    let deferred = this._$q.defer();
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!profile.followers) {
      profile.followers = [];
    }
    if (profile.followers.indexOf(currentUser.username) !== -1) {
      profile.followers.splice(profile.followers.indexOf(currentUser.username), 1);
    }
    currentUser.following.splice(currentUser.following.indexOf(profile.username), 1);
    this.update({ q: {'username': profile.username } }, profile);
    this.update({ q: {'username': currentUser.username } }, currentUser);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    deferred.resolve(true);
    return deferred.promise;
  }


}