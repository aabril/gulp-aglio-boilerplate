var gulp  = require('gulp');
var aglio = require('gulp-aglio');

gulp.task('compile_blueprints', function(){
    gulp
    .src('blueprints/*.md')
    .pipe(aglio({ template: 'default'}))
    .pipe(gulp.dest('public'));
});

gulp.task('default', ['compile_blueprints']);
