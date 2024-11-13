import './commands'
import 'cypress-axe'


module.exports = (on, config) => {
  config = cypressBrowserPermissionsPlugin(on, config)
  return config
}

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})