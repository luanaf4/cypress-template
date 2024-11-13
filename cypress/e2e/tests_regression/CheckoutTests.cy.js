import CommonPage from "../pages/CommonPage";
import DataPage from "../pages/DataPage"; 
import HandoffPage from "../pages/HandoffPage";
import MenuPage from "../pages/MenuPage";
import ChangeHandoffModalPage from "../pages/ChangeHandoffModalPage";
import ProductDescriptionPage from "../pages/ProductDescriptionPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";

//Declare all pages here
const commonPage = new CommonPage();
const dataPage = require("../pages/DataPage");
const handoffPage = new HandoffPage();
const menuPage = new MenuPage();
const cartPage = new CartPage();
const changeHandoffModalPage = new ChangeHandoffModalPage();
const productDescriptionPage = new ProductDescriptionPage();
const checkoutPage = new CheckoutPage();

describe("Checkout", () => {
    context("Desktop", () => {
      beforeEach(function () {
        cy.viewport(Cypress.env("desktop"));
      });
  
      it("Test Case 2720: Checkout - Verify Costumer Information Fields for Pickup", () => {
        cy.visit("/checkout");
        checkoutPage.checkoutCustomerTitle().should("exist")
        checkoutPage.firstNameField().should("exist")
        checkoutPage.lastNameField().should("exist")
        checkoutPage.emailAddressField().should("exist")
        checkoutPage.phoneNumberField().should("exist")
        checkoutPage.firstNameField().click()
        checkoutPage.checkoutCustomerTitle().click()
        checkoutPage.firstNameErrorMessage().should("exist")
        checkoutPage.lastNameField().click()
        checkoutPage.checkoutCustomerTitle().click()
        checkoutPage.lastNameErrorMessage().should("exist")
        checkoutPage.emailAddressField().click()
        checkoutPage.checkoutCustomerTitle().click()
        checkoutPage.emailErrorMessage().should("exist")
        checkoutPage.phoneNumberField().click()
        checkoutPage.checkoutCustomerTitle().click()
        checkoutPage.phoneErrorMessage().should("exist")
      });

      it("Test Case 2721: Checkout - Verify Pickup Type", () => {
        checkoutPage.goToCheckoutWithPickup()
        checkoutPage.curbsidePickupType().should("exist")
        checkoutPage.driveUpPickupType().should("exist")
        checkoutPage.inStorePickupType().should("exist")
        checkoutPage.driveUpPickupType().click()
        checkoutPage.inStorePickupType().click()
        checkoutPage.curbsidePickupType().click()
        checkoutPage.carColor().should("exist")
        checkoutPage.carMake().should("exist")
        checkoutPage.carModel().should("exist")
      });

      it("Test Case 2722: Checkout - Verify Tipping", () => {
        checkoutPage.goToCheckoutWithPickup()
        cy.scrollTo("bottom")
        checkoutPage.noTip().should("exist")
        checkoutPage.tenTip().should("exist")
        checkoutPage.fifteenTip().should("exist")
        checkoutPage.customTip().should("exist")
        checkoutPage.tipValue().should("contain","$0.00")

        checkoutPage.tenTip().click()
        cy.wait(2000)
        checkoutPage.subtotalValue().then(($subtotal) => {
            const subtotalText = $subtotal.text().replace('$', '');  
            const subtotalValue = parseFloat(subtotalText);
          
            const expectedTipValue = (subtotalValue * 0.10).toFixed(2); 
          
            checkoutPage.tipValue().then(($tip) => {
              const tipText = $tip.text().replace('$', '');  
              const tipValue = parseFloat(tipText);
              expect(tipValue).to.eq(parseFloat(expectedTipValue));
            });
          });

        checkoutPage.fifteenTip().click()
        cy.wait(2000)
        checkoutPage.subtotalValue().then(($subtotal) => {
            const subtotalText = $subtotal.text().replace('$', '');  
            const subtotalValue = parseFloat(subtotalText);
          
            const expectedTipValue = (subtotalValue * 0.15).toFixed(2); 
          
            checkoutPage.tipValue().then(($tip) => {
              const tipText = $tip.text().replace('$', '');  
              const tipValue = parseFloat(tipText);
              expect(tipValue).to.eq(parseFloat(expectedTipValue));
            });
          });

        checkoutPage.customTip().type("20")
        cy.wait(2000)
        checkoutPage.tipValue().should("contain","$0.20")
      });

      it("Test Case 2723: Checkout - Verify Total Price", () => {
        checkoutPage.goToCheckoutWithPickup()
        cy.scrollTo("bottom")
        checkoutPage.tenTip().click()
        cy.wait(1000)
        checkoutPage.subtotalValue().then(($subtotal) => {
            const subtotalText = $subtotal.text().replace('$', '');
            const subtotalValue = parseFloat(subtotalText);
          
            checkoutPage.tipValue().then(($tip) => {
              const tipText = $tip.text().replace('$', '');
              const tipValue = parseFloat(tipText);
          
              checkoutPage.estimatedTaxValue().then(($tax) => {
                const taxText = $tax.text().replace('$', '');
                const estimatedTaxValue = parseFloat(taxText);
          
                const expectedTotalValue = (subtotalValue + tipValue + estimatedTaxValue).toFixed(2);
          
                checkoutPage.totalValue().then(($total) => {
                  const totalText = $total.text().replace('$', '');
                  const totalValue = parseFloat(totalText);
          
                  expect(totalValue).to.eq(parseFloat(expectedTotalValue));
                });
              });
            });
          });          
      });

      //TODO: payment not implemented yet
      it("Test Case 2724: Checkout - Verify Payment Methods for Pickup", () => {
        cy.log("input tests here");
      });

      //TODO: payment not implemented yet
      it("Test Case 2725: Checkout - Verify Payment Methods for Delivery", () => {
        cy.log("input tests here");
      });

      it("Test Case 2726: Checkout - Verify Costumer Information Fields for Delivery", () => {
        checkoutPage.goToCheckoutWithDelivery()
        checkoutPage.firstNameField().should("exist")
        checkoutPage.lastNameField().should("exist")
        checkoutPage.emailAddressField().should("exist")
        checkoutPage.phoneNumberField().should("exist")
        checkoutPage.deliveryAddressField().should("exist")
        checkoutPage.firstNameField().click()
        checkoutPage.checkoutCustomerTitle().click()
        checkoutPage.firstNameErrorMessage().should("exist")

        checkoutPage.lastNameField().click()
        checkoutPage.checkoutCustomerTitle().click()
        checkoutPage.lastNameErrorMessage().should("exist")

        checkoutPage.emailAddressField().click()
        checkoutPage.checkoutCustomerTitle().click()
        checkoutPage.emailErrorMessage().should("exist")

        checkoutPage.phoneNumberField().click()
        checkoutPage.checkoutCustomerTitle().click()
        checkoutPage.phoneErrorMessage().should("exist")

        checkoutPage.deliveryAddressField().click().clear()
        checkoutPage.checkoutCustomerTitle().click()
        checkoutPage.deliveryAddressErrorMessage().should("exist")
      });

      it("Test Case 2727: Checkout - Verify Checkout Screen for Guests", () => {
        cy.visit("/checkout");
        checkoutPage.zipCoinTitle().should("be.visible")
        checkoutPage.signUpButton().should("be.visible")
        checkoutPage.logInButton().should("be.visible")
      });

      //TODO: payment not implemented yet
      it("Test Case 2728: Checkout - Verify Zippy's Gift Card as Payment Method", () => {
        cy.log("input tests here");
      });

      //TODO: payment not implemented yet
      it("Test Case 2729: Checkout - Verify Credit Card as Payment Method", () => {
        cy.log("input tests here");
      });

      //TODO: payment not implemented yet
      it("Test Case 2730: Checkout - Verify Cash as Payment Method", () => {
        cy.log("input tests here");
      });
    });
  
    context("Mobile", () => {
      beforeEach(() => {
        cy.viewport(Cypress.env("mobile"));
        cy.wait(500);
      });
  
      it("Test Case 2720: Checkout - Verify Costumer Information Fields for Pickup", () => {
        cy.visit("/checkout");
        checkoutPage.checkoutCustomerTitle().should("exist")
        checkoutPage.firstNameField().should("exist")
        checkoutPage.lastNameField().should("exist")
        checkoutPage.emailAddressField().should("exist")
        checkoutPage.phoneNumberField().should("exist")
        checkoutPage.firstNameField().click()
        checkoutPage.checkoutCustomerTitle().click()
        checkoutPage.firstNameErrorMessage().should("exist")
        checkoutPage.lastNameField().click()
        checkoutPage.checkoutCustomerTitle().click()
        checkoutPage.lastNameErrorMessage().should("exist")
        checkoutPage.emailAddressField().click()
        checkoutPage.checkoutCustomerTitle().click()
        checkoutPage.emailErrorMessage().should("exist")
        checkoutPage.phoneNumberField().click()
        checkoutPage.checkoutCustomerTitle().click()
        checkoutPage.phoneErrorMessage().should("exist")
      });

      it("Test Case 2721: Checkout - Verify Pickup Type", () => {
        checkoutPage.goToCheckoutWithPickup()
        checkoutPage.curbsidePickupType().should("exist")
        checkoutPage.driveUpPickupType().should("exist")
        checkoutPage.inStorePickupType().should("exist")
        checkoutPage.driveUpPickupType().click()
        checkoutPage.inStorePickupType().click()
        checkoutPage.curbsidePickupType().click()
        checkoutPage.carColor().should("exist")
        checkoutPage.carMake().should("exist")
        checkoutPage.carModel().should("exist")
      });

      it("Test Case 2722: Checkout - Verify Tipping", () => {
        checkoutPage.goToCheckoutWithPickup()
        cy.scrollTo("bottom")
        checkoutPage.noTip().should("exist")
        checkoutPage.tenTip().should("exist")
        checkoutPage.fifteenTip().should("exist")
        checkoutPage.customTip().should("exist")
        checkoutPage.tipValue().should("contain","$0.00")

        checkoutPage.tenTip().click()
        cy.wait(2000)
        checkoutPage.subtotalValue().then(($subtotal) => {
            const subtotalText = $subtotal.text().replace('$', '');  
            const subtotalValue = parseFloat(subtotalText);
          
            const expectedTipValue = (subtotalValue * 0.10).toFixed(2); 
          
            checkoutPage.tipValue().then(($tip) => {
              const tipText = $tip.text().replace('$', '');  
              const tipValue = parseFloat(tipText);
              expect(tipValue).to.eq(parseFloat(expectedTipValue));
            });
          });

        checkoutPage.fifteenTip().click()
        cy.wait(2000)
        checkoutPage.subtotalValue().then(($subtotal) => {
            const subtotalText = $subtotal.text().replace('$', '');  
            const subtotalValue = parseFloat(subtotalText);
          
            const expectedTipValue = (subtotalValue * 0.15).toFixed(2); 
          
            checkoutPage.tipValue().then(($tip) => {
              const tipText = $tip.text().replace('$', '');  
              const tipValue = parseFloat(tipText);
              expect(tipValue).to.eq(parseFloat(expectedTipValue));
            });
          });

        checkoutPage.customTip().type("20")
        cy.wait(2000)
        checkoutPage.tipValue().should("contain","$0.20")
      });

      it("Test Case 2723: Checkout - Verify Total Price", () => {
        checkoutPage.goToCheckoutWithPickup()
        cy.scrollTo("bottom")
        checkoutPage.tenTip().click()
        cy.wait(1000)
        checkoutPage.subtotalValue().then(($subtotal) => {
            const subtotalText = $subtotal.text().replace('$', '');
            const subtotalValue = parseFloat(subtotalText);
          
            checkoutPage.tipValue().then(($tip) => {
              const tipText = $tip.text().replace('$', '');
              const tipValue = parseFloat(tipText);
          
              checkoutPage.estimatedTaxValue().then(($tax) => {
                const taxText = $tax.text().replace('$', '');
                const estimatedTaxValue = parseFloat(taxText);
          
                const expectedTotalValue = (subtotalValue + tipValue + estimatedTaxValue).toFixed(2);
          
                checkoutPage.totalValue().then(($total) => {
                  const totalText = $total.text().replace('$', '');
                  const totalValue = parseFloat(totalText);
          
                  expect(totalValue).to.eq(parseFloat(expectedTotalValue));
                });
              });
            });
          });          
      });

      //TODO: payment not implemented yet
      it("Test Case 2724: Checkout - Verify Payment Methods for Pickup", () => {
        cy.log("input tests here");
      });

      //TODO: payment not implemented yet
      it("Test Case 2725: Checkout - Verify Payment Methods for Delivery", () => {
        cy.log("input tests here");
      });

      it("Test Case 2726: Checkout - Verify Costumer Information Fields for Delivery", () => {
        checkoutPage.goToCheckoutWithDelivery()
        checkoutPage.firstNameField().should("exist")
        checkoutPage.lastNameField().should("exist")
        checkoutPage.emailAddressField().should("exist")
        checkoutPage.phoneNumberField().should("exist")
        checkoutPage.deliveryAddressField().should("exist")
        checkoutPage.firstNameField().click()
        checkoutPage.checkoutCustomerTitle().click()
        checkoutPage.firstNameErrorMessage().should("exist")

        checkoutPage.lastNameField().click()
        checkoutPage.checkoutCustomerTitle().click()
        checkoutPage.lastNameErrorMessage().should("exist")

        checkoutPage.emailAddressField().click()
        checkoutPage.checkoutCustomerTitle().click()
        checkoutPage.emailErrorMessage().should("exist")

        checkoutPage.phoneNumberField().click()
        checkoutPage.checkoutCustomerTitle().click()
        checkoutPage.phoneErrorMessage().should("exist")

        checkoutPage.deliveryAddressField().click().clear()
        checkoutPage.checkoutCustomerTitle().click()
        checkoutPage.deliveryAddressErrorMessage().should("exist")
      });

      it("Test Case 2727: Checkout - Verify Checkout Screen for Guests", () => {
        cy.visit("/checkout");
        checkoutPage.zipCoinTitle().should("be.visible")
        checkoutPage.signUpButton().should("be.visible")
        checkoutPage.logInButton().should("be.visible")
      });
      
      //TODO: payment not implemented yet
      it("Test Case 2728: Checkout - Verify Zippy's Gift Card as Payment Method", () => {
        cy.log("input tests here");
      });

      //TODO: payment not implemented yet
      it("Test Case 2729: Checkout - Verify Credit Card as Payment Method", () => {
        cy.log("input tests here");
      });

      //TODO: payment not implemented yet
      it("Test Case 2730: Checkout - Verify Cash as Payment Method", () => {
        cy.log("input tests here");
      });
    });
  });