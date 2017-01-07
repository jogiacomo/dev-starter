export default class HashTable {
  constructor () {
    'ngInject';
    this.table = new Array(137);
    this.betterHash = betterHash;
    this.simpleHash = simpleHash;
    this.showDistro = showDistro;
    this.put = put;
    this.get = get;
    this.buildChains = buildChains;
  }

  put (key, data) {
    var pos = this.betterHash(key);
    if (!this.table[pos]) {
      this.table[pos] = key;
      this.values[pos] = data;
    }
    else {
      while (this.table[pos]) {
        pos++;
      }
      this.table[pos] = key;
      this.values[pos] = data;
    }
  }

  get (key) {
    var hash = -1;
    hash = this.betterHash(key);
    if (hash > -1) {
      for (var i = hash; this.table[hash] != undefined; i++) {
        if (this.table[hash] == key) {
          return this.values[hash];
        }
      }
    }
    return undefined;
  }

  buildChains () {
    for (var i = 0; i < this.table.length; i++) {
      this.table[i] = new Array();
    }
  }

  betterHash (string) {
    const H = 37;
    var total = 0;
    for (var i = 0; i < string.length; ++i) {
      total += H * total + string.charCodeAt(i);
    }
    total = total % this.table.length;
    if (total < 0) {
      total += this.table.length-1;
    }
    return parseInt(total);
  }

  simpleHash (data) {
    var total = 0;
    for (var i = 0; i < data.length; i++) {
      total += data.charCodeAt(i);
    }
    return total % this.table.length;
  }

  showDistro () {
    var n = 0;
    for (var i = 0; i < this.table.length; i++) {
      if (this.table[i]) {
        print(i + ': ' + this.table[i]);
      }
    }
  }
}