function LikeBtn (Article, Contact, Artist, Book, User, $state) {
  'ngInject';

  return {
    restrict: 'EA',
    scope: {
      buttonList: '=',
      buttonView: '=',
      counter: '=',
      isLiked: '=',
      article: '=',
      contact: '=',
      artist: '=',
      book: '='
    },
    templateUrl: 'directives/buttons/like-btn/like-btn.html',
    link: function(scope, element, attrs) {

      scope.like = () => {
        if (User.current) {
          if (scope.contact) {
            if (!User.current.contactsLiked) {
              User.current.contactsLiked = [];
            }
            if (!scope.contact.likers) {
              scope.contact.likers = [];
            }
            delete scope.contact.isLiked;
            User.current.contactsLiked.push(scope.contact.name);
            scope.contact.likers.push(User.current.username);
            Contact.edit({ q: {'name': scope.contact.name } }, scope.contact);
            scope.counter = scope.contact.likers.length;
          } else if (scope.artist) {
            if (!User.current.artistsLiked) {
              User.current.artistsLiked = [];
            }
            if (!scope.artist.likers) {
              scope.artist.likers = [];
            }
            delete scope.artist.isLiked;
            User.current.artistsLiked.push(scope.artist.name);
            scope.artist.likers.push(User.current.username);
            Artist.edit({ q: {'name': scope.artist.name } }, scope.artist);
            scope.counter = scope.artist.likers.length;
          } else if (scope.book) {
            if (!User.current.booksLiked) {
              User.current.booksLiked = [];
            }
            if (!scope.book.likers) {
              scope.book.likers = [];
            }
            delete scope.book.isLiked;
            User.current.booksLiked.push(scope.book.title);
            scope.book.likers.push(User.current.username);
            Book.edit({ q: {'title': scope.book.title } }, scope.book);
            scope.counter = scope.book.likers.length;
          } else {
            if (!User.current.articlesLiked) {
              User.current.articlesLiked = [];
            }
            if (!scope.article.likers) {
              scope.article.likers = [];
            }
            delete scope.article.isLiked;
            User.current.articlesLiked.push(scope.article.name);
            scope.article.likers.push(User.current.username);
            Article.edit({ q: {'name': scope.article.name } }, scope.article);
            scope.counter = scope.article.likers.length;
          }
          User.update({ q: {'username': User.current.username } }, User.current);
          $state.go($state.$current, null, { reload: true });
          scope.isLiked = true;
        } else {
          $state.go('app.login');
        }
      }

      scope.unlike = () => {
        if (User.current) {
          if (scope.contact) {
            delete scope.contact.isLiked;
            User.current.contactsLiked.splice(User.current.contactsLiked.indexOf(scope.contact.name), 1);
            scope.contact.likers.splice(scope.contact.likers.indexOf(User.current.username), 1);
            Contact.edit({ q: {'name': scope.contact.name } }, scope.contact);
            scope.counter = scope.contact.likers.length;
          } else if (scope.artist) {
            delete scope.artist.isLiked;
            User.current.artistsLiked.splice(User.current.artistsLiked.indexOf(scope.artist.name), 1);
            scope.artist.likers.splice(scope.artist.likers.indexOf(User.current.username), 1);
            Artist.edit({ q: {'name': scope.artist.name } }, scope.artist);
            scope.counter = scope.artist.likers.length;
          } else if (scope.book) {
            delete scope.book.isLiked;
            User.current.booksLiked.splice(User.current.booksLiked.indexOf(scope.book.title), 1);
            scope.book.likers.splice(scope.book.likers.indexOf(User.current.username), 1);
            Book.edit({ q: {'title': scope.book.title } }, scope.book);
            scope.counter = scope.book.likers.length;
          } else {
            delete scope.article.isLiked;
            User.current.articlesLiked.splice(User.current.articlesLiked.indexOf(scope.article.name), 1);
            scope.article.likers.splice(scope.article.likers.indexOf(User.current.username), 1);
            Article.edit({ q: {'name': scope.article.name } }, scope.article);
            scope.counter = scope.article.likers.length;
          }
          User.update({ q: {'username': User.current.username } }, User.current);
          $state.go($state.$current, null, { reload: true });
          scope.isLiked = false;
        } else {
          $state.go('app.login');
        }
      }
    }
  };
};

export default LikeBtn;
