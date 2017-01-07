function FavoriteBtn (User, Contact, Artist, Book, $state, $timeout) {
  'ngInject';
  var helper = {};

  return {
    restrict: 'EA',
    scope: {
      buttonView: '=',
      buttonList: '=',
      isFavorite: '=',
      contact: '=',
      artist: '=',
      book: '=',
    },
    templateUrl: 'directives/buttons/favorite-btn/favorite-btn.html',
    link: function(scope, element, attrs) {

      scope.select = () => {
        if (User.current) {
          if (scope.contact) {
            if (!User.current.favoritesContact) {
              User.current.favoritesContact = [];
            }
            if (!scope.contact.favoriters) {
              scope.contact.favoriters = [];
            }
            User.current.favoritesContact.push(scope.contact.name);
            scope.contact.favoriters.push(User.current.username);
            User.update({ q: {'username': User.current.username } }, User.current);
            Contact.edit({ q: {'name': scope.contact.name } }, scope.contact);
            $state.go($state.$current, null, { reload: true });
          } else if (scope.book) {
            if (!User.current.favoritesBook) {
              User.current.favoritesBook = [];
            }
            if (!scope.book.favoriters) {
              scope.book.favoriters = [];
            }
            User.current.favoritesBook.push(scope.book.title);
            scope.book.favoriters.push(User.current.username);
            User.update({ q: {'username': User.current.username } }, User.current);
            Book.edit({ q: {'title': scope.book.title } }, scope.book);
            $state.go($state.$current, null, { reload: true });
          } else {
            if (!User.current.favoritesArtist) {
              User.current.favoritesArtist = [];
            }
            if (!scope.artist.favoriters) {
              scope.artist.favoriters = [];
            }
            User.current.favoritesArtist.push(scope.artist.name);
            scope.artist.favoriters.push(User.current.username);
            User.update({ q: {'username': User.current.username } }, User.current);
            Artist.edit({ q: {'name': scope.artist.name } }, scope.artist);
            $state.go($state.$current, null, { reload: true });
          }
          scope.isFavorite = true;
        } else {
          $state.go('app.login');
        }
      }

      scope.unselect = () => {
        if (User.current) {
          if (scope.contact) {
            User.current.favoritesContact.splice(User.current.favoritesContact.indexOf(scope.contact.name), 1);
            scope.contact.favoriters.splice(scope.contact.favoriters.indexOf(User.current.username));
            User.update({ q: {'username': User.current.username } }, User.current);
            Contact.edit({ q: {'name': scope.contact.name } }, scope.contact);
            $state.go($state.$current, null, { reload: true });
          } else if (scope.book) {
            User.current.favoritesBook.splice(User.current.favoritesBook.indexOf(scope.book.title), 1);
            scope.book.favoriters.splice(scope.book.favoriters.indexOf(User.current.username));
            User.update({ q: {'username': User.current.username } }, User.current);
            Book.edit({ q: {'title': scope.book.title } }, scope.book);
            $state.go($state.$current, null, { reload: true });
          } else {
            User.current.favoritesArtist.splice(User.current.favoritesArtist.indexOf(scope.artist.name), 1);
            scope.artist.favoriters.splice(scope.artist.favoriters.indexOf(User.current.username));
            User.update({ q: {'username': User.current.username } }, User.current);
            Artist.edit({ q: {'name': scope.artist.name } }, scope.artist);
            $state.go($state.$current, null, { reload: true });
          }
          scope.isFavorite = false;
        } else {
          $state.go('app.login');
        }
      }

      //$timeout(scope.submit, 0);
    }
  };
};

export default FavoriteBtn;