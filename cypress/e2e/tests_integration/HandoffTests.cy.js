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
      handoffPage.mockAllHandoffMethodsAvailable();
      cy.viewport(Cypress.env("desktop"));
      cy.visit("/");
    });

    it.only("test",() => {
      handoffPage.pickupOption().click()
      handoffPage.searchForLocation(validAddress)
    })

    it("Test Case 244: Handoff - Verify Location Search with Address Accepted", () => {
      cy.wait(2000);
      handoffPage.deliveryOption().click();
      handoffPage.searchForLocation(validAddress);
      handoffPage.startOrderButton().should("be.visible");
    });

    it("Test Case 246: Handoff - Verify Location Search with Address Unsuccessful", () => {
      handoffPage.deliveryOption().click();
      handoffPage.searchForLocation(invalidAddress);
      handoffPage.deliveryFailMessageTitle().should("be.visible");
    });

    it("Test Case 247: Handoff - Verify Location Search with Empty Search", () => {
      handoffPage.deliveryOption().click();
      handoffPage.deliveryFailMessageTitle().should("not.exist");
      handoffPage.deliverySuccessMessage().should("not.exist");
      handoffPage.pickupOption().click();
      handoffPage.searchForLocation(validAddress);
      handoffPage.deliveryOption().click();
      handoffPage.deliveryFailMessageTitle().should("not.exist");
      handoffPage.deliverySuccessMessage().should("not.exist");
    });

    it("Test Case 392: Verify restaurant list when deleting searched address", () => {
      handoffPage.pickupOption().click();
      handoffPage.searchForLocation(validAddress);
      handoffPage.locationSearchBox().clear();
      handoffPage.cardRestaurant(validShortAddress).should("be.visible");
      handoffPage.searchForLocation(invalidAddress);
      handoffPage.anyCardRestaurant().should("not.exist");
    });

    //TODO: "Bug 254: Restaurant query is not being submitted when typing full address and pressing "Enter" in keyboard"
    it(["Bug"],"Test Case 394: Verify the restaurant query within submission by typing full address",
      () => {
        handoffPage.pickupOption().click();
        handoffPage
          .locationSearchBox()
          .type(validAddress)
          .type("{backspace}")
          .wait(500)
          .type("{enter}");
        cy.wait(1000);
        handoffPage.cardRestaurant(validAddress).should("be.visible");
      }
    );

    it("Test Case 665: Verify if user can reselect same restaurant by going back to Handoff page and searching for same restaurant selected", () => {
      handoffPage.mockAllAvailableRestaurants();
      handoffPage.accessMenuPageWithinPickupOption();
      cy.wait(500);
      cy.visit("/");
      handoffPage.searchForLocation(validAddress);
      handoffPage.startOrderButton().should("be.visible").click();
      menuPage
        .editRestaurantButton()
        .should(
          "have.text",
          restaurantName +
            restaurantName +
            validShortAddress +
            addressDescription
        );
    });

    it("Test Case 1029: Verify Stores Offering Sushi", () => {
      handoffPage.mockSushiMetadataForAllRestaurants();
      handoffPage.searchForLocation(validAddress);
      handoffPage.sushiAvailable().should("be.visible");
    });

    it("Test Case 1073: Navbar - Verify Zippys logo with no restaurant selected", () => {
      cy.visit("/")
      commonPage.logoZippys().click();
      cy.url().should("not.contain","menu/zippys-restaurants-sandbox-demo-vendor");
    });

    it("Test Case 2447: Pickup address does not disappears when search field is clicked", () => {
      const address = dataPage.delivery.validDeliveryAddress

      cy.visit("/")
      handoffPage.searchForLocation(address)
      handoffPage.pickupOption().click()
      handoffPage.locationSearchBox().click().should("be.empty")
    });
    
    it("Test Case 2747: Tags filtered on Location cards", () => {
      handoffPage.mockOnlyDineInAvailable()
      cy.visit("/")
      handoffPage.searchForLocation(validAddress)
      handoffPage.curbsideTag().should("not.exist")
      handoffPage.driveUpTag().should("not.exist")
      handoffPage.inStoreTag().should("be.visible")

      handoffPage.mockOnlyCurbsideAvailable()
      cy.visit("/")
      handoffPage.searchForLocation(validAddress)
      handoffPage.curbsideTag().should("be.visible")
      handoffPage.driveUpTag().should("not.exist")
      handoffPage.inStoreTag().should("not.exist")

      handoffPage.mockOnlyDriveThruAvailable()
      cy.visit("/")
      handoffPage.searchForLocation(validAddress)
      handoffPage.curbsideTag().should("not.exist")
      handoffPage.driveUpTag().should("be.visible")
      handoffPage.inStoreTag().should("not.exist")
    });
  
    it("Test Case 2656: Delivery and Pickup not available", () => {
      handoffPage.pickupOption().click()
      handoffPage.searchForLocation(invalidAddress)
      handoffPage.deliveryAvailableMessageTitle().should("contain", "PICKUP IS NOT AVAILABLE")
      handoffPage.searchForLocation(validAddress)
      handoffPage.deliveryAvailableMessageTitle().should("not.exist")

      handoffPage.deliveryOption().click()
      handoffPage.searchForLocation(invalidAddress)
      handoffPage.deliveryAvailableMessageTitle().should("contain", "DELIVERY IS NOT AVAILABLE")
      handoffPage.searchForLocation(validAddress)
      handoffPage.deliveryAvailableMessageTitle().should("not.exist")
    });
  });

  context("Mobile", () => {
    beforeEach(() => {
      handoffPage.mockAllAvailableRestaurants();
      cy.viewport(Cypress.env("mobile"));
      cy.visit("/");
      cy.wait(500);
    });

    it("Test Case 347: Verify Location Search Screen with Delivery", () => {
      handoffPage.deliveryOption().click();
      cy.focused().should("contain", "Delivery");
      handoffPage
        .deliverySearchBoxPlaceholder()
        .should("contain", dataPage.delivery.searchBoxPlaceholderText);
      handoffPage.findZippysIcon().should("be.visible");
      handoffPage.listItem2().should("not.exist");
      handoffPage.deliveryOption().click();
      handoffPage.searchForLocation(validAddress);
      handoffPage.startOrderButton().should("be.visible");

      handoffPage.deliveryOption().click();
      handoffPage.locationSearchBox().clear();
      handoffPage.searchForLocation(invalidAddress);
      handoffPage.locationSearchBox().should("have.value", invalidAddress);
      handoffPage.startOrderButton().should("not.exist");
      handoffPage.deliveryFailMessageTitle().should("be.visible");
      handoffPage.deliveryFailMessageDescription().should("be.visible");
    });

    it("Test Case 357: Mobile Web | Location Search Screen | Pickup | Location Services Disabled", () => {
      commonPage.denyGeolocationPermission();
      commonPage.openBrowserWithGeolocationPermission();
      handoffPage.useMyLocation().should("exist");
      commonPage.logoZippys().should("exist");
      handoffPage.locationSearchBox().should("exist");
      handoffPage.listItem2().should("not.exist");
      handoffPage.pickupOption().click();
      handoffPage.useMyLocation().click();
      handoffPage.locationSearchBox().should("be.empty");
      handoffPage.searchForLocation(validAddress);
      handoffPage.listItem2().should("exist");
      handoffPage.startOrderButton().should("exist");
    });

    it("Test Case 359: Mobile Web | Location Search Screen | Pickup | Location Services Enabled", () => {
      handoffPage.pickupOption().click();
      handoffPage.searchForLocation(validAddress);
      handoffPage.pickupSearchBoxPlaceholder().should("exist");
      handoffPage.useMyLocation().should("exist");
      commonPage.logoZippys().should("exist");
      handoffPage.locationSearchBox().should("exist");
      handoffPage.cardRestaurant(restaurantName).should("exist");
      handoffPage.pickupOption().click();
      handoffPage.useMyLocation().click();
      cy.wait(2000);
      handoffPage.locationSearchBox().should("contain.value", validAddress);
      handoffPage.cardRestaurant(restaurantName).should("exist");
      handoffPage.startOrderButton().should("exist");
      cy.scrollTo("bottom");
      handoffPage.cardRestaurant(restaurantName).should("be.visible");
      handoffPage.pickupOption().should("be.visible");
      handoffPage.deliveryOption().should("be.visible");
    });

    it("Test Case 364: Verify location button in iPhone devices", () => {
      cy.wait(2000);
      handoffPage.deliveryOption().click();
      handoffPage.useMyLocation().should("exist");
    });
  });
});
