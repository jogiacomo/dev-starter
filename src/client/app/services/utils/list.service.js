/**
 * Lists are one of the most common organizing tools people use in their day-to-day lives.
 */

export default class List {
    constructor () {
      'ngInject';
      this.listSize = 0;
      this.pos = 0;
      this.dataStore = []; // initializes an empty array to store list elements
      this.clear = clear;
      this.find = find;
      this.toString = toString;
      this.insert = insert;
      this.append = append;
      this.remove = remove;
      this.front = front;
      this.end = end;
      this.prev = prev;
      this.next = next;
      this.length = length;
      this.currPos = currPos;
      this.moveTo = moveTo;
      this.getElement = getElement;
      this.length = length;
      this.contains = contains;
    }

    append(element) {
      this.dataStore[this.listSize++] = element;
    }

    find (element) {
      for (var i = 0; i < this.dataStore.length; i++) {
        if (this.dataStore[i] === element) {
          return i;
        }
      }
      return -1;
    }

    remove (element) {
      var foundAt = this.find(element);
      if (foundAt > -1) {
        this.dataStore.splice(foundAt, 1);
        --this.listSize;
        return true;
      }
      return false;
    }

    length () {
      return this.listSize;
    }

    toString () {
      return this.dataStore;
    }

    insert (element, after) {
      var insertPos = this.find(after);
      if (insertPos > -1) {
        this.dataStore.splice(insertPos+1, 0, element);
        ++this.listSize;
        return true;
      }
      return false;
    }

    clear () {
      delete this.dataStore;
      this.dataStore = [];
      this.listSize = this.pos = 0;
    }

    contains () {
      for (var i = 0; i < this.dataStore.length; i++) {
        if (this.dataStore[i] === element) {
          return true;
        }
      }
      return false;
    }

    front () {
     this.pos = 0;
    }

    end () {
      this.pos = this.listSize-1;
    }

    prev () {
      if (this.pos > 0) {
        --this.pos;
      }
    }

    next () {
      if (this.pos < this.listSize-1) {
        ++this.pos;
      }
    }

    currPos () {
      return this.pos;
    }

    moveTo (position) {
      this.pos = position;
    }

    getElement () {
      return this.dataStore[this.pos];
    }


}