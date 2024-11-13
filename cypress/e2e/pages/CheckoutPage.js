import CommonPage from "../pages/CommonPage";
import DataPage from "../pages/DataPage"; 
import HandoffPage from "../pages/HandoffPage";
import MenuPage from "../pages/MenuPage";
import ChangeHandoffModalPage from "../pages/ChangeHandoffModalPage";
import ProductDescriptionPage from "../pages/ProductDescriptionPage";

//Declare all pages here
const commonPage = new CommonPage();
const dataPage = require("../pages/DataPage");
const handoffPage = new HandoffPage();
const menuPage = new MenuPage();
const changeHandoffModalPage = new ChangeHandoffModalPage();
const productDescriptionPage = new ProductDescriptionPage();

class CheckoutPage {
  //Element Mapping
  firstNameField() {
    return cy.get("#firstNameCustomerForm");
  }

  checkoutButton() {
    return cy.get('[data-testid="CartCheckoutButton"]')
  }

  lastNameField() {
    return cy.get("#lastNameCustomerForm");
  }

  deliveryAddressField() {
    return cy.get("#addressCustomerForm");
  }

  emailAddressField() {
    return cy.get("#emailCustomerForm");
  }

  phoneNumberField() {
    return cy.get("#phoneCustomerForm");
  }

  curbsidePickupType() {
    return cy.get("#pickupTypeCurbside");
  }

  driveUpPickupType() {
    return cy.get("#pickupTypeDriveUp");
  }

  inStorePickupType() {
    return cy.get("#pickupTypeInStore");
  }

  carColor() {
    return cy.get('#color')
  }

  carModel() {
    return cy.get('#model')
  }

  carMake() {
    return cy.get('#make')
  }

  checkoutPickupTitle() {
    return cy.get("#checkoutPickupTypeTitle");
  }

  checkoutCustomerTitle() {
    return cy.get("#checkoutCustomerTitle");
  }

  firstNameErrorMessage() {
    return cy.contains("Please enter your first name");
  }

  lastNameErrorMessage() {
    return cy.contains("Please enter your last name");
  }

  emailErrorMessage() {
    return cy.contains("Please enter a valid email address");
  }

  phoneErrorMessage() {
    return cy.contains("Please enter a valid phone number");
  }

  deliveryAddressErrorMessage() {
    return cy.contains("Please enter a delivery address");
  }

  deliveryInstructionsTextLimit() {
    return cy.get("#deliveryInstructionsCustomerForm-textLimit");
  }

  deliveryInstructionsField() {
    return cy.get("#deliveryInstructionsCustomerForm");
  }

  customTipInputField() {
    return cy.get('[data-testid="custom-input-tip"]')
  }

  noTip() {
    return cy.get('[data-testid="button-tip-0"]')
  }

  tenTip() {
    return cy.get('[data-testid="button-tip-10"]')
  }

  fifteenTip() {
    return cy.get('[data-testid="button-tip-15"]')
  }

  customTip() {
    return cy.get('[data-testid="custom-input-tip"]')
  }

  tipLabel() {
    return cy.get('[data-testid="CheckoutAmountReview-2-description"]')
  }

  tipValue() {
    return cy.get('[data-testid="CheckoutAmountReview-2-value"]')
  }

  estimatedTaxValue() {
    return cy.get('[data-testid="CheckoutAmountReview-1-value"]')
  }

  subtotalValue() {
    return cy.get('[data-testid="CheckoutAmountReview-0-value"]')
  }

  totalValue() {
    return cy.get('[data-testid="CheckoutAmountReview-5-value"]')
  }

  zipCoinTitle() {
    return cy.get('[data-testid="zip-coin-title"]').contains("YOU COULD BE EARNING ZIPCOIN REWARD POINTS")
  }

  signUpButton() {
    return cy.get('[data-testid="signup-button"]')
  }

  logInButton() {
    return cy.get('[data-testid="login-button"]')
  }

  paymentMethodSectionTitle() {
    return cy.get('[data-testid="checkout-payment-method-title"]')
  }

  giftCardPaymentButton() {
    return cy.get('[data-testid="payment-buttons"]').contains("GIFT CARD")
  }

  creditCardPaymentButton() {
    return cy.get('[data-testid="payment-buttons"]').contains("CREDIT CARD")
  }

  applePayPaymentButton() {
    return cy.get('[data-testid="payment-buttons"]').contains("APPLE PAY")
  }

  googlePayPaymentButton() {
    return cy.get('[data-testid="payment-buttons"]').contains("GOOGLE PAY")
  }

  errorChangingPickup() {
    return cy.get('[data-testid="add-product-toast"]').contains("Something went wrong!");
  }



  // Methods

  goToCheckoutPage() {
    commonPage.checkoutButton().click();
    cy.wait(1000);
    commonPage.checkoutButton().click();
    cy.wait(1000);
  }


  goToCheckoutWithPickup() {
    handoffPage.mockAllAvailableRestaurants();
    cy.visit("/")
    handoffPage.accessMenuPageWithinPickupOption()
    cy.scrollTo("bottom")
    menuPage.selectCategory(dataPage.productSimple.productCategory)
    menuPage.addProductToBasket(dataPage.productSimple.productName)
    commonPage.navbarCart().click()
    this.checkoutButton().click()
  }

  goToCheckoutWithDelivery() {
    handoffPage.mockAllAvailableRestaurants();
    cy.visit("/")
    handoffPage.accessMenuPageWithinDeliveryOption()
    cy.scrollTo("bottom")
    menuPage.selectCategory(dataPage.productSimple.productCategory)
    menuPage.addProductToBasket(dataPage.productSimple.productName)
    commonPage.navbarCart().click()
    this.checkoutButton().click()
  }

  
}
export default CheckoutPage;
