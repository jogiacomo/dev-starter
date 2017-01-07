export default class Utils {
  constructor () {
    'ngInject';
  }

  bubbleSort () {
    var numElements = this.dataStore.length;
    var temp;
    for (var outer = numElements; outer >= 2; --outer) {
      for (var inner = 0; inner <= outer-1; ++inner) {
        if (this.dataStore[inner] > this.dataStore[inner+1]) {
          this.swap(this.dataStore, inner, inner+1);
        }
      }
      print(this.toString());
    }
  }

  selectionSort () {
    var min, temp;
    for (var outer = 0; outer <= this.dataStore.length-2; ++outer) {
      min = outer;
      for (var inner = outer + 1;
        inner <= this.dataStore.length-1; ++inner) {
        if (this.dataStore[inner] < this.dataStore[min]) {
          min = inner;
        }
      }
      this.swap(this.dataStore, outer, min);
    }
  }

  insertionSort () {
    var temp, inner;
    for (var outer = 1; outer <= this.dataStore.length-1; ++outer) {
      temp = this.dataStore[outer];
      inner = outer;
      while (inner > 0 && (this.dataStore[inner-1] >= temp)) {
        this.dataStore[inner] = this.dataStore[inner-1];
        --inner;
      }
      this.dataStore[inner] = temp;
    }
  }

  swap (arr, index, index1) {
    var temp = arr[index];
    arr[index] = arr[index1];
    arr[index1] = temp;
  }

  seqSearch (arr, data) {
    for (var i = 0; i < arr.length; ++i) {
      if (data.includes(arr[i])) {
        if (i > 0) {
          this.swap(arr,i,i-1);
        }
        return true;
      }
    }
    return false;
  }

  seqSearchText (arr, data) {
    for (var i = 0; i < arr.length; ++i) {
      if (arr[i] == data) {
        return i;
      }
    }
    return -1;
  }

  findMin (arr) {
    var min = arr[0];
    for (var i = 1; i < arr.length; ++i) {
      if (arr[i] < min) {
        min = arr[i];
      }
    }
    return min;
  }

  findMax (arr) {
    var max = arr[0];
    for (var i = 1; i < arr.length; ++i) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    return max;
  }

  binSearch (arr, data) {
    var upperBound = arr.length-1;
    var lowerBound = 0;
    while (lowerBound <= upperBound) {
      var mid = Math.floor((upperBound + lowerBound) / 2);
      print("Current midpoint: " + mid);
      if (arr[mid] < data) {
        lowerBound = mid + 1;
      }
      else if (arr[mid] > data) {
        upperBound = mid - 1;
      }
      else {
        return mid;
      }
    }
    return -1;
  }

  count (arr, data) {
    var count = 0;
    var position = binSearch(arr, data);
    if (position > -1) {
      ++count;
      for (var i = position-1; i > 0; --i) {
        if (arr[i] == data) {
          ++count;
        }
        else {
          break;
        }
      }
      for (var i = position+1; i < arr.length; ++i) {
        if (arr[i] == data) {
          ++count;
        }
        else {
          break;
        }
      }
    }
    return count;
  }
}