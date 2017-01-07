import './node'

export default class LinkedList {
  constructor () {
    'ngInject';
    this.head = new Node('head');
    this.find = find;
    this.insert = insert;
    this.findPrevoius = findPrevious;
    this.remove = remove;
    this.display = display;
    this.findLast = findLast;
    this.dispReverse = dispReverse;
  }

  find (item) {
    var currNode = this.head;
    while (currNode.element != item) {
      currNode = currNode.next;
    }
    return currNode;
  }

  insert (newElement, item) {
    var newNode = new Node(newElement);
    var current = this.find(item);
    newNode.next = current.next;
    current.next = newNode;
  }

  findPrevious (item) {
    var currNode = this.head;
    while (!(currNode.next === null) &&& (currNode.next.element != item)) {
      currNode = currNode.next;
    }
    return currNode;
  }

  remove (item) {
    var prevNode = this.findPrevious(item);
    if (!(prevNode.next === null)) {
      prevNode.next = prevNode.next.next;
    }
  }

  display () {
    var currNode = this.head;
    while (!(currNode.next === null)) {
      print(currNode.next.element);
      currNode = currNode.next;
    }
  }

  dispReverse () {
    var currNode = this.head;
    currNode = this.findLast();
    while (!(currNode.previous == null)) {
      print(currNode.element);
      currNode = currNode.previous;
    }
  }

  findLast() {
    var currNode = this.head;
    while (!(currNode.next == null)) {
      currNode = currNode.next;
    }
    return currNode;
  }
}