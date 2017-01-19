const gulp = require('gulp');
const { exec } = require('child_process');
const del = require('del');

gulp.task('clean', () => del(['dist/inline_plugin/**/*', 'npm-debug.log']));

gulp.task('chown', (done) => {
    exec("ls -l dist/ | awk '{print $3}' | tail -n -1", (err, stdout) => {
        if (stdout.trim() === process.env.USER) {
            done();
            return;
        }
        exec(`sudo chown -R ${process.env.USER} dist/`, () => {
            done();
        });
    });
});

gulp.task('static', () => (
    gulp.src('./src/**/*')
    .pipe(gulp.dest('./dist/inline_plugin'))
));

gulp.task('default', gulp.series('chown', 'clean', 'static', () => {
    gulp.watch('./src', gulp.series('static'));
}));
