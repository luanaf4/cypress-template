import CommonPage from "../pages/CommonPage";
import HandoffPage from "../pages/HandoffPage";
import CheckoutPage from "../pages/CheckoutPage";
import MenuPage from "../pages/MenuPage";
import ChangeHandoffModalPage from "../pages/ChangeHandoffModalPage";
import OrderConfirmationPage from "../pages/OrderConfirmationPage";

const handoffPage = new HandoffPage();
const commonPage = new CommonPage();
const checkoutPage = new CheckoutPage();
const menuPage = new MenuPage();
const changeHandoffModalPage = new ChangeHandoffModalPage();
const orderConfirmationPage = new OrderConfirmationPage();
const dataPage = require("../pages/DataPage");

const restaurantName = dataPage.restaurant.validRestaurantName;
const validAddress = dataPage.delivery.validDeliveryAddress;
const validShortAddress = dataPage.delivery.validDeliveryShortAddress;
const invalidAddress = dataPage.delivery.invalidDeliveryAddress;
const addressDescription = dataPage.delivery.addressDescription;

describe("Order Confirmation", () => {
  context("Desktop", () => {
    beforeEach(function () {
      cy.viewport(Cypress.env("desktop"));
      cy.visit("/");
    });

    it("Test Case xxx: Check xxx - mobile", () => {
    });
  });

  context("Mobile", () => {
    beforeEach(() => {
      cy.viewport(Cypress.env("mobile"));
      cy.visit("/");
      cy.wait(500);
    });

    it("Test Case xxx: Check xxx - mobile", () => {
    });
  });
});
