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

describe("Unavailable Stores", () => {
  context("Desktop", () => {
    beforeEach(function () {
      cy.viewport(Cypress.env("desktop"));
      cy.visit("/");
    });

    //TODO: Bug 2863: "Opens at" label is not appearing in restaurant card for closed restaurants
    it(["Bug"],"Test Case 938: Check closed stores", () => {
      handoffPage.mockAllClosedRestaurants();
      cy.visit("/");
      handoffPage.searchForLocation(validAddress);
      handoffPage.restaurantHours().should("contain", "Opens at");
      handoffPage.cardRestaurant(restaurantName).click();
      handoffPage.startOrderButton().click();
      handoffPage.proceedAnywayButton().should("exist");
      handoffPage.changeLocationButton().should("exist");
      handoffPage.proceedAnywayButton().click();
      cy.url().should("contain", "/zippys-restaurants-sandbox-demo-vendor");
      cy.visit("/");
      handoffPage.searchForLocation(validAddress);
      handoffPage.cardRestaurant(restaurantName).click();
      handoffPage.startOrderButton().click();
      handoffPage.changeLocationButton().click();
      handoffPage.cardRestaurant(restaurantName).should("exist");
    });

    it("Test Case 940: Check unavailable stores", () => {
      handoffPage.mockAllUnavailableRestaurants();
      cy.visit("/");
      handoffPage.searchForLocation(validAddress);
      handoffPage
        .cardRestaurant(restaurantName)
        .should("have.css", "pointer-events", "none");
      handoffPage.unavailableCardRestaurant().should("exist");
    });
  });

  context("Mobile", () => {
    beforeEach(() => {
      cy.viewport(Cypress.env("mobile"));
      cy.visit("/");
      cy.wait(500);
    });

    //TODO: Bug 2863: "Opens at" label is not appearing in restaurant card for closed restaurants
    it(["Bug"],"Test Case 1466: Check closed stores - mobile", () => {
      handoffPage.mockAllClosedRestaurants();
      cy.visit("/");
      handoffPage.searchForLocation(validAddress);
      handoffPage.restaurantHours().should("contain", "Opens at");
      handoffPage.cardRestaurant(restaurantName).click();
      handoffPage.startOrderButton().click();
      handoffPage.proceedAnywayButton().should("exist");
      handoffPage.changeLocationButton().should("exist");
      handoffPage.proceedAnywayButton().click();
      cy.url().should("contain", "/zippys-restaurants-sandbox-demo-vendor");
      cy.visit("/");
      handoffPage.searchForLocation(validAddress);
      handoffPage.cardRestaurant(restaurantName).click();
      handoffPage.startOrderButton().click();
      handoffPage.changeLocationButton().click();
      handoffPage.cardRestaurant(restaurantName).should("exist");
    });

    it("Test Case 1467: Check unavailable stores - mobile", () => {
      handoffPage.mockAllUnavailableRestaurants();
      cy.visit("/");
      handoffPage.searchForLocation(validAddress);
      handoffPage
        .cardRestaurant(restaurantName)
        .should("have.css", "pointer-events", "none");
      handoffPage.unavailableCardRestaurant().should("exist");
    });
  });
});
