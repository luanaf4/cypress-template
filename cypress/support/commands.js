// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// import 'cypress-file-upload'

// Cypress.Commands.add('uploadMultiple', ({localPaths = [], fileNames = [], mimeType = 'image/png'}) => {
//     const fixtures = (paths) => Promise.all(paths.map(p => cy.fixture(p)))
//     const encoding = 'base64'
   
//     fixtures(localPaths).then(filesContents => {
//       const payload = fileNames.map((fileName, i) => (
//         {
//           fileContent: filesContents[i],
//           fileName,
//           encoding,
//           mimeType
//         }))
//       cy.get('input[type="file"]')
//       .attachFile(payload) 
//     })
//    })
import 'cypress-plugin-tab'