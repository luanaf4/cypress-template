//Import all necessary pages here
import CommonPage from "../pages/CommonPage";

//Declare all pages here
const handoffPage = new HandoffPage();
const commonPage = new CommonPage();
const checkoutPage = new CheckoutPage();

describe("Feature name here", () => {

  context("Desktop", () => { 
    beforeEach(() => {
        cy.viewport(Cypress.env("desktop"));
        cy.visit("/");
        cy.wait(500);
    });

    it("Test Case XXX: Feature - Verify ...", () => {
        //page.methodOrElement().click().type('xxx')
        //page.methodOrElement().click().type('xxx')
    });

  });


  context("Mobile", () => { 
    beforeEach(() => {
        cy.viewport(Cypress.env("mobile"));
        cy.visit("/");
        cy.wait(500);
    });
    
    it("Test Case XXX: Feature - Verify ...", () => {
        //page.methodOrElement().click().type('xxx')
        //page.methodOrElement().click().type('xxx')
    });
    
  });

});
