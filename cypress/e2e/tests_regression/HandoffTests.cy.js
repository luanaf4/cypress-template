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

describe("Handoff", () => {
  context("Desktop", () => {
    beforeEach(function () {
      handoffPage.mockAllAvailableRestaurants();
      cy.viewport(Cypress.env("desktop"));
      cy.visit("/");
    });
    
    it("Test Case 2688: Handoff - Verify valid delivery search", () => {
      handoffPage.deliveryOption().click()
      handoffPage.searchForLocation(validAddress)
      handoffPage.startOrderButton().should("be.visible")
    });
  
    it("Test Case 2689: Handoff - Verify invalid delivery search", () => {
      handoffPage.deliveryOption().click()
      handoffPage.searchForLocation(invalidAddress)
      handoffPage.deliveryAvailableMessageTitle().should("contain", "DELIVERY IS NOT AVAILABLE")
    });

    it("Test Case 2687: Handoff - Verify valid pickup search", () => {
      handoffPage.pickupOption().click()
      handoffPage.searchForLocation(validAddress)
      handoffPage.startOrderButton().should("be.visible")
    });

    it("Test Case 2690: Handoff - Verify invalid pickup search", () => {
      handoffPage.pickupOption().click()
      handoffPage.searchForLocation(invalidAddress)
      handoffPage.deliveryAvailableMessageTitle().should("contain", "PICKUP IS NOT AVAILABLE")
    });
  });

  context("Mobile", () => {
    beforeEach(() => {
      handoffPage.mockAllAvailableRestaurants();
      cy.viewport(Cypress.env("mobile"));
      cy.visit("/");
      cy.wait(500);
    });

    it("Test Case 2688: Handoff - Verify valid delivery search", () => {
      handoffPage.deliveryOption().click()
      handoffPage.searchForLocation(validAddress)
      handoffPage.startOrderButton().should("be.visible")
    });

    it("Test Case 2689: Handoff - Verify invalid delivery search", () => {
      handoffPage.deliveryOption().click()
      handoffPage.searchForLocation(invalidAddress)
      handoffPage.deliveryAvailableMessageTitle().should("contain", "DELIVERY IS NOT AVAILABLE")
    });

    it("Test Case 2687: Handoff - Verify valid pickup search", () => {
      handoffPage.pickupOption().click()
      handoffPage.searchForLocation(validAddress)
      handoffPage.startOrderButton().should("be.visible")
    });

    it("Test Case 2690: Handoff - Verify invalid pickup search", () => {
      handoffPage.pickupOption().click()
      handoffPage.searchForLocation(invalidAddress)
      handoffPage.deliveryAvailableMessageTitle().should("contain", "PICKUP IS NOT AVAILABLE")
    });
  });
});
