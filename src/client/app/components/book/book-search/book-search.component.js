class BookSearchCtrl {
  constructor(Book, Utils, $state, $stateParams, $location) {
    'ngInject';
    this.title = $state.current.title;
    this._Book = Book;
    this._Utils = Utils;
    this._$state = $state;
    this._$stateParams = $stateParams;
    this._$location = $location;

    this.getAuthors();
    this.getCategories();

    this.list = this.authors;

    this.getView();
    

    this.chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']
    this._chars = ['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#']

    this.re = new RegExp('/[0-9]/');

  }

  select (val) {
    this.list = [];
    this.loading = true;
    this.notFound = false;
    this._Book.findAll().then(
      (res) => {
        this.loading = false;
        if (!val.char) {
          this.list = this.authors;
          this.all = true;
          this.isChar = false;
          this._isChar = false;
          this.isAuthor = false;
          this._$location.path(this._$state.current.url).search({val: '&@'});
        } else {
          for (let i = 0; i < this.authors.length; i++) {
            if (this.authors[i].charAt(0) === val.char) {
              this.list.push(this.authors[i]);
            } 
          }
          if (this.list.length === 0) {
            this.notFound = true;
          }
          this.val = val.char;
          this.isChar = true;
          this._isChar = false;
          this.all = false;
          this.isAuthor = false;
          this._$location.path(this._$state.current.url).search({val: this.val});
        }
      }
    );
    
  }

  _select (val) {
    this.list = [];
    this.loading = true;
    this.notFound = false;
    this._Book.findAll().then(
      (res) => {
        this.loading = false;
        if (val._char === '#') {
          for (let i = 0; i < this.authors.length; i++) {
            if (this.authors[i].charAt(0).match(this.re)) {
              this.list.push(this.authors[i]);
            }
          }
        } else {
          for (let i = 0; i < this.authors.length; i++) {
            if (this.authors[i].charAt(0) === val._char) {
              this.list.push(this.authors[i]);
            }
          }
        }
        if (this.list.length === 0) {
          this.notFound = true;
        }
        this._val = val._char;
        this._isChar = true;
        this.isChar = false;
        this.all = false;
        this.isAuthor = false;
        this._$location.path(this._$state.current.url).search({val: this._val});
      }
    );
  }

  search () {
    this.books = [];
    this.data = '';
    this.loading = false;
    this._Book.findAll().then(
      (res) => {
        this.loading = false;
        for (let i = 0; i < res.length; i++) {
          if (this._Utils.seqSearch(res[i].about.split(' '), this.searchData) !== -1 ||
              this._Utils.seqSearch(res[i].authorList, this.searchData) !== -1 ||
              this._Utils.seqSearch(res[i].categoryList, this.searchData) !== -1 ||
              this._Utils.seqSearch(res[i].publisher.split(' '), this.searchData) !== -1
             ) {
            this.data = this.searchData;
            this.books.push(res[i]);
          }
        }
      }
    );
  }

  getAuthor (slug) {
    this.books = [];
    this.loading = true;
    this._Book.findAll().then(
      (res) => {
        this.loading = false;
        for (let i = 0; i < res.length; i++) {
          if (res[i].authorList.indexOf(slug.author) !== -1) {
            this.books.push(res[i]);
          }
        }
        this.slug = slug.author.replace(' ', '_');
        localStorage.setItem('authorName', this.slug);
        localStorage.setItem('books', JSON.stringify(this.books));
        this.isChar = false;
        this._isChar = false;
        this.all = false;
        this.isAuthor = true;
        this._$location.path(this._$state.current.url).search({author: this.slug});
      }
    );
  }

  getAuthors () {
    this.authors = [];
    this._Book.findAll().then(
      (res) => {
        for (let i = 0; i < res.length; i++) {
          for (let j = 0; j < res[i].authorList.length; j++) {
            if (this.authors.indexOf(res[i].authorList[j]) !== -1) {
              continue;
            }
            this.authors.push(res[i].authorList[j]);
          }
        }
        this.authors.sort();
        //return this.authors;
      }
    );
  }

  getCategories () {
    this.categories = [];
    this._Book.findAll().then(
      (res) => {
        for (let i = 0; i < res.length; i++) {
          for (let j = 0; j < res[i].categoryList.length; j++) {
            this.categories.push(res[i].authorList[j]);
          }
        }
        this.categories.sort();
      }
    );
  }

  getView () {
    let url = window.location.href;
    let index = url.indexOf('=');
    let searchValue = {};
    let reg = new RegExp('/[N-Z]/');

    if (url.includes('val')) {
      searchValue.val = url.substr(index+1, url.length);
      if (searchValue.match(reg) || searchValue.match(this.re)) {
        this._select(searchValue);
      } else if (searchValue.includes('@')) {
        this.list = this.authors;
      } else {
        this.select(searchValue);
      }
    } else {
      searchValue.author = url.substr(index+1, url.length).replace('_', ' ');
      this.getAuthor(searchValue);
    }
  }

}

let BookSearch = {
  bindings: {
  },
  controller: BookSearchCtrl,
  templateUrl: 'components/book/book-search/book-search.html'
};

export default BookSearch;
