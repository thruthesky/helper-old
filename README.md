# helper
House helper app

# TODO

## don't move when home button clicked if the user is at home already.


## Put back button on top left. "<-"

Ionic 2's natural navigation is to use "<-" back button.

But somehow it disappeared.

put it back.


# INSTALLATION

## replace app folder with http://github.com/thruthesk/helper

## gulp automation

    ...
    gulp.task('watch', ['clean'], function(done){
    runSequence(
        ['assets', 'sass', 'html', 'fonts', 'scripts'],
        function(){
        ...
        gulpWatch('app/assets/i18n/*.json', function(){ gulp.start('assets'); });
        ....
        }
    );
    });

    gulp.task('build', ['clean'], function(done){
    runSequence(
        ['assets', 'sass', 'html', 'fonts', 'scripts'],
        ….
    });

    gulp.task("assets", function() {
        return gulp.src(["app/assets/i18n/*"])
            .pipe(gulp.dest("www/assets/i18n"));
    });


    gulp.task('sass', buildSass);
    ...


## ..
