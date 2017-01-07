export default class Node {
  constructor (element) {
    'ngInject';
    this.element = element;
    this.next = null;
    this.previous = null;
  }
}