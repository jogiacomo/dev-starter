class BookCtrl {
  constructor(AppConstants, book, $state) {
    'ngInject';

    this.appName = AppConstants.appName;
    this.book = book;
    this.title = $state.current.title;
  }


}

export default BookCtrl