var HtmlReporter = require('protractor-html-screenshot-reporter');
var reporter=new HtmlReporter({
    baseDirectory: './e2e-results', // a location to store screen shots.
    docTitle: 'Descubre Zaragoza e2e',
    docName:    'integration-report.html'
});

exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    '*.js'
  ],


  onPrepare: function() {
        jasmine.getEnv().addReporter(reporter);
  },

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8000/app/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
