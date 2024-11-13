import HandoffPage from "../pages/HandoffPage";
import MenuPage from "../pages/MenuPage";
import CommonPage from "../pages/CommonPage";
import ChangeHandoffModalPage from "../pages/ChangeHandoffModalPage";
import ProductDescriptionPage from "../pages/ProductDescriptionPage";
import CartPage from "../pages/CartPage";

const dataPage = require("../pages/DataPage");
const handoffPage = new HandoffPage();
const commonPage = new CommonPage();
const menuPage = new MenuPage();
const productDescriptionPage = new ProductDescriptionPage();
const changeHandoffModalPage = new ChangeHandoffModalPage();
const cartPage = new CartPage();

const validAddress = dataPage.delivery.validDeliveryAddress;

describe("Menu", () => {
  context("Desktop", () => {
    beforeEach(() => {
      handoffPage.mockAllAvailableRestaurants();
      cy.viewport(Cypress.env("desktop"));
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor").log(
        "Visit restaurant page"
      );
      cy.wait(3000);
    });

    it("Test Case 272: Menu - Verify Location and Handoff Section for Delivery", () => {
      cy.visit("/").log("Visit handoff page");
      handoffPage.accessMenuPageWithinDeliveryOption();
      menuPage.validateDeliveryHandoffSection();
    });

    it("Test Case 274: Menu - Verify Location and Handoff Section for Pickup", () => {
      menuPage.locationBoxPickupFrom().should("be.visible");
      menuPage.locationBoxPickupTimeLabel().should("be.visible");
      menuPage.locationBoxPickupDateTime().should("be.visible");
    });

    it("Test Case 523: Verify submitting a search query within location services enabled - desktop", () => {
      commonPage.allowGeolocationPermission();
      commonPage.openBrowserWithGeolocationPermission();
      handoffPage.accessMenuPageWithinDeliveryOption();
      menuPage.deliverToButton().click();
      changeHandoffModalPage.typeAddress(validAddress);
      changeHandoffModalPage
        .dropdownLocationAddressAccepted()
        .should("be.visible");
    });

    it("Test Case 926: Verify Categories and Products for Pickup - Desktop", () => {
      const productCategory = dataPage.productWithModifiers.productCategory;
      const productName = dataPage.productWithModifiers.productName;
      const productBaseCost = dataPage.productWithModifiers.productBaseCost;
      const productTotalWithModifier1 =
        dataPage.productWithModifiers.totalCostWithModifier1;
      const productCalories = dataPage.productWithModifiers.productCalories;

      menuPage.selectCategory(productCategory);
      menuPage.productImage(productName).should("be.visible");
      menuPage
        .productTitle(productName)
        .should("be.visible")
        .should("contain", productName);
      menuPage.productDescription(productName).should("be.visible");
      menuPage.productCalories(productName).should("be.visible");
      menuPage
        .productCost(productName)
        .should("be.visible")
        .should("have.text", productBaseCost);
    });

    it("Test Case 928: Verify No Calories items - Desktop", () => {
      const productCategory = dataPage.productWithModifiers.productCategory;
      const productName = dataPage.productWithNoCalories.productName;

      menuPage.selectCategory(productCategory);
      cy.wait(2000);
      menuPage.productCalories(productName).should("not.exist");
    });

    it("Test Case 930: Verify Categories and Products for Delivery - Desktop", () => {
      const productName = dataPage.productWithModifiers.productName;

      cy.visit("/").log("Visit handoff page");
      handoffPage.accessMenuPageWithinDeliveryOption();
      cy.wait(1000);
      menuPage.categoryItem("BREAKFAST").should("be.visible");
      menuPage.selectCategory("TEST CATEGORY");
      cy.wait(2000);
      menuPage.productItem("Meat Lover's Breakfast").should("not.exist");
      menuPage.categoryItem("BREAKFAST").should("be.visible");
      menuPage.productImage(productName).should("be.visible");
      menuPage
        .productTitle(productName)
        .should("be.visible")
        .should("contain", productName);
      menuPage.productDescription(productName).should("be.visible");
      menuPage.productCalories(productName).should("be.visible");
      menuPage.productCost(productName).should("be.visible");
    });

    it("Test Case 647: URL route", () => {
      cy.visit("/").log("Visit handoff page");
      handoffPage.accessMenuPageWithinDeliveryOption();
      cy.url().should("contain", "menu/zippys-restaurants-sandbox-demo-vendor");
    });

    it("Test Case 1075: Navbar - Verify Zippys logo with a restaurant selected", () => {
      cy.visit("/").log("Visit handoff page");
      handoffPage.accessMenuPageWithinDeliveryOption();
      commonPage.logoZippys().click();
      cy.url().should("contain", "menu/zippys-restaurants-sandbox-demo-vendor");
    });

    it("Test Case 1076: Navbar - Verify general navigation items for Desktop", () => {
      commonPage.logoZippys().should("exist");
      commonPage.aboutZippys().should("exist");
      commonPage.signUp().should("exist");
      commonPage.logIn().should("exist");
      cartPage.cartHeader().should("exist");
    });

    it("Test Case 1078: Navbar - Verify 'About Zippys'", () => {
      commonPage
        .aboutZippys()
        .should("have.attr", "target", "_blank")
        .then((link) => {
          const href = link.prop("href");
          expect(href).to.equal("https://www.zippys.com/");
        });
    });

    it("Test Case 1517: Menu | Display Items That Are Featured", () => {
      const testCategory = dataPage.productWithModifiers.productCategory;
      const productName = dataPage.productWithModifiers.productName;
      menuPage.mockFeaturedProducts();
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor");
      cy.wait(2000);
      menuPage.categoryItem(testCategory).click();
      menuPage.featuredIcon(productName).should("exist");
      menuPage.productItem(productName).click();
      cy.wait(1000);
      productDescriptionPage.featuredIcon().should("exist");
    });

    it("Test Case 2254: 'Favorite & Recents' tab display", () => {
      const favoritesAndRecents =
        dataPage.favoritesAndRecents.favoritesAndRecentsCategory;
      menuPage.categoryItem(favoritesAndRecents).should("exist");
      menuPage.categoryItem(favoritesAndRecents).click();
    });

    //TODO: Bug 2570: Sold out products are not being shown
    it(["Bug"],"Test Case 1407: Menu | Display Items That Are Sold Out", () => {
      const productCategory = dataPage.productWithModifiers.productCategory;
      const productName = dataPage.productWithModifiers.productName;

      menuPage.mockSoldOutProducts()
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor").log("Visit restaurant page");
      cy.wait(3000);
      menuPage.selectCategory(productCategory);
      menuPage.productAvailability(productName).should("contain.text","Sold Out")
    });
    
  });

  context("Mobile", () => {
    beforeEach(() => {
      handoffPage.mockAllAvailableRestaurants();
      cy.viewport(Cypress.env("mobile"));
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor").log(
        "Visit restaurant page"
      );
    });

    //TODO: Bug 1370: User cannot change from delivery to pickup in mobile web
    it(
      ["Bug"],
      "Test Case 327: Verify Menu Landing Page for Location & Handoff within Pickup Method in a Mobile phone",
      () => {
        menuPage.arrowIcon().click();
        menuPage.pickupFromLabelMobile().should("be.visible");
        menuPage.editRestaurantButton().should("be.visible");
        menuPage.selectedRestaurantAddressMobile().should("be.visible");
        menuPage.selectedRestaurantReferenceMobile().should("be.visible");
        menuPage.editIconRestaurant().should("be.visible");
        menuPage.pickupTimeLabel().should("be.visible");
        menuPage.pickupTimeValue().should("be.visible");
        menuPage.editIconRestaurant().click().wait(2000);
        menuPage
          .changeRestaurantLocationPickupModalTitle()
          .should("be.visible");
      }
    );

    it("Test Case 329: Verify Menu Landing Page for Location & Handoff within Delivery Method in a Mobile phone", () => {
      cy.visit("/").log("Visit handoff page");
      handoffPage.accessMenuPageWithinDeliveryOption();
      menuPage.arrowIcon().click();
      menuPage.deliverToMobileButton().should("be.visible");
      menuPage.deliverToMobileValue().should("be.visible");
      menuPage.locationBoxOrderingFromMobile().should("be.visible");
      menuPage.locationBoxDeliveryTimeMobile().should("be.visible");
      menuPage.deliverToButton().click();
      menuPage.changeRestaurantLocationModalTitle().should("be.visible");
    });

    it("Test Case 527: Verify submitting a search query within location services enabled - mobile", () => {
      cy.visit("/").log("Visit handoff page");
      commonPage.allowGeolocationPermission();
      handoffPage.accessMenuPageWithinDeliveryOption();
      cy.url().should("contain", "/menu");
    });

    it("Test Case 924: Verify accessing restaurant Menu URL - Mobile", () => {
      cy.url().should("contain", "/zippys-restaurants-sandbox-demo-vendor");
    });

    it("Test Case 1077: Navbar - Verify hamburguer menu for Mobile", () => {
      commonPage.logoZippys().should("exist");
      cartPage.cartHeader().should("exist");
      commonPage.hamburgerMenuButton().should("exist");
      commonPage.hamburgerMenuButton().click();
      commonPage.alohaText().should("exist");
      commonPage.hamburgerMenuCloseButton().should("exist");
      commonPage.aboutZippys().should("exist");
      commonPage.logIn().should("exist");
      commonPage.signUp().should("exist");
    });
  });
});
