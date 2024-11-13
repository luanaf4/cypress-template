import CommonPage from "../pages/CommonPage";
import HandoffPage from "../pages/HandoffPage";
import CheckoutPage from "../pages/CheckoutPage";
import MenuPage from "../pages/MenuPage";
import ChangeHandoffModalPage from "../pages/ChangeHandoffModalPage";

const handoffPage = new HandoffPage();
const commonPage = new CommonPage();
const checkoutPage = new CheckoutPage();
const menuPage = new MenuPage();
const changeHandoffModalPage = new ChangeHandoffModalPage();
const dataPage = require("../pages/DataPage");

const restaurantName = dataPage.restaurant.validRestaurantName;
const validAddress = dataPage.delivery.validDeliveryAddress;
const validShortAddress = dataPage.delivery.validDeliveryShortAddress;
const invalidAddress = dataPage.delivery.invalidDeliveryAddress;
const addressDescription = dataPage.delivery.addressDescription;

describe("NavBar", () => {
  context("Desktop", () => {
    beforeEach(function () {
      handoffPage.mockAllAvailableRestaurants();
      cy.viewport(Cypress.env("desktop"));
      cy.visit("/");
    });
    
    it("Test Case 2686: Navbar - Verify Navbar navigation", () => {
        commonPage.aboutZippys().should("be.visible")
        commonPage.logIn().should("be.visible")
        commonPage.logoZippys().should("be.visible")
        commonPage.navbarCart().should("be.visible")
        commonPage.signUp().should("be.visible")
    });
  
    
  });

  context("Mobile", () => {
    beforeEach(() => {
      handoffPage.mockAllAvailableRestaurants();
      cy.viewport(Cypress.env("mobile"));
      cy.visit("/");
      cy.wait(500);
    });

    it("Test Case 2686: Navbar - Verify Navbar navigation", () => {
        commonPage.logoZippys().should("be.visible")
        commonPage.navbarCart().should("be.visible")
        commonPage.hamburgerMenuButton().should("be.visible")
    });
  });
});
