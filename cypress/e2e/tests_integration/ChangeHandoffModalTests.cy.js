import HandoffPage from "../pages/HandoffPage";
import MenuPage from "../pages/MenuPage";
import CommonPage from "../pages/CommonPage";
import ChangeHandoffModalPage from "../pages/ChangeHandoffModalPage";

const dataPage = require("../pages/DataPage");
const handoffPage = new HandoffPage();
const commonPage = new CommonPage();
const menuPage = new MenuPage();
const changeHandoffModalPage = new ChangeHandoffModalPage();

const restaurantName = dataPage.restaurant.validRestaurantName;
const restaurantName2 = dataPage.restaurant.validRestaurantName2;
const validAddress = dataPage.delivery.validDeliveryAddress;
const validAddress2 = dataPage.delivery.validDeliveryAddress2;
const invalidAddress = dataPage.delivery.invalidDeliveryAddress;
const shortMobileAddress = dataPage.delivery.validDeliveryShortAddressMobile;
const mockedRestaurantName1 = "Zippy's Restaurant 1";
const mockedRestaurantName10 = "Zippy's Restaurant 10";

describe("Change Handoff Modal", () => {
  context("Desktop", () => {
    beforeEach(() => {
      handoffPage.mockAllAvailableRestaurants();
      cy.viewport(Cypress.env("desktop"));
      cy.visit("/");
    });

    //TODO: User Story 2658: Change Handoff Method | Modal Refactoring for Pickup + Delivery
    it(["Bug"],"Test Case 335: Create Location Change Modal on Pickup Tab", () => {
      handoffPage.accessMenuPageWithinPickupOption();
      cy.wait(2000);
      commonPage.logoZippys().should("exist");
      menuPage.storeLocationSection(restaurantName).click();
      cy.wait(2000);
      menuPage
        .pickupOption()
        .invoke("attr", "class")
        .should("contains", "text-primary-darkOrange");
      menuPage.deliveryOption().should("be.visible");
      menuPage.useMyLocationLink().should("be.visible");
      cy.wait(2000);
      changeHandoffModalPage.searchBar().clear();
      menuPage.pickupOption().click();
      menuPage.locationSearchBoxPlaceholder().should("exist");
      changeHandoffModalPage
        .cardRestaurant(restaurantName)
        .should("be.visible");
    });

    //TODO: Bug 1004: Restaurant date list is not being returned when accessing menu page directly through URL
    it(["Bug"], "Test Case 412: Verify Change Pickup Time Modal", () => {
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor");
      menuPage.pickupTimeButtonDesktop().click();
      cy.wait(5000);
      changeHandoffModalPage.pickupTimeTitle().should("be.visible");
      changeHandoffModalPage.datePicker().click();
      changeHandoffModalPage.timePicker().should("be.visible");
      changeHandoffModalPage.datePicker().click();
      changeHandoffModalPage.validateDifferentDateSlots();
      cy.wait(500);
      changeHandoffModalPage.timePicker().click();
      cy.wait(500);
      changeHandoffModalPage.validateDifferentTimeSlots();
      changeHandoffModalPage.saveChangesButton().click();
      menuPage.validateDifferentRestaurantsAfterLocationChange();
    });

    //TODO: Bug 1004: Restaurant date list is not being returned when accessing menu page directly through URL
    it(["Bug"], "Test Case 414: Verify Pickup Default Date + Time", () => {
      handoffPage.accessMenuPageWithinPickupOption();
      menuPage.pickupTimeLabelDesktop().should("contain", "ASAP").click();
      cy.wait(5000);
      changeHandoffModalPage.pickupTimeTitle().should("be.visible");
      changeHandoffModalPage.datePicker().click();
      changeHandoffModalPage.timePicker().should("be.visible");
      changeHandoffModalPage.datePicker().click();
      changeHandoffModalPage.dateList().click();
      changeHandoffModalPage.timePicker().click();
      changeHandoffModalPage.timeList().click();
      changeHandoffModalPage.saveChangesButton().click();
      menuPage
        .pickupTimeLabelDesktop()
        .should("be.visible")
        .should("contain", "ASAP");
    });

    it("Test Case 415: Verify Change Delivery Time Modal", () => {
      handoffPage.accessMenuPageWithinDeliveryOption();
      menuPage.deliveryTimeButtonDesktop().click();
      changeHandoffModalPage.datePicker().click();
      changeHandoffModalPage.validateDifferentDateSlots();
      cy.wait(500);
      changeHandoffModalPage.timePicker().click();
      cy.wait(500);
      changeHandoffModalPage.validateDifferentTimeSlots();
      changeHandoffModalPage.timeOption(1).click();
      changeHandoffModalPage.saveChangesButton().click();
      menuPage.validateDifferentRestaurantsAfterLocationChange();
    });

    //TODO: Bug 1004: Restaurant date list is not being returned when accessing menu page directly through URL
    it(["Bug"], "Test Case 416: Verify Delivery Default Date + Time", () => {
      handoffPage.accessMenuPageWithinDeliveryOption();
      menuPage.deliveryTimeLabelDesktop().should("contain", "ASAP").click();
      changeHandoffModalPage.deliveryTimeTitle().should("be.visible");
      changeHandoffModalPage.datePicker().click();
      changeHandoffModalPage.timePicker().should("be.visible");
      changeHandoffModalPage.datePicker().click();
      changeHandoffModalPage.dateList().click();
      cy.wait(1000);
      changeHandoffModalPage.timePicker().click();
      changeHandoffModalPage.timeList().click();
      changeHandoffModalPage.saveChangesButton().click();
      menuPage
        .deliveryTimeLabelDesktop()
        .should("be.visible")
        .should("contain", "ASAP");
    });

    //TODO: Bug 1004: Restaurant date list is not being returned when accessing menu page directly through URL
    it(["Bug"], "Test Case 418: Verify the Use Native Select Drop Down", () => {
      handoffPage.accessMenuPageWithinPickupOption();
      menuPage.pickupTimeLabelDesktop().should("contain", "ASAP").click();
      changeHandoffModalPage.pickupTimeTitle().should("be.visible");
      changeHandoffModalPage.datePicker().click();
      changeHandoffModalPage.timePicker().should("be.visible");
      changeHandoffModalPage.datePicker().click();
      changeHandoffModalPage.dateList().should("exist").click();
      changeHandoffModalPage.timePicker().click();
      changeHandoffModalPage.timeList().should("exist").click();
    });

    it("Test Case 404: Handoff - Verify changing delivery restaurants", () => {
      handoffPage.mock10Restaurants();
      handoffPage.accessMenuPageWithinDeliveryOption();
      menuPage
        .locationBoxOrderingFrom()
        .should("contain.text", mockedRestaurantName10);
      menuPage.locationBoxOrderingFrom().click();
      changeHandoffModalPage.cardRestaurant(mockedRestaurantName10).click();
      cy.focused().tab().tab().click();
      changeHandoffModalPage.closeButton().click();
      menuPage
        .locationBoxOrderingFrom()
        .should("contain.text", mockedRestaurantName10);
      menuPage.locationBoxOrderingFrom().click();
      changeHandoffModalPage.cardRestaurant(mockedRestaurantName10).click();
      cy.focused().tab().tab().click();
      changeHandoffModalPage.saveChangesButton().click();
      menuPage
        .locationBoxOrderingFrom()
        .should("not.contain.text", mockedRestaurantName10);
    });

    //TODO: User Story 2658: Change Handoff Method | Modal Refactoring for Pickup + Delivery
    it(["Bug"],"Test Case 521: Verify change delivery address modal - desktop", () => {
      const failMessageTitle = dataPage.delivery.failMessageTitle;
      handoffPage.accessMenuPageWithinDeliveryOption();
      menuPage.deliverToButton().click();
      changeHandoffModalPage.typeAddress(validAddress2);
      menuPage.saveChangesButton().should("be.visible");
      changeHandoffModalPage.typeAddress(invalidAddress);
      changeHandoffModalPage
        .deliveryAvailabilityMessage()
        .should("contain.text", failMessageTitle);
      menuPage.saveChangesButton().should("not.exist");
    });

    it("Test Case 523: Verify submitting a search query within location services enabled - desktop", () => {
      commonPage.allowGeolocationPermission();
      commonPage.openBrowserWithGeolocationPermission();
      handoffPage.accessMenuPageWithinDeliveryOption();
      menuPage.deliverToButton().click();
      changeHandoffModalPage.searchBar().click();
      cy.wait(500);
      changeHandoffModalPage.searchBar().clear();
      changeHandoffModalPage.searchBar().type(validAddress);
      changeHandoffModalPage
        .dropdownLocationAddressAccepted()
        .should("be.visible");
    });

    it("Test Case 532: Verify user can change from delivery to pickup in the same location", () => {
      handoffPage.accessMenuPageWithinDeliveryOption();
      menuPage.deliverToButton().click();
      changeHandoffModalPage.pickupOption().click();
      changeHandoffModalPage.yesChangeToPickupButton().click();
      changeHandoffModalPage.searchBar().clear();
      changeHandoffModalPage.typeAddress(validAddress);
      menuPage.cardRestaurant(restaurantName).should("exist");
      menuPage.saveChangesButton().click();
    });

    it("Test Case 427: Display Change Handoff Modal for Delivery Tab", () => {
      handoffPage.accessMenuPageWithinDeliveryOption();

      menuPage
        .dropdownHandoffChangeMobile()
        .invoke("text")
        .then((text) => {
          const restaurant1 = text.trim();

          menuPage.arrowIcon().click({ force: true });
          menuPage.editIconRestaurant().click({ force: true });
          changeHandoffModalPage.pickupOption().click({ force: true });
          changeHandoffModalPage
            .modalTitle()
            .should("contain", "DELIVERY ADDRESS");
          changeHandoffModalPage
            .pickupOption()
            .should("contain", "Pickup")
            .invoke("attr", "class")
            .should("not.contain", "text-primary-darkOrange");
          changeHandoffModalPage
            .deliveryOption()
            .should("contain", "Delivery")
            .invoke("attr", "class")
            .should("contain", "text-primary-darkOrange");
          changeHandoffModalPage.noKeepDeliveryButton().should("be.visible");
          changeHandoffModalPage.yesChangeToPickupButton().should("be.visible");

          //Verify "close" button
          changeHandoffModalPage.closeButton().click({ force: true });

          menuPage
            .pickupFromLabelMobile()
            .should("exist")
            .invoke("text")
            .then((pickupText) => {
              expect(pickupText.trim()).to.eq(restaurant1);
            });

          //Verify "NO,KEEP DELIVERY" button
          menuPage.arrowIcon().click({ force: true });
          menuPage.editIconRestaurant().click({ force: true });
          changeHandoffModalPage.pickupOption().click({ force: true });
          changeHandoffModalPage.noKeepDeliveryButton().click({ force: true });

          menuPage
            .pickupFromLabelMobile()
            .should("exist")
            .invoke("text")
            .then((pickupText) => {
              expect(pickupText.trim()).to.eq(restaurant1);
            });

          //Verify "YES, CHANGE TO PICKUP" button
          menuPage.arrowIcon().click({ force: true });
          menuPage.editIconRestaurant().click({ force: true });
          changeHandoffModalPage.pickupOption().click({ force: true });
          changeHandoffModalPage
            .yesChangeToPickupButton()
            .click({ force: true });
          changeHandoffModalPage.typeAddress(validAddress);
          changeHandoffModalPage.saveChangesButton().click();

          menuPage
            .pickupFromLabelMobile()
            .should("exist")
            .invoke("text")
            .then((pickupText) => {
              expect(pickupText.trim()).not.to.eq(restaurant1);
            });
        });
    });

    it("Test Case 674: Verify changing restaurant through 'Deliver to' button in menu page",() => {
        //handoffPage.mock10Restaurants();
        handoffPage.accessMenuPageWithinDeliveryOption();
        cy.wait(500);
        menuPage.changeHandoffButton().click();
        cy.wait(500);
        changeHandoffModalPage.searchBar().clear();
        changeHandoffModalPage
          .searchBar()
          .type("450 Kamehameha Highway, Waiau, HI 96782");
        cy.wait(1000);
        menuPage
          .restaurantAddressValue("450 Kamehameha HWY, Pearl City, HI 96782 US")
          .click();
        changeHandoffModalPage.saveChangesButton().click();
        menuPage.addressDesktop().should("exist").should("not.be.empty");
      }
    );

    it("Test Case 675: Verify changing restaurant through Pickup 'Change Handoff' button in menu page", () => {
      handoffPage.mock10Restaurants();
      handoffPage.accessMenuPageWithinPickupOption();
      cy.wait(1000);
      menuPage.changeHandoffButton().click();
      changeHandoffModalPage.typeAddress(validAddress);
      changeHandoffModalPage.cardRestaurant(mockedRestaurantName10).click();
      cy.focused().tab().tab().click();
      changeHandoffModalPage.saveChangesButton().click();
      menuPage.restaurantNameValue(mockedRestaurantName1).should("exist");
      menuPage.restaurantNameValue(mockedRestaurantName10).should("not.exist");
    });

    it("Test Case 979: Verify changing pickup time when opening menu page directly from the URL",
      () => {
        cy.visit(
          "https://dev-zippys-web.azurewebsites.net/menu/zippys-restaurants-sandbox-demo-vendor"
        );
        menuPage.pickupTimeButtonDesktop().click();
        changeHandoffModalPage.datePicker().click();
        changeHandoffModalPage.dateOption1().should("exist");
        changeHandoffModalPage.dateOption1().click();
        changeHandoffModalPage.saveChangesButton().should("exist");
      }
    );

    //TODO: Bug 2270: Change restaurant is not working in pickup
    it(
      ["Bug"],
      "Test Case 339: Change Pickup Location Modal Add Select Location Button",
      () => {
        const restaurantName1 = dataPage.restaurant.validRestaurantName;

        handoffPage.accessMenuPageWithinPickupOption();
        cy.wait(2000);
        menuPage.handoffRestaurantNameDesktop(restaurantName1).click();
        menuPage.saveChangesButton().should("not.exist");
        menuPage.cardRestaurant(restaurantName1).click();
        menuPage.selectNextRestaurantCard();
        cy.wait(2000);
        menuPage.saveChangesButton().click();
        menuPage.changeRestaurantLocationModalTitle().should("not.exist");
      }
    );
  });

  context("Mobile", () => {
    beforeEach(() => {
      handoffPage.mockAllAvailableRestaurants();
      cy.viewport(Cypress.env("mobile"));
      cy.visit("/");
    });

    it("Test Case 425: Display Change Handoff Modal for Pickup Tab", () => {
      handoffPage.accessMenuPageWithinPickupOption();

      menuPage
        .dropdownHandoffChangeMobile()
        .invoke("text")
        .then((text) => {
          const restaurant1 = text.trim();

          menuPage.arrowIcon().click({ force: true });
          menuPage.editIconRestaurant().click({ force: true });
          changeHandoffModalPage.deliveryOption().click({ force: true });
          changeHandoffModalPage
            .modalTitle()
            .should("contain", "PICKUP LOCATION");
          changeHandoffModalPage
            .pickupOption()
            .should("contain", "Pickup")
            .invoke("attr", "class")
            .should("contain", "text-primary-darkOrange");
          changeHandoffModalPage
            .deliveryOption()
            .should("contain", "Delivery")
            .invoke("attr", "class")
            .should("not.contain", "text-primary-darkOrange");
          changeHandoffModalPage.noKeepPickupButton().should("be.visible");
          changeHandoffModalPage
            .yesChangeToDeliveryButton()
            .should("be.visible");

          //Verify "close" button
          changeHandoffModalPage.closeButton().click({ force: true });

          menuPage
            .pickupFromLabelMobile()
            .should("be.visible")
            .invoke("text")
            .then((pickupText) => {
              expect(pickupText.trim()).to.eq(restaurant1);
            });

          //Verify "NO,KEEP PICKUP" button
          menuPage.arrowIcon().click({ force: true });
          menuPage.editIconRestaurant().click({ force: true });
          changeHandoffModalPage.deliveryOption().click({ force: true });
          changeHandoffModalPage.noKeepPickupButton().click({ force: true });

          menuPage
            .pickupFromLabelMobile()
            .should("be.visible")
            .invoke("text")
            .then((pickupText) => {
              expect(pickupText.trim()).to.eq(restaurant1);
            });

          //Verify "YES, CHANGE TO DELIVERY" button
          menuPage.arrowIcon().click({ force: true });
          menuPage.editIconRestaurant().click({ force: true });
          changeHandoffModalPage.deliveryOption().click({ force: true });
          changeHandoffModalPage
            .yesChangeToDeliveryButton()
            .click({ force: true });
          changeHandoffModalPage.searchBar().clear();

          changeHandoffModalPage
            .searchBar()
            .type(dataPage.delivery.validDeliveryAddress2);
          cy.wait(2000);
          changeHandoffModalPage.dropdownLocationAddressAccepted2().click();
          cy.wait(2000);
          changeHandoffModalPage.saveChangesButton().click();

          menuPage
            .pickupFromLabelMobile()
            .should("be.visible")
            .invoke("text")
            .then((pickupText) => {
              expect(pickupText.trim()).not.to.eq(restaurant1);
            });
        });
    });

    it("Test Case 511: Change Handoff method from Delivery to Pickup with the same store",() => {
        handoffPage.accessMenuPageWithinDeliveryOption();
        menuPage
          .dropdownHandoffChangeMobile()
          .invoke("text")
          .then((text) => {
            const restaurant1 = text.trim();

            menuPage.arrowIcon().click({ force: true });
            menuPage.editIconRestaurant().click({ force: true });
            changeHandoffModalPage.pickupOption().click({ force: true });

            menuPage.arrowIcon().click({ force: true });
            menuPage.editIconRestaurant().click({ force: true });
            changeHandoffModalPage.pickupOption().click({ force: true });
            changeHandoffModalPage
              .yesChangeToPickupButton()
              .click({ force: true });
            cy.wait(1000);
            changeHandoffModalPage.searchBar().clear();
            changeHandoffModalPage.searchBar().type(validAddress);
            changeHandoffModalPage.dropdownLocationAddressAccepted().click();
            cy.wait(1000);
            changeHandoffModalPage.saveChangesButton().click();

            menuPage
              .pickupFromLabelMobile()
              .should("be.visible")
              .invoke("text")
              .then((pickupText) => {
                expect(pickupText.trim()).not.to.eq(restaurant1);
              });
          });
      }
    );

    it("Test Case 527: Verify submitting a search query within location services enabled - mobile", () => {
      commonPage.allowGeolocationPermission();
      handoffPage.accessMenuPageWithinDeliveryOption();
      cy.url().should("contain", "/menu");
    });

    it("Test Case 526: Verify change delivery address modal - mobile web", () => {
      handoffPage.accessMenuPageWithinDeliveryOption();

      menuPage
        .dropdownHandoffChangeMobile()
        .invoke("text")
        .then((text) => {
          const restaurant1 = text.trim();

          menuPage.arrowIcon().click({ force: true });
          menuPage.editIconRestaurant().click({ force: true });
          changeHandoffModalPage.searchBar().click().clear().should("be.empty");
          changeHandoffModalPage.searchBar().type(validAddress2);
          cy.wait(2000);
          changeHandoffModalPage.dropdownLocationAddressAccepted2().click();
          cy.wait(1000);
          changeHandoffModalPage.saveChangesButton().click();
          menuPage
            .pickupFromLabelMobile()
            .should("be.visible")
            .invoke("text")
            .then((pickupText) => {
              expect(pickupText.trim()).to.contain(shortMobileAddress);
            });

          menuPage.arrowIcon().click({ force: true });
          menuPage.editIconRestaurant().click({ force: true });
          changeHandoffModalPage.searchBar().click().clear().should("be.empty");
          changeHandoffModalPage.typeAddress(invalidAddress);
          changeHandoffModalPage.saveChangesButton().should("not.exist");
          changeHandoffModalPage
            .deliveryAvailabilityMessage()
            .should("be.visible");
          changeHandoffModalPage
            .deliveryUnavailableSubMessage()
            .should("be.visible");
        });
    });
  });
});
