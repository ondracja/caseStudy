const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 1400,
  viewportWidth: 1920,
  video: false,
  e2e: {
    baseUrl: 'https://revolgy-forms-case-study-master.staging.axiory.com/jp/registration/demo',
    setupNodeEvents (on, config) {
    }
  }
})
