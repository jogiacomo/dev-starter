var gulp          = require('gulp');
var path          = require('path');
var less          = require('gulp-less');
var notify        = require('gulp-notify');
var source        = require('vinyl-source-stream');
var gulpCopy      = require('gulp-copy');
var browserify    = require('browserify');
var babelify      = require('babelify');
var ngAnnotate    = require('browserify-ngannotate');
var browserSync   = require('browser-sync').create();
var rename        = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var uglify        = require('gulp-uglify');
var stringify     = require('stringify');
var merge         = require('merge-stream');
var template      = require('gulp-template');
var yargs         = require('yargs');

// Where our files are located
var jsFiles   = "src/client/app/**/*.js";
var viewFiles = "src/client/app/**/*.html";
var cssFiles =  "src/client/styles/**/*.less";

var allFiles = ["src/**/*.js", "!(src/client/app/**/*.spec.js)"]

var clientApp = "src/client/app/";
var assets = clientApp + "assets";
var styles = "src/client/styles/components";

var ionic = "src/mobile/ionic/";
var onsen = "src/mobile/onsenui/";

var viewIonic = "src/client/app/assets/ionic/**/*.html";
var viewOnsen = "src/client/app/assets/onsenui/**/*.html";

var nodeModules = "node_modules/";

//Variables
var name = yargs.argv.name;
var parentPath = yargs.argv.parent || '';
var route = yargs.argv.route || 'components';
//var route = !!yargs.argv.route;

var paths = {
  blankComponents: path.join(__dirname, 'generator', 'component/**/*.**'),
  blankTemplates: path.join(__dirname, 'generator', 'template/**/*.**'),
  blankStyles: path.join(__dirname, 'generator', 'style/**/*.**'),
  blankModules: path.join(__dirname, 'generator', 'module/**/*.**'),
  blankServices: path.join(__dirname, 'generator', 'service/**/*.**'),
  blankDirectives: path.join(__dirname, 'generator', 'directive/**/*.**'),
}


var resolveToApp = (glob) => {
  return path.join(clientApp, '', glob); // app/{glob}
};

var resolveToTemplates = (glob) => {
  return path.join(assets, '', glob); // app/assets/{glob}
};

var resolveToStyles = (glob) => {
  return path.join(styles, '', glob); //client/sass{glob}
};

/**
 * Change temp name containing '-' char
 * @param {String} val - value of the temp name
 */
var changeVal = (val) => {
  if (val.includes('-')) {
    return val.slice(0, val.indexOf('-')) + cap(val.substr(val.indexOf('-') + 1));
  }
  return val;
};

/**
 * Set temp name containing '-' char to parent name
 * @param {String} val - value of the temp name
 */
var SetToParentVal = (val) => {
  if (val.includes('-')) {
    return val.slice(0, val.indexOf('-'));
  }
  return val;
};

/**
 * Change temp name containing '-' char
 * @param {String} val - value of the temp name
 */
var componentPath = (val) => {
  val = '';
  return val;
};

/**
 * Set temp name to upcase
 * @param {String} val - value of the temp name
 */
var cap = (val) => {
  if (val.includes('-')) {
    var newVal = val.charAt(0).toUpperCase() + val.slice(1);
    return changeVal(newVal);
  }
  return val.charAt(0).toUpperCase() + val.slice(1);
};

/**
 * Create module and copy files into clientApp/modules
 */
var generateModule = () => {
  var destPathModule = path.join(resolveToApp('modules'), '', name);
  
  gulp.src(paths.blankModules)
    .pipe(template({
      name: name,
      upCaseName: cap(name)
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', name);
      console.log('Enter in module');
    }))
    .pipe(gulp.dest(destPathModule));
};

/**
 * Create Service and copy files into clientApp/services
 */
var generateService = () => {
  var destPathService = path.join(resolveToApp('services'), '', '');
  gulp.src(paths.blankServices)
    .pipe(template({
      name: name,
      upCaseName: cap(name)
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPathService));
};

/**
 * Create component and copy files into clientApp/components/componentName
 */
var generateComponent = () => {
  var destPathComponent = path.join(resolveToApp(route), parentPath, name);
  gulp.src(paths.blankComponents)
    .pipe(template({
      name: name,
      upCaseName: cap(name),
      parent: parentPath,
      route: route
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPathComponent));
};

/**
 * Create Directive and copy files into clientApp/directives
 */
var generateDirective = () => {
  var destPathDirective = path.join(resolveToApp('directives'), parentPath, name);
  gulp.src(paths.blankDirectives)
    .pipe(template({
      name: name,
      upCaseName: cap(name),
      parent: parentPath
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPathDirective));
};

/**
 * Create templates and copy files into mobile assets directory (assets/ionic etc...)
 * @param {String} dir - mobile path filename (ionic or onsenui)
 */
var generateTemplate = (dir) => {
  var destPathTemplate = path.join(resolveToTemplates(dir + '/templates'), '', name);
  gulp.src(paths.blankTemplates)
    .pipe(template({
      name: name
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPathTemplate));
};

/**
 * Create stylesheets and copy files into client/sass/components
 */
var generateStyle = () => {
  var destPathStyle = path.join(resolveToStyles('components'), '', '');
  gulp.src(paths.blankStyles)
    .pipe(template({
      name: name
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', '_'+name);
    }))
    .pipe(gulp.dest(destPathStyle));
};

var copyHtml = (source, output) => {
  return gulp.src(source)
        .on('error', interceptErrors)
        .pipe(gulp.dest(output));
}

var buildFile = (source, output) => {
  return gulp.src([source])
        .on('error', interceptErrors)
        .pipe(gulp.dest(output));
}

var interceptErrors = function(error) {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  console.log('Error at :' + error);
  // Keep gulp from hanging on this task
  this.emit('end');
};

/**
 * This task generate modules, styles with ionic, onsenui templates
 */
gulp.task('module', () => {
  generateModule();
  generateTemplate('onsenui');
  generateTemplate('ionic');
  generateStyle();
});

/**
 * This task generate service web
 */
gulp.task('service', () => {
  generateService();
});

/**
 * This task generate components web
 */
gulp.task('component', () => {
  generateComponent();
});

/**
 * This task generate directives
 */
gulp.task('directive', () => {
  generateDirective();
});


gulp.task('browserify', ['views'], function() {
  return browserify('./src/client/app/app.js')
      .transform(babelify, {presets: ["es2015"]})
      .transform(ngAnnotate)
      .transform(stringify, {
        appliesTo: { extensions: ['.html'] },
        minify: true,
        global: true
      })
      .bundle()
      .on('error', interceptErrors)
      //Pass desired output filename to vinyl-source-stream
      .pipe(source('main.js'))
      // Start piping stream to tasks!
      .pipe(gulp.dest('./build/'));
});

gulp.task('browserify-ionic', ['ionic-views'], function() {
  return browserify('./src/client/app/app.js')
      .transform(babelify, {presets: ["es2015"]})
      .transform(ngAnnotate)
      .transform(stringify, {
        appliesTo: { extensions: ['.html'] },
        minify: true,
        global: true
      })
      .bundle()
      .on('error', interceptErrors)
      //Pass desired output filename to vinyl-source-stream
      .pipe(source('main.js'))
      // Start piping stream to tasks!
      .pipe(gulp.dest('./src/mobile/ionic/www/'));
});

gulp.task('mobile-build', function () {
  buildFile('build/main.js', ionic + 'www');
  buildFile('build/main.js', onsen + 'www');
});

gulp.task('html', function() {
  return gulp.src("src/client/index.html")
      .on('error', interceptErrors)
      .pipe(gulp.dest('./build/'));
});

gulp.task('less', function () {
  return gulp.src(cssFiles)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./build/styles'));
});

gulp.task('views', function() {
  return gulp.src(viewFiles)
      .pipe(templateCache({
        standalone: true
      }))
      .on('error', interceptErrors)
      .pipe(rename("app.templates.js"))
      .pipe(gulp.dest('./src/client/app/common/'));
});

gulp.task('ionic-views', function() {
  return gulp.src(viewIonic)
      .pipe(templateCache({
        standalone: true
      }))
      .on('error', interceptErrors)
      .pipe(rename("app.templates.js"))
      .pipe(gulp.dest('./src/client/app/common/'));
});

gulp.task('mobile-html', function() {
  copyHtml('src/client/app/assets/ionic/modules/*', ionic + 'www/modules');
  copyHtml('src/client/app/assets/onsenui/templates/*', onsen + 'www/modules');
});


// This task is used for building production ready
// minified JS/CSS files into the dist/ folder
gulp.task('build', ['html', 'less', 'browserify'], function() {
  var html = gulp.src("build/index.html")
                 .pipe(gulp.dest('./dist/'));

  var js = gulp.src("build/main.js")
               .pipe(uglify())
               .pipe(gulp.dest('./dist/'));

  return merge(html,js);
});

gulp.task('default', ['html', 'less', 'browserify'], function() {

  browserSync.init(['./build/**/**.**'], {
    server: "./build",
    port: 4000,
    notify: false,
    ui: {
      port: 4001
    }
  });

  gulp.watch("src/index.html", ['html', 'mobile-html']);
  gulp.watch(cssFiles, ['less']);
  gulp.watch(viewFiles, ['views']);
  gulp.watch(jsFiles, ['browserify']);
});

gulp.task('ionic', ['browserify-ionic'], function() {

  browserSync.init(['./src/mobile/ionic/www/**/**.**'], {
    server: "./src/mobile/ionic/www",
    port: 5000,
    notify: false,
    ui: {
      port: 5001
    }
  });
  gulp.watch("src/index.html", ['mobile-html']);
  gulp.watch(jsFiles, ['browserify-ionic']);
});

