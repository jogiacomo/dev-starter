class BookNewCtrl {
  constructor(Book, User, $state) {
    'ngInject';
    
    this._Book = Book;
    this._User = User;
    this._$state = $state;
    this.title = $state.current.title;

    this.book = {
      title: '',
      about: '',
      image: '',
      publisher: '',
      publicationDate: '',
      pages: '',
      authorList: [],
      categoryList: []
    }

  }

  addAuthor() {
    // Make sure this tag isn't already in the array
    if (!this.book.authorList.includes(this.author)) {
      this.book.authorList.push(this.author);
      this.author = '';
    }
  }

  removeAuthor(authorName) {
    this.book.authorList = this.book.authorList.filter((slug) => slug != authorName);
  }

  addCategory() {
    // Make sure this tag isn't already in the array
    if (!this.book.categoryList.includes(this.category)) {
      this.book.categoryList.push(this.category);
      this.category = '';
    }
  }

  removeCategory(categoryName) {
    this.book.categoryList = this.book.categoryList.filter((slug) => slug != categoryName);
  }

  discard() {
    this._$state.go('app.book-list');
  }

  submitForm() {
    this.isSubmitting = true;
    this.book.image = JSON.parse(localStorage.image);

    this._Book.save(this.book).then(
      (newBook) => {
        this._$state.go('app.book-list');
      },
      (err) => {
        this.isSubmitting = false;
        this.errors = err.data.errors;
      }
    );
  }
}

let BookNew = {
  bindings: {},
  controller: BookNewCtrl,
  templateUrl: 'components/book/book-new/book-new.html'
};

export default BookNew;
