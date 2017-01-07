let BookConfig = ($stateProvider) => {
  'ngInject';

  $stateProvider
  .state('app.book-view', {
    url: '/book/:bookId',
    controller: 'BookCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'modules/book/book.html',
    title: 'Book',
    resolve: {
      book: function(Book, $state, $stateParams) {
        return Book.findOne($stateParams.bookId).then(
          (book) => {
            return book;
          },
          (err) => $state.go('app.home')
        );
      }
    }
  })
  
  .state('app.book-list', {
    url: '/books',
    templateUrl: 'modules/book/book-list.html',
    title: 'Book List'
  })
  
  .state('app.book-new', {
    url: '/books/new',
    templateUrl: 'modules/book/book-new.html',
    title: 'New Book'
  })

  .state('app.book-search', {
    url: '/books/search',
    templateUrl: 'modules/book/book-search.html',
    title: 'Search Books',
  })
  
  .state('app.book-edit', {
    url: '/books/:bookId/edit',
    templateUrl: 'modules/book/book-edit.html',
    title: 'Edit Book',
    resolve: {
      book: function(Book, $state, $stateParams) {
        return Book.findOne($stateParams.bookId).then(
          (book) => {
            localStorage.setItem('book', JSON.stringify(book));
            return book;
          },
          (err) => $state.go('app.home')
        );
      }
    }
  });

};

export default BookConfig;