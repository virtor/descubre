var HtmlReporter = require('protractor-html-screenshot-reporter');
var reporter = new HtmlReporter({
    baseDirectory: './e2e-results', // a location to store screen shots.
    docTitle: 'Descubre Zaragoza e2e',
    docName: 'integration-report.html'
});

exports.config = {
    allScriptsTimeout: 11000,

    specs: [
        '*.js'
    ],


    onPrepare: function() {
        jasmine.getEnv().addReporter(reporter);
    },

    multiCapabilities: [{
        'browserName': 'firefox',
    }, {
        'browserName': 'chrome'
    }, {
        'browserName': 'chrome',
        'browserVersion': 'mobile',
        'chromeOptions': {
            args: [
                '--window-size=350,650'
            ]
        }
    }],
    baseUrl: 'http://localhost:8000/app/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};
