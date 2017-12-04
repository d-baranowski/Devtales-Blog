"use strict";

// References: define our package references and also our directory paths.
const gulp = require("gulp"),
    sass = require("gulp-sass"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    streamify = require('gulp-streamify'),
    plumber = require('gulp-plumber'),
    sourcemaps = require("gulp-sourcemaps");


const paths = {
    resources : '../resources/static/',
    testResources: '../../test/resources/static/'
};

paths.serverBundleDest = '../' + paths.resources + 'js/server-bundle.js';
paths.clientBundleDest = '../' + paths.resources + 'js/bundle.js';
paths.adminBundleDest = '../' + paths.resources + 'js/admin-bundle.js';


// CSS Bundle: Gulp watch is placed on all sass files in the 'Styles' folder. If a sass file changes the "global-bundle:css" task is ran.
// This task has a dependancy task of "compile:sass" this will be ran first before "global-bundle:css".
// Once the sass has been compiled it will be output a css file to './wwwroot/css/global-bundle'
// Next the "global-bundle:css" task is ran, this will get all files in './wwwroot/css/global-bundle' and concat them into one file named 'global-bundle.css'
// the next step is to create a minified version of the file named 'global-bundle.min.css' and save to './wwwroot/css/'
gulp.task("css", ["compile:sass"], () => {
    const autoprefixer = require('autoprefixer');
    const postcss = require('gulp-postcss');

    return gulp.src(paths.resources + 'css/main.css')
        .pipe(plumber())
        .pipe(concat(paths.resources + 'css/main.css'))
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest("."))
        .pipe(concat(paths.resources + '/css/main.css'))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("copy-css-from-modules", () => {
    return gulp.src('./node_modules/draft-js/dist/Draft.css').pipe(gulp.dest(paths.resources + 'css'))
});

gulp.task("compile:sass", () => {
    return gulp.src(['./app/styles/main.scss', './app/styles/admin.scss'])
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest(paths.resources + 'css/'));
});

//TODO add tests task for unit testing js code. Use Mocha and React Test utils.

gulp.task("lint", () => { //Lint is a code quality checker for java script. Lint rules can be configured in .eslintrc.js in root of project.
    const eslint = require('gulp-eslint');

    return gulp.src(["app\**\*.js", "!node_modules/**"])
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

const renderReact = (entryFile, outputFile, standalone) =>{
    const browserify = require("browserify"); //Understands old school require('...') imports and converts them to something that browsers can use
    const babelify = require("babelify"); //Babel understands react jsx and es6 and translates that into something that browsers understand.
    const source = require('vinyl-source-stream'); //Use conventional text streams at the start of pipeline making for nicer interoperability with the existing npm stream ecosystem.
    const buffer = require('vinyl-buffer'); //Allows to pipe to vinyl streams.

    const options = { //Resolve all import statements and bundle the files.
        entries: entryFile, //Entrypoint to the application.
        debug: true,
        transform: [babelify.configure({
            plugins: ["transform-class-properties"],
            presets: ['stage-2', 'es2015', 'react'] //Browserivy does not understand JSX and ES6 so we need to use transformers to translate our code before bundling.
        })]
    };

    if (standalone) {
        options["standalone"] = standalone;
    }

    const bundler = browserify(options);

    return bundler.bundle() //Grab our bundle
        .pipe(plumber())
        .pipe(source(outputFile)) //Name of file once done
        .pipe(buffer()) //Use vinyl buffer
        .pipe(sourcemaps.init({ loadMaps: true })) //Initialise sourcemaps.
        //.pipe(streamify(uglify())) //Minify and uglify the code.
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('js'));
};

gulp.task('reactify', ['react-compilation-server', 'react-compilation-client', 'react-compilation-admin']);

gulp.task('react-compilation-admin', ['lint'], () => { //Lint task is a prerequisite to this task.
    return renderReact('./app/admin.js', paths.adminBundleDest);
});

gulp.task('react-compilation-server', ['lint'], () => { //Lint task is a prerequisite to this task.
    return renderReact('./app/server.js', paths.serverBundleDest, 'MyApp');
});

gulp.task('react-compilation-client', ['lint'], () => { //Lint task is a prerequisite to this task.
    return renderReact('./app/index.js', paths.clientBundleDest);
});

gulp.task("watch", () => {
    gulp.watch('app/styles/*.scss', ["css"]);
    gulp.watch('app/**/*.js', ["reactify"]);
});