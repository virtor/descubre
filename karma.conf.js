module.exports = function(config) {
    config.set({

        basePath: './',

        files: [
            'app/bower_components/jquery/dist/jquery.js',
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-mocks/angular-mocks.js',

            'app/bower_components/angular-animate/angular-animate.js',
            'app/bower_components/angular-aria/angular-aria.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-sanitize/angular-sanitize.js',
            'app/bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',
            'app/bower_components/angular-material/angular-material.js',
            'app/bower_components/hammerjs/hammer.js',
            'app/js/mensajes.js',
            'app/app.js',
            'app/index*/**/*.js',
            'app/buscar*/**/*.js',
            'app/facet*/**/*.js',
            'app/sector*/**/*.js',
            'app/js/version*/**/*.js',
            'app/js/services.js',
            'app/js/directives.js',
            'app/js/filters.js',
            'app/bower_components/leaflet/dist/leaflet.js',
            'app/bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
