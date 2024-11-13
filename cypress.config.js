const { defineConfig } = require("cypress");
const fs = require("fs");
const { pa11y } = require("@cypress-audit/pa11y");
const {tagify} = require('cypress-tags')
const {
  cypressBrowserPermissionsPlugin,
} = require("cypress-browser-permissions");

module.exports = {
  projectId: "x9s98o",
  reporter: "junit",
  defaultCommandTimeout: 10000,
  defaultBrowser: "chrome",
  reporterOptions: {
    mochaFile: "results/my-test-output-[hash].xml",
    toConsole: true,
  },
  retries: {
    runMode: 1,
    openMode: 1,
  },

  env: {
    mobileViewportWidthBreakpoint: 414,
    mobile: "iphone-xr",
    desktop: "macbook-15",

    microsoft_username: "email@provider.com",
    microsoft_password: "password123",
    microsoft_name: "QA",

    browserPermissions: {
      // notifications: "allow",
      geolocation: "block",
      // camera: "block",
      // microphone: "block",
      // images: "allow",
      // javascript: "allow",
      // popups: "ask",
      // plugins: "ask",
      // cookies: "allow"
    },
  },
  experimentalWebKitSupport: true,
  video: false,
  screenshotOnRunFailure: false,

  // Configure the JUnit reporter
  junit: {
    reporterEnabled: true,
    mochaFile: "cypress/reports/junit/test-results.xml",
    toConsole: true,
  },

  experimentalStudio: true,
  chromeWebSecurity: false,
  watchForFileChanges: false,
  //cacheAcrossSpecs: true,

  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', tagify(config));
      config = cypressBrowserPermissionsPlugin(on, config);
      return config;
    },
    experimentalModifyObstructiveThirdPartyCode: true,
    experimentalSessionAndOrigin: true,
    experimentalOriginDependencies: true,
    baseUrl: "https://dev-zippys-web.azurewebsites.net",
  },
};
