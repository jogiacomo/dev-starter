export default class Dictionary {
  constructor () {
    'ngInject';
    this.dataStore = new Array();
    this.add = add;
    this.find = find;
    this.remove = remove;
    this.showAll = showAll;
    this.count = count;
    this.clear = clear;
  }

  add (key, value) {
    this.dataStore[key] = value;
  }

  find (key) {
    return this.dataStore[key];
  }

  remove (key) {
    delete this.dataStore[key];
  }

  showAll () {
    for (var key in Object.keys(this.dataStore)) {
      print(key + " -> " + this.dataStore[key]);
    }
  }

  count () {
    var n = 0;
    for (var key in Object.keys(this.dataStore)) {
      ++n;
    }
    return n;
  }

  clear () {
    for (var key in Object.keys(this.dataStore)) {
      delete this.dataStore[key];
    }
  }
}