export default class Queue {
  constructor () {
    'ngInject';
    this.dataStore = [];
    this.enqueue = enqueue;
    this.dequeue = dequeue;
    this.front = front;
    this.back = back;
    this.toString = toString;
    this.empty = empty;
  }

  enqueue (element) {
    this.dataStore.push(element);
  }

  dequeue () {
    return this.dataStore.shift();
  }

  front () {
    return this.dataStore[0];
  }

  back () {
    return this.dataStore[this.dataStore.length-1];
  }

  toString () {
    var retStr = "";
    for (var i = 0; i < this.dataStore.length; i++) {
      retStr += this.dataStore[i] + "\n";
    }
    return retStr;
  }

  empty () {
    if (this.dataStore.length === 0) {
      return true;
    }
    else {
      return false;
    }
  }
}