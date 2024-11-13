import CommonPage from "../pages/CommonPage";
import HandoffPage from "../pages/HandoffPage";
import CheckoutPage from "../pages/CheckoutPage";
import pickupAvailableStores from "../../fixtures/pickupAvailableStores.json";
import common from "mocha/lib/interfaces/common";
import CartPage from "../pages/CartPage";
import MenuPage from "../pages/MenuPage";

const handoffPage = new HandoffPage();
const commonPage = new CommonPage();
const checkoutPage = new CheckoutPage();
const cartPage = new CartPage();
const menuPage = new MenuPage();
const dataPage = require("../pages/DataPage");

const restaurantName = dataPage.restaurant.validRestaurantName;
const validAddress = dataPage.delivery.validDeliveryAddress;

describe("Checkout", () => {
  context("Desktop", () => {
    beforeEach(() => {
      handoffPage.mockAllAvailableRestaurants();
      cy.viewport(Cypress.env("desktop"));
    });

    it("Test Case 219: Verify Checkout button in Handoff Page", () => {
      //commonPage.checkoutButton().click();

      cy.visit("/checkout");
      cy.url().should("contain", "/checkout");
    });

    it("Test Case 296: Order Summary - Verify Customer Info and Payment Placeholder Within Delivery",
      () => {       
        checkoutPage.goToCheckoutWithDelivery();
        checkoutPage.firstNameField().should("be.visible");
        checkoutPage.lastNameField().should("be.visible");
        //checkoutPage.deliveryAddressField().should("be.visible").should("have.value", deliveryAddress).clear().should("have.value", "")
        checkoutPage.emailAddressField().should("be.visible");
        checkoutPage.phoneNumberField().should("be.visible");

        checkoutPage.firstNameField().type(dataPage.user.firstName);
        cy.wait(1000);
        checkoutPage
          .firstNameField()
          .should("have.value", dataPage.user.firstName);

        checkoutPage.lastNameField().clear().type(dataPage.user.lastName);
        cy.wait(1000);
        checkoutPage
          .lastNameField()
          .should("have.value", dataPage.user.lastName);

        checkoutPage.emailAddressField().type(dataPage.user.emailAddress);
        cy.wait(1000);
        checkoutPage
          .emailAddressField()
          .should("have.value", dataPage.user.emailAddress);

        checkoutPage
          .deliveryAddressField()
          .should("have.value", dataPage.delivery.validDeliveryAddress);

        checkoutPage.phoneNumberField().type(dataPage.user.phoneNumber);
        cy.wait(1000);
        checkoutPage
          .phoneNumberField()
          .should("have.value", dataPage.user.phoneNumber);
      }
    );

    it("Test Case 298: Order Summary - Verify Customer Info and Payment Placeholder Within Pickup", () => {
      checkoutPage.goToCheckoutWithPickup();
      checkoutPage.firstNameField().should("be.visible");
      checkoutPage.lastNameField().should("be.visible");
      checkoutPage.deliveryAddressField().should("not.exist");
      checkoutPage.emailAddressField().should("be.visible");
      checkoutPage.phoneNumberField().should("be.visible");

      checkoutPage.firstNameField().type(dataPage.user.firstName);
      cy.wait(1000);
      checkoutPage
        .firstNameField()
        .should("have.value", dataPage.user.firstName);

      checkoutPage.lastNameField().type(dataPage.user.lastName);
      cy.wait(1000);
      checkoutPage.lastNameField().should("have.value", dataPage.user.lastName);

      checkoutPage.emailAddressField().type(dataPage.user.emailAddress);
      cy.wait(1000);
      checkoutPage
        .emailAddressField()
        .should("have.value", dataPage.user.emailAddress);

      checkoutPage.deliveryAddressField().should("not.exist");

      checkoutPage.phoneNumberField().type(dataPage.user.phoneNumber);
      cy.wait(1000);
      checkoutPage
        .phoneNumberField()
        .should("have.value", dataPage.user.phoneNumber);
    });

    //TODO: checkoutButton is not working
    it(["Bug"], "Test Case 419: Display Pickup Type Buttons on Desktop", () => {
      checkoutPage.goToCheckoutWithPickup();
      checkoutPage.curbsidePickupType().should("be.visible");
      checkoutPage
        .curbsidePickupType()
        .should("contain.text", "Order brought to your vehicle");
      checkoutPage.driveUpPickupType().should("be.visible");
      checkoutPage
        .driveUpPickupType()
        .should("contain.text", "Pull up to drive up window");
      checkoutPage.inStorePickupType().should("be.visible");
      checkoutPage
        .inStorePickupType()
        .should("contain.text", "Counter or locker inside");
    });

    it("Test Case 423: Exclude Unsupported Pickup Type", () => {
      handoffPage.mockHonoluluRestaurantsToCanNotPickupInStore();
      checkoutPage.goToCheckoutWithPickup();
      checkoutPage.inStorePickupType().should("not.exist");
    });

    //TODO: checkoutButton is not working
    it(["Bug"], "Test Case 424: Display Unavailable Pickup Type", () => {
      handoffPage.mockAllHandoffMethodsUnavailable();
      checkoutPage.goToCheckoutWithPickup();
      checkoutPage
        .curbsidePickupType()
        .should("include.text", "CURRENTLY UNAVAILABLE");
      checkoutPage
        .inStorePickupType()
        .should("include.text", "CURRENTLY UNAVAILABLE");
      checkoutPage
        .driveUpPickupType()
        .should("include.text", "CURRENTLY UNAVAILABLE");
    });

    //TODO: checkoutButton is not working
    it(["Bug"],"Test Case 512: Verify Card selected state when the store has only one pickup method available",
      () => {
        handoffPage.mockHonoluluRestaurantsToHaveOnePickupMethod();
        checkoutPage.goToCheckoutWithPickup();
        checkoutPage.checkoutPickupTitle().should("have.text", "PICKUP TYPE");
      }
    );

    it("Test Case 551: Validation for empty First Name and Last Name fields", () => {
      checkoutPage.goToCheckoutWithDelivery();
      checkoutPage.firstNameField().click();
      checkoutPage.checkoutCustomerTitle().click();
      checkoutPage.firstNameErrorMessage().should("be.visible");
      checkoutPage.lastNameField().click();
      checkoutPage.checkoutCustomerTitle().click();
      checkoutPage.lastNameErrorMessage().should("be.visible");
    });

    it("Test Case 553: Validation and formatting for Phone Number field", () => {
      checkoutPage.goToCheckoutWithDelivery();
      checkoutPage.phoneNumberField().click();
      checkoutPage.checkoutCustomerTitle().click();
      checkoutPage.phoneErrorMessage().should("be.visible");
      checkoutPage.phoneNumberField().click().type("123123");
      checkoutPage.checkoutCustomerTitle().click();
      checkoutPage.phoneErrorMessage().should("be.visible");
      checkoutPage.phoneNumberField().clear();
      checkoutPage.phoneNumberField().click().type("abcabc");
      checkoutPage.phoneNumberField().should("have.value", "");
      checkoutPage.phoneNumberField().click().type("2231231234");
      checkoutPage.phoneErrorMessage().should("not.exist");
    });

    it("Test Case 554: Validation for Email Address field", () => {
      checkoutPage.goToCheckoutWithDelivery();
      checkoutPage.emailAddressField().click();
      checkoutPage.checkoutCustomerTitle().click();
      checkoutPage.emailErrorMessage().should("be.visible");
      checkoutPage.emailAddressField().click().type("email@example.com");
      checkoutPage.checkoutCustomerTitle().click();
      checkoutPage.emailErrorMessage().should("not.exist");
      checkoutPage.emailAddressField().clear();
      checkoutPage.emailAddressField().click().type("email.com");
      checkoutPage.checkoutCustomerTitle().click();
      checkoutPage.emailErrorMessage().should("be.visible");
    });

    //TODO: checkoutButton is not working
    it(["Bug"],"Test Case 555: Verify Delivery Address and Delivery Instructions Field Behavior",
      () => {
        checkoutPage.goToCheckoutWithDelivery();
        checkoutPage
          .deliveryAddressField()
          .should("have.value", "2 World Trade Ctr, New York, NY 10007 US");
        checkoutPage.deliveryAddressField().clear();
        checkoutPage.checkoutCustomerTitle().click();
        checkoutPage.deliveryAddressErrorMessage().should("be.visible");
        checkoutPage
          .deliveryInstructionsTextLimit()
          .should("contain.text", "128");
        checkoutPage.deliveryInstructionsField().type("abc");
        checkoutPage
          .deliveryInstructionsTextLimit()
          .should("contain.text", "125");
      }
    );

    it("Test Case 1202: Verify Total and Button Checkout", () => {
      const productCategory = dataPage.productSimple.productCategory
      const productName = dataPage.productSimple.productName

      handoffPage.mockAllHandoffMethodsAvailable()
      cy.visit("/");
      cy.wait(3000);
      handoffPage.accessMenuPageWithinPickupOption()
      menuPage.selectCategory(productCategory)
      menuPage.addProductToBasket(productName)
      commonPage.navbarCart().click()
      cartPage.itemsList().scrollTo("bottom")
      cartPage.subtotalLabel().should("be.visible").should("contain.text","$")
      cartPage.estimatedTaxLabel().should("be.visible").should("contain.text","$")
      cartPage.checkoutButton().should("be.visible").should("contain.text","CHECKOUT").should("contain.text","$")
    });

    it("Test Case 2845: Testing Custom Tip waiting time (1 second)", () => {
      const productCategory = dataPage.productSimple.productCategory
      const productName = dataPage.productSimple.productName
      const tipValue = "$10.00" //$10.00

      handoffPage.mockAllHandoffMethodsAvailable()
      cy.visit("/");
      cy.wait(3000);
      handoffPage.accessMenuPageWithinPickupOption()
      menuPage.selectCategory(productCategory)
      menuPage.addProductToBasket(productName)
      commonPage.navbarCart().click()
      cartPage.checkoutButton().click()
      checkoutPage.tipValue().should("have.text","$0.00")
      checkoutPage.customTipInputField().type(tipValue)
      cy.wait(2000)
      checkoutPage.tipValue().should("have.text",tipValue)
    });

    it("Test Case 1210: Curbside additional details", () => {
      handoffPage.mockAllHandoffMethodsAvailable()
      checkoutPage.goToCheckoutWithPickup();

      checkoutPage.curbsidePickupType().click()
      checkoutPage.carMake().should("exist")
      checkoutPage.carColor().should("exist")
      checkoutPage.carModel().should("exist")

      checkoutPage.driveUpPickupType().click()
      checkoutPage.carMake().should("not.exist")
      checkoutPage.carColor().should("not.exist")
      checkoutPage.carModel().should("not.exist")
    });

    it("Test Case 3401: Handle payment method buttons", () => {

      handoffPage.mockAllHandoffMethodsAvailable();
      checkoutPage.goToCheckoutWithPickup();
      cy.scrollTo("bottom")
      checkoutPage.paymentMethodSectionTitle().should("be.visible")
      checkoutPage.giftCardPaymentButton().should("be.visible")
      checkoutPage.creditCardPaymentButton().should("be.visible")
      checkoutPage.applePayPaymentButton().should("be.visible")
      checkoutPage.googlePayPaymentButton().should("be.visible")
    });

    it("Test Case 3095: Zipcoin component should render in checkout page", () => {
      handoffPage.mockAllHandoffMethodsAvailable();
      checkoutPage.goToCheckoutWithPickup();
      cy.scrollTo("bottom")
      checkoutPage.zipCoinTitle().should("be.visible")
      checkoutPage.signUpButton().should("be.visible")
      checkoutPage.logInButton().should("be.visible")
    });

    it("Test Case 3490: Toast message for unavailable items in specific pickup types", () => {
      handoffPage.mockAllHandoffMethodsAvailable();
      cy.visit("/")
      handoffPage.accessMenuPageWithinPickupOption()
      cy.scrollTo("bottom")
      menuPage.selectCategory(dataPage.productSimple.productCategory)
      menuPage.addProductToBasket(dataPage.productWithSpecificHandoffMethod.productPickupOnly)
      commonPage.navbarCart().click()
      checkoutPage.checkoutButton().click()
      checkoutPage.driveUpPickupType().click()
      commonPage.toastElement().contains("Something went wrong!").should("be.visible")
    });
  });

  context("Mobile", () => {
    beforeEach(() => {
      handoffPage.mockAllAvailableRestaurants();
      cy.viewport(Cypress.env("mobile"));
      cy.visit("/");
    });

    //TODO: checkoutButton is not working
    it(["Bug"],"Test Case 421: Display Pickup Type Buttons on Mobile Web & App",
      () => {
        const productCategory = dataPage.productSimple.productCategory;
        const productName = dataPage.productSimple.productName;

        cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor");
        cy.wait(5000);
        menuPage.selectCategory(productCategory);
        menuPage.addProductToBasket(productName);
        commonPage.navbarCart().click();
        cartPage.checkoutButton().click();

        checkoutPage.curbsidePickupType().should("be.visible");
        checkoutPage
          .curbsidePickupType()
          .should("contain.text", "Order brought to your vehicle");
        checkoutPage.driveUpPickupType().should("be.visible");
        checkoutPage
          .driveUpPickupType()
          .should("contain.text", "Pull up to drive up window");
        checkoutPage.inStorePickupType().should("be.visible");
        checkoutPage
          .inStorePickupType()
          .should("contain.text", "Counter or locker inside");
      }
    );
  });
});
