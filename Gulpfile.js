var gulp  = require('gulp');
var aglio = require('gulp-aglio');
var path  = require("path");
var serveIndex = require('serve-index');

var server = {
    port: 4000,
    livereloadPort: 35729,
    basePath: path.join(__dirname, "public"),
    _lr: null,
    start: function() {
        var express = require('express');
        var app = express();
        app.use(require('connect-livereload')());
        app.use(express.static(this.basePath));
        app.use('/', serveIndex(this.basePath,{'icons':true}));
        app.listen(this.port);
    },
    livereload: function() {
        this._lr = require('tiny-lr')();
        this._lr.listen(this.livereloadPort);
    },
    livestart: function() {
        this.start();
        this.livereload();
    },
    notify: function(event) {
        var fileName = path.relative(this.basePath, event.path);

        this._lr.changed({
          body: {
            files: [fileName]
          }
        });
    }
};

gulp.task('launch_server', function(){
  server.livestart();

  gulp.watch('blueprints/*.md', ['compile_blueprints']);

  gulp.watch("public/*.html", function(event) {
    //ToDo: launch compile_blueprints
    server.notify(event);
  });
});


gulp.task('compile_blueprints', function(){
    gulp
    .src('blueprints/*.md')
    .pipe(aglio({ template: 'default'}))
    .pipe(gulp.dest('public'));
});

gulp.task('default', ['compile_blueprints', 'launch_server']);
