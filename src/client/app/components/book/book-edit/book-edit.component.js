class BookEditCtrl {
  constructor(Book, User, $state) {
    'ngInject';
    
    this._Book = Book;
    this._User = User;
    this._$state = $state;
    this.title = $state.current.title;
    this.book = JSON.parse(localStorage.book);

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

    this._Book.edit({ q: {'name': this.book.name} }, this.book).then(
      (bookEdit) => {
        this._$state.go('app.book-view', { bookId: bookEdit._id.$oid });
      },
      (err) => {
        this.isSubmitting = false;
        this.errors = err.data.errors;
      }
    );
  }
}

let BookEdit = {
  bindings: {},
  controller: BookEditCtrl,
  templateUrl: 'components/book/book-edit/book-edit.html'
};

export default BookEdit;
