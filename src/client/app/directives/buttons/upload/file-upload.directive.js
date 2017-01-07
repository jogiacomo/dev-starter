function fileUpload ($window, User, Contact, Artist, Article, Book, S3Upload) {
  'ngInject';
  var helper = {
    isFile: (item) => {
      return angular.isObject(item) && item instanceof $window.File;
    },
    isImage: (file) => {
      var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
      return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    }
  };

  return {
    restrict: 'EA',
    scope: {
      image: '=',
      article: '=',
      book: '=',
      artist: '=',
      contact: '='
    },
    templateUrl: 'directives/buttons/upload/upload.html',
    link: function(scope, element, attrs) {
      scope.files = null;
      scope.hasImg = false;

      if(User.current) {
        //$('.drop-box').hide();
        
        if (scope.article && scope.article.image) {
          scope.hasImg = true;
        } 
        else if (scope.artist && scope.artist.picture) {
          scope.hasImg = true;
        } 
        else if (scope.contact && scope.contact.image) {
          scope.hasImg = true;
        } 
        else if (scope.book && scope.book.image) {
          scope.hasImg = true;
        } else {
          scope.hasImg = false;
        }
        $('.uploaded-message').hide();
      } else {
        //$('.file-uploaded').show();
       // $('.drop-box').show();
       scope.hasImg = false;
       if (scope.article && scope.article.image) {
         scope.hasImg = true;
       } 
       else if (scope.artist && scope.artist.picture) {
         scope.hasImg = true;
       } 
       else if (scope.contact && scope.contact.image) {
         scope.hasImg = true;
       } 
       else if (scope.book && scope.book.image) {
         scope.hasImg = true;
       } else {
         scope.hasImg = false;
       }
        $('.uploaded-message').hide();
      }

      if (User.current) {
        if (!scope.article || !scope.book || !scope.contact || !scope.artist) {
          scope.hasImg = true;
        }
      }

      scope.fileChanged = function (element) {
        scope.files = element.files;
        scope.handleFiles(scope.files);
      };

      scope.select = () => {
        window.URL = window.URL || window.webkitURL;

        var fileSelect = document.getElementById("fileSelect"),
            fileElem = document.getElementById("fileElem"),
            fileList = document.getElementById("fileList");

        if(fileElem) {
          fileElem.click();
        }
      };

      scope.handleFiles = (files) => {
        if (!files.length) {
          this.fileList.innerHTML = "<p>No files selected!</p>";
        } else if (files.length === 1) {
            var div = document.getElementById("upload_div");
            var img = document.createElement("img");
            var att = document.createAttribute("class"); 
            var style = document.createAttribute("style"); 
            att.value = 'ui medium bordered image file-to-uploaded';
            style.value = "width:200px;height:225px;"
            img.setAttributeNode(att);
            img.setAttributeNode(style);
            img.src = window.URL.createObjectURL(files[0]);
            
            img.onload = function() {
              window.URL.revokeObjectURL(this.src);
            }
            div.appendChild(img);

            /*if (User.current && User.current.image) {
              $('.file-uploaded').hide();
            }*/
            
            $('.drop-box').hide();
            $('#fileSelect').toggleClass('disabled');
            $('#fileUpload').toggleClass('disabled', false);
            $('#fileCancel').toggleClass('disabled', false);
        }
        else {
          this.fileList.innerHTML = "";
          var list = document.createElement("ul");
          this.fileList.appendChild(list);
          for (var i = 0; i < files.length; i++) {
            var li = document.createElement("li");
            list.appendChild(li);
            
            var img = document.createElement("img");
            img.src = window.URL.createObjectURL(files[i]);
            img.height = 60;
            img.onload = function() {
              window.URL.revokeObjectURL(this.src);
            }
            li.appendChild(img);
            var info = document.createElement("span");
            info.innerHTML = files[i].name + ": " + files[i].size + " bytes";
            li.appendChild(info);
          }
        }
      };

      scope.uploadPicture = () => {
        S3Upload.upload(scope.files[0])
        .then(() => {
         // User.current.image = 'https://s3-us-west-2.amazonaws.com/g2skit.com/'+ scope.files[0].name;
          localStorage.setItem('image', JSON.stringify('https://s3-us-west-2.amazonaws.com/g2skit.com/'+ scope.files[0].name));
          $('.uploaded-message').show();
          $('#fileSelect').toggleClass('disabled', false);
          $('#fileUpload').toggleClass('disabled');
          $('#fileCancel').toggleClass('disabled');
        });
        
      };

      scope.cancelUpload = () => {
        if (User.current.image) {
         // $('.file-uploaded').show();
          $('.file-to-uploaded').remove();
        } /*else {
          $('.drop-box').show();
        }*/
        $('.uploaded-message').hide();
        //$('.ui.medium.bordered.image').remove();
        $('#fileSelect').toggleClass('disabled', false);
        $('#fileUpload').toggleClass('disabled');
        $('#fileCancel').toggleClass('disabled');
        localStorage.removeItem('profile-upload');
      };

    }
  };
};

export default fileUpload;
