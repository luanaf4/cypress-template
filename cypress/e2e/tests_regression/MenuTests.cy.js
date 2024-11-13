import CommonPage from "../pages/CommonPage";
import HandoffPage from "../pages/HandoffPage";
import DataPage from "../pages/DataPage"; 
import CheckoutPage from "../pages/CheckoutPage";
import MenuPage from "../pages/MenuPage";
import ChangeHandoffModalPage from "../pages/ChangeHandoffModalPage";

const handoffPage = new HandoffPage();
const commonPage = new CommonPage();
const checkoutPage = new CheckoutPage();
const menuPage = new MenuPage();
const changeHandoffModalPage = new ChangeHandoffModalPage();
const dataPage = require("../pages/DataPage");

const testCategory = dataPage.productWithModifiers.productCategory
const shoyu = dataPage.productSimple.productName
const zipPac = dataPage.productWithModifiers.productName
const productCategory2 = dataPage.productWithModifiers.productCategory2

describe("Menu", () => {
    context("Desktop", () => {
      beforeEach(function () {
        cy.viewport(Cypress.env("desktop"));
        handoffPage.mockAllAvailableRestaurants();
        cy.visit("/");
      });
  
      it("Test Case 2701: Menu - Verify Menu Categories", () => {
        handoffPage.accessMenuPageWithinPickupOption();
        cy.scrollTo("bottom")
        menuPage.selectCategory(testCategory)
        menuPage.productItem(shoyu).should("be.visible")
        menuPage.selectCategory(productCategory2)
        menuPage.productItem(shoyu).should("not.exist")
      });

      it("Test Case 2702: Menu - Verify Menu Products", () => {
        handoffPage.accessMenuPageWithinPickupOption();
        cy.scrollTo("bottom")
        menuPage.selectCategory(testCategory)
        menuPage.productItem(zipPac).should("be.visible")
        menuPage.productDescription(zipPac).should("be.visible")
        menuPage.productCost(zipPac).should("be.visible")
        menuPage.productCalories(zipPac).should("be.visible")
      });

      //TODO: Still need to be implemented
      it("Test Case 2703: Menu - Recents & Favorites for Guests", () => {
        cy.log("input tests here");
      });
    });
  
    context("Mobile", () => {
      beforeEach(() => {
        cy.viewport(Cypress.env("mobile"));
        handoffPage.mockAllAvailableRestaurants();
        cy.visit("/");
      });
  
      it("Test Case 2701: Menu - Verify Menu Categories", () => {
        handoffPage.accessMenuPageWithinPickupOption();
        cy.scrollTo("bottom")
        menuPage.selectCategory(testCategory)
        menuPage.productItem(shoyu).should("be.visible")
        menuPage.selectCategory(productCategory2)
        menuPage.productItem(shoyu).should("not.exist")
      });

      it("Test Case 2702: Menu - Verify Menu Products", () => {
        handoffPage.accessMenuPageWithinPickupOption();
        cy.scrollTo("bottom")
        menuPage.selectCategory(testCategory)
        menuPage.productItem(zipPac).should("be.visible")
        menuPage.productDescription(zipPac).should("be.visible")
        menuPage.productCost(zipPac).should("be.visible")
        menuPage.productCalories(zipPac).should("be.visible")
      });

      //TODO: Still need to be implemented
      it("Test Case 2703: Menu - Recents & Favorites for Guests", () => {
        cy.log("input tests here");
      });
    });
  });