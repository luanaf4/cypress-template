//Import all necessary pages here
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
const changeHandoffModalPage = new ChangeHandoffModalPage();
const productDescriptionPage = new ProductDescriptionPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();

const restaurantName = dataPage.restaurant.validRestaurantName;
const validAddress = dataPage.delivery.validDeliveryAddress;

describe("Cart", () => {
  context("Desktop", () => {
    beforeEach(() => {
      handoffPage.mockAllAvailableRestaurants();
      cy.viewport(Cypress.env("desktop"));

    });

    it("Test Case 2712: Cart - Verify cart empty state", () => {
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor");
      cy.wait(5000);
      commonPage.navbarCart().click();
      cartPage.cartHeader().should("be.visible").should("have.text", "Cart");
      cartPage.cartEmptyState().should("be.visible");
      cartPage.cartStartOrderCTAButon().should("be.visible").click();
      cy.url().should(
        "contain",
        "/menu/zippys-restaurants-sandbox-demo-vendor"
      );
    });

    it("Test Case 2711: Cart - Verify adding a product to the cart", () => {
      const productName = dataPage.productWithModifiers.productName;

      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor/products/687422");
      cy.wait(3000);
      productDescriptionPage.addProductToCart().click();
      commonPage.navbarCart().click();
      cy.url("contains", "menu/zippys-restaurants-sandbox-demo-vendor");
      cartPage.cartEmptyState().should("not.exist");
      cartPage.cartProductName(productName).should("be.visible");
      cartPage.checkoutButton().should("be.visible");
      cartPage.quantityPicker().should("have.text","1")
      cartPage.removeQuantityButton().should("be.visible")
      cartPage.addQuantityButton().should("be.visible")
      cartPage.mayWeSuggestList().should("exist").should("not.be.empty")
    });

    //TODO: Not implemented yet
    it("Test Case 2713: Cart - Verify editing a product in the cart", () => {
      const productCategory = dataPage.productSimple.productCategory;
      const productName = dataPage.productSimple.productName;

      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor");
      cy.wait(5000);
      menuPage.selectCategory(productCategory);
      menuPage.addProductToBasket(productName);
      commonPage.navbarCart().click();

      cartPage
        .productPrice()
        .invoke("text")
        .then((text) => {
          const price = parseFloat(text.replace("$", ""));

          cartPage.numberQuantityButton().should("have.text", "1");
          cartPage.addQuantityButton().click();
          cy.wait(1500);
          cartPage.numberQuantityButton().should("have.text", "2");

          cartPage
            .productPrice()
            .invoke("text")
            .then((updatedText) => {
              const updatedPrice = parseFloat(updatedText.replace("$", ""));
              expect(updatedPrice).to.equal(price * 2);
            });

          cartPage.addQuantityButton().click();
          cy.wait(1500);
          cartPage.numberQuantityButton().should("have.text", "3");

          cartPage
            .productPrice()
            .invoke("text")
            .then((updatedText) => {
              const updatedPrice = parseFloat(updatedText.replace("$", ""));
              expect(updatedPrice).to.equal(price * 3);
            });

          cartPage.removeQuantityButton().click();
          cy.wait(1500);
          cartPage.numberQuantityButton().should("have.text", "2");

          cartPage
            .productPrice()
            .invoke("text")
            .then((updatedText) => {
              const updatedPrice = parseFloat(updatedText.replace("$", ""));
              expect(updatedPrice).to.equal(price * 2);
            });

          cartPage.removeQuantityButton().click();
          cy.wait(1500);
          cartPage.numberQuantityButton().should("have.text", "1");

          cartPage
            .productPrice()
            .invoke("text")
            .then((updatedText) => {
              const updatedPrice = parseFloat(updatedText.replace("$", ""));
              expect(updatedPrice).to.equal(price * 1);
            });
        });
        cartPage.editButton().click()
        productDescriptionPage.productTitle().should("have.text",productName)
    });

    //TODO: Bug 3128: Wrong values on product price, subtotal and total in checkout page
    it(["Bug"],"Test Case 2714: Cart - Verify the prices displayed in the cart for pickup", () => {
      const addon1 = dataPage.productWithModifiers.addon1
      const productCategory = dataPage.productWithModifiers.productCategory
      const productName = dataPage.productWithModifiers.productName

      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor");
      cy.wait(5000);
      menuPage.selectCategory(productCategory)
      menuPage.selectProduct(productName)
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor/products/687422");
      cy.wait(3000);
      productDescriptionPage.addonProduct(addon1).click();
      productDescriptionPage.addProductToCart().click();
      productDescriptionPage.productCost().invoke('text').then((productCostText) => {
        const productCostValue = parseFloat(productCostText.replace(/[^0-9.-]+/g,""));
  
        cy.wait(2000);
        commonPage.navbarCart().click();
        cartPage.cartHeader().should("be.visible");

        cartPage.productPrice().invoke('text').then((productPriceText) => {
          const productPriceValue = parseFloat(productPriceText.replace(/[^0-9.-]+/g,""));
  
          expect(productPriceValue).to.equal(productCostValue);
        });
      });
      cartPage.cartContainer().scrollTo("bottom")
      cartPage.estimatedTaxLabel().should("be.visible").should("not.be.empty")
      cartPage.checkoutButton().click()
      cy.wait(2000)
      cy.url().should("contain","/checkout")
    });

    //TODO: Bug 3126: Different pickup and delivery time date and hours between menu and cart
    it(["Bug"],"Test Case 2715: Cart - Verify restaurant informations displayed in the cart for pickup", () => {
      const productCategory = dataPage.productWithModifiers.productCategory
      const productName = dataPage.productWithModifiers.productName

      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor");
      cy.wait(5000);
      menuPage.selectCategory(productCategory)
      menuPage.selectProduct(productName)
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor/products/687422");
      cy.wait(3000);
      productDescriptionPage.addProductToCart().click();
      cy.wait(2000);

      // Validate handoff time in the cart
      menuPage.handoffTimeDesktop().invoke("text").then((handoffTime1) => {
        commonPage.navbarCart().click();
        cartPage.cartHeader().should("be.visible");
        cartPage.cartHandoffTime().should("contain", handoffTime1);
      });

      cartPage.cartCloseIcon().click()
      cy.wait(2000)
      menuPage.handoffTimeDesktop().click()
      changeHandoffModalPage.pickupTimeHeader().should("be.visible")
      changeHandoffModalPage.datePicker().click()
      changeHandoffModalPage.dateOption(1).click()
      changeHandoffModalPage.timePicker().click()
      changeHandoffModalPage.timeOption(1).click()
      changeHandoffModalPage.saveChangesButton().click()

      menuPage.handoffTimeDesktop().invoke("text").then((handoffTime2) => {
        commonPage.navbarCart().click();
        cartPage.cartHeader().should("be.visible");
        cartPage.cartHandoffTime().should("contain", handoffTime2);
      });
    
      cartPage.cartContainer().scrollTo("bottom")
      cartPage.estimatedTaxLabel().should("be.visible").should("not.be.empty")
      cartPage.checkoutButton().click()
      cy.wait(2000)
      cy.url().should("contain","/checkout")
    });

    //TODO: Bug 3126: Different pickup an delivery time date and hours between menu and cart
    it(["Bug"],"Test Case 2716: Cart - Verify restaurant informations displayed in the cart for delivery", () => {
      const addon1 = dataPage.productWithModifiers.addon1
      const productCategory = dataPage.productWithModifiers.productCategory
      const productName = dataPage.productWithModifiers.productName

      cy.visit("/");
      cy.wait(5000);
      handoffPage.accessMenuPageWithinDeliveryOption()
      menuPage.selectCategory(productCategory)
      menuPage.selectProduct(productName)
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor/products/687422");
      cy.wait(3000);
      productDescriptionPage.addProductToCart().click();
      cy.wait(2000);

      // Validate handoff time in the cart
      menuPage.handoffTimeDesktop().invoke("text").then((handoffTime1) => {
        commonPage.navbarCart().click();
        cartPage.cartHeader().should("be.visible");
        cartPage.cartHandoffTime().should("contain", handoffTime1);
      });

      cartPage.cartCloseIcon().click()
      cy.wait(2000)
      menuPage.handoffTimeDesktop().click()
      changeHandoffModalPage.pickupTimeHeader().should("be.visible")
      changeHandoffModalPage.datePicker().click()
      changeHandoffModalPage.dateOption(1).click()
      changeHandoffModalPage.timePicker().click()
      changeHandoffModalPage.timeOption(1).click()
      changeHandoffModalPage.saveChangesButton().click()
      cy.wait(1000)

      menuPage.handoffTimeDesktop().invoke("text").then((handoffTime2) => {
        commonPage.navbarCart().click();
        cartPage.cartHeader().should("be.visible");
        cartPage.cartHandoffTime().should("contain", handoffTime2);
      });
    
      cartPage.cartContainer().scrollTo("bottom")
      cartPage.estimatedTaxLabel().should("be.visible").should("not.be.empty")
      cartPage.checkoutButton().click()
      cy.wait(2000)
      cy.url().should("contain","/checkout")
    });

    it("Test Case 2717: Cart - Verify 'May We Suggest' Section", () => {
      const productCategory = dataPage.productSimple.productCategory;
      const productName = dataPage.productSimple.productName;
    
      // Visit the page and add the product to the cart
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor");
      cy.wait(3000);
      menuPage.selectCategory(productCategory);
      menuPage.addProductToBasket(productName);
    
      // Open the cart and validate the upsell section
      commonPage.navbarCart().click();
      cartPage.mayWeSuggestTitle().should("be.visible");
      cartPage.mayWeSuggestList().should("not.be.empty");
    
      // Capture the initial total price
      cartPage.checkoutButton().invoke('text').then((text) => {
        cy.log('Checkout button text (initial):', text); // Log the extracted text
    
        // Use regex to remove all non-digit characters except the decimal point
        const cleanedTotal1 = text.replace(/[^0-9.]/g, '').trim();
        cy.log('Cleaned total1:', cleanedTotal1); // Log the cleaned value
        
        const totalPrice1 = parseFloat(cleanedTotal1);  // Convert the cleaned string to a number
        cy.log('Initial total price (parsed):', totalPrice1);
    
        // Iterate over each item in the upsell list and click on the first one that contains a price
        cartPage.mayWeSuggestList().find('button').each(($el) => {
          const price = $el.find('div#upsellCardPriceCal p').first().text().trim();
          
          // Check if price is not empty or $0
          if (price && price !== '$0') {
            cy.wrap($el).click(); // Click the button that contains the price
            cy.wait(1000);
    
            // Capture the total price after selecting an upsell option
            cartPage.checkoutButton().invoke('text').then((text) => {
              cy.log('Checkout button text (after click):', text); // Log the extracted text
    
              // Use regex to remove all non-digit characters except the decimal point
              const cleanedTotal2 = text.replace(/[^0-9.]/g, '').trim();
              cy.log('Cleaned total2:', cleanedTotal2); // Log the cleaned value
    
              const totalPrice2 = parseFloat(cleanedTotal2);  // Convert the string to a number
              cy.log('Second total price (parsed):', totalPrice2);

              // Assert that the price has changed
              expect(totalPrice1).to.not.equal(totalPrice2);
            });
    
            return false; // Exit the loop after clicking the first item with a valid price
          }
        });
      });
    });

    it("Test Case 2718: Cart - Verify Utensils Option", () => {
      const productCategory = dataPage.productSimple.productCategory;
      const productName = dataPage.productSimple.productName;
    
      // Visit the page and add the product to the cart
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor");
      cy.wait(3000);
      menuPage.selectCategory(productCategory);
      menuPage.addProductToBasket(productName);
    
      // Open the cart and validate the upsell section
      commonPage.navbarCart().click();
      cartPage.mayWeSuggestTitle().should("be.visible");
      cartPage.mayWeSuggestList().should("not.be.empty");
    
      // Capture the initial total price
      cartPage.checkoutButton().invoke('text').then((text) => {
        cy.log('Checkout button text (initial):', text); // Log the extracted text
    
        // Use regex to remove all non-digit characters except the decimal point
        const cleanedTotal1 = text.replace(/[^0-9.]/g, '').trim();
        cy.log('Cleaned total1:', cleanedTotal1); // Log the cleaned value
        
        const totalPrice1 = parseFloat(cleanedTotal1);  // Convert the cleaned string to a number
        cy.log('Initial total price (parsed):', totalPrice1);
    
        // Click the utensils button
        cartPage.addUtensilsButton().click();
    
        // Capture the total price after clicking the utensils button
        cartPage.checkoutButton().invoke('text').then((text) => {
          cy.log('Checkout button text (after click):', text); // Log the extracted text
    
          // Use regex to remove all non-digit characters except the decimal point
          const cleanedTotal2 = text.replace(/[^0-9.]/g, '').trim();
          cy.log('Cleaned total2:', cleanedTotal2); // Log the cleaned value
    
          const totalPrice2 = parseFloat(cleanedTotal2);  // Convert the string to a number
          cy.log('Second total price (parsed):', totalPrice2);
    
          // Assert that the price has not changed
          expect(totalPrice1).to.equal(totalPrice2); // The price should remain the same
        });          
      });
    });

    it("Test Case 2719: Cart - Verify the prices displayed in the cart for pickup", () => {
      const productCategory1 = dataPage.productSimple.productCategory;
      const productName1 = dataPage.productSimple.productName;
    
      const productCategory2 = dataPage.productWithModifiers.productCategory;
      const productName2 = dataPage.productWithModifiers.productName;
    
      // Visit the page and add the first product to the cart
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor");
      cy.wait(3000);
      
      menuPage.selectCategory(productCategory1);
      menuPage.addProductToBasket(productName1);
    
      // Open the cart and capture the initial total price
      commonPage.navbarCart().click();
      cartPage.mayWeSuggestTitle().should("be.visible");
      cartPage.mayWeSuggestList().should("not.be.empty");
    
      cartPage.checkoutButton().invoke('text').then((text1) => {
        cy.log('Checkout button text (initial):', text1);
    
        // Clean the price and convert it to a number
        const cleanedTotal1 = text1.replace(/[^0-9.]/g, '').trim();
        const totalPrice1 = parseFloat(cleanedTotal1);
        cy.log('Initial total price:', totalPrice1);
    
        // Close the cart
        cartPage.cartCloseIcon().click();
        
        // Add a second item to the basket
        menuPage.selectCategory(productCategory2);
        menuPage.addProductToBasket(productName2);
    
        // Open the cart again and capture the updated total price
        commonPage.navbarCart().click();
    
        cartPage.checkoutButton().invoke('text').then((text2) => {
          cy.log('Checkout button text (updated):', text2);
    
          // Clean the price and convert it to a number
          const cleanedTotal2 = text2.replace(/[^0-9.]/g, '').trim();
          const totalPrice2 = parseFloat(cleanedTotal2);
          cy.log('Updated total price:', totalPrice2);
    
          // Assert that the total price has updated after adding the second item
          expect(totalPrice2).to.be.greaterThan(totalPrice1); // The price should increase
        });
      });
      cartPage.cartProductName(productName1).should("be.visible").log("Verify if 1st product was added to basket")
      cy.wait(500)
      cartPage.cartProductName(productName2).should("be.visible").log("Verify if 2nd product was added to basket")
      cartPage.checkoutButton().click()
      cy.wait(2000)
      cy.url().should("contain","/checkout")
    });
    
    
  });


  context("Mobile", () => {
    beforeEach(() => {
      handoffPage.mockAllAvailableRestaurants();
      cy.viewport(Cypress.env("mobile"));

    });

    it("Test Case 2712: Cart - Verify cart empty state", () => {
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor");
      cy.wait(5000);
      commonPage.navbarCart().click();
      cartPage.cartHeader().should("be.visible").should("have.text", "Cart");
      cartPage.cartEmptyState().should("be.visible");
      cartPage.cartStartOrderCTAButon().should("be.visible").click();
      cy.url().should(
        "contain",
        "/menu/zippys-restaurants-sandbox-demo-vendor"
      );
    });

    it("Test Case 2711: Cart - Verify adding a product to the cart", () => {
      const productName = dataPage.productWithModifiers.productName;

      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor/products/687422");
      cy.wait(3000);
      productDescriptionPage.addProductToCart().click();
      commonPage.navbarCart().click();
      cy.url("contains", "menu/zippys-restaurants-sandbox-demo-vendor");
      cartPage.cartEmptyState().should("not.exist");
      cartPage.cartProductName(productName).should("be.visible");
      cartPage.checkoutButton().should("be.visible");
      cartPage.quantityPicker().should("have.text","1")
      cartPage.removeQuantityButton().should("be.visible")
      cartPage.addQuantityButton().should("be.visible")
      cartPage.mayWeSuggestList().should("exist").should("not.be.empty")
    });

    //TODO: Not implemented yet
    it("Test Case 2713: Cart - Verify editing a product in the cart", () => {
      const productCategory = dataPage.productSimple.productCategory;
      const productName = dataPage.productSimple.productName;

      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor");
      cy.wait(5000);
      menuPage.selectCategory(productCategory);
      menuPage.addProductToBasket(productName);
      commonPage.navbarCart().click();

      cartPage
        .productPrice()
        .invoke("text")
        .then((text) => {
          const price = parseFloat(text.replace("$", ""));

          cartPage.numberQuantityButton().should("have.text", "1");
          cartPage.addQuantityButton().click();
          cy.wait(1500);
          cartPage.numberQuantityButton().should("have.text", "2");

          cartPage
            .productPrice()
            .invoke("text")
            .then((updatedText) => {
              const updatedPrice = parseFloat(updatedText.replace("$", ""));
              expect(updatedPrice).to.equal(price * 2);
            });

          cartPage.addQuantityButton().click();
          cy.wait(1500);
          cartPage.numberQuantityButton().should("have.text", "3");

          cartPage
            .productPrice()
            .invoke("text")
            .then((updatedText) => {
              const updatedPrice = parseFloat(updatedText.replace("$", ""));
              expect(updatedPrice).to.equal(price * 3);
            });

          cartPage.removeQuantityButton().click();
          cy.wait(1500);
          cartPage.numberQuantityButton().should("have.text", "2");

          cartPage
            .productPrice()
            .invoke("text")
            .then((updatedText) => {
              const updatedPrice = parseFloat(updatedText.replace("$", ""));
              expect(updatedPrice).to.equal(price * 2);
            });

          cartPage.removeQuantityButton().click();
          cy.wait(1500);
          cartPage.numberQuantityButton().should("have.text", "1");

          cartPage
            .productPrice()
            .invoke("text")
            .then((updatedText) => {
              const updatedPrice = parseFloat(updatedText.replace("$", ""));
              expect(updatedPrice).to.equal(price * 1);
            });
        });
        cartPage.editButton().click()
        productDescriptionPage.productTitle().should("have.text",productName)
    });

    //TODO: Bug 3128: Wrong values on product price, subtotal and total in checkout page
    it(["Bug"],"Test Case 2714: Cart - Verify the prices displayed in the cart for pickup", () => {
      const addon1 = dataPage.productWithModifiers.addon1
      const productCategory = dataPage.productWithModifiers.productCategory
      const productName = dataPage.productWithModifiers.productName

      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor");
      cy.wait(5000);
      menuPage.selectCategory(productCategory)
      menuPage.selectProduct(productName)
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor/products/687422");
      cy.wait(3000);
      productDescriptionPage.addonProduct(addon1).click();
      productDescriptionPage.addProductToCart().click();
      productDescriptionPage.productCost().invoke('text').then((productCostText) => {
        const productCostValue = parseFloat(productCostText.replace(/[^0-9.-]+/g,""));
  
        cy.wait(2000);
        commonPage.navbarCart().click();
        cartPage.cartHeader().should("be.visible");

        cartPage.productPrice().invoke('text').then((productPriceText) => {
          const productPriceValue = parseFloat(productPriceText.replace(/[^0-9.-]+/g,""));
  
          expect(productPriceValue).to.equal(productCostValue);
        });
      });
      cartPage.cartContainer().scrollTo("bottom")
      cartPage.estimatedTaxLabel().should("be.visible").should("not.be.empty")
      cartPage.checkoutButton().click()
      cy.wait(2000)
      cy.url().should("contain","/checkout")
    });

    //TODO: Bug 3126: Different pickup and delivery time date and hours between menu and cart
    it(["Bug"],"Test Case 2715: Cart - Verify restaurant informations displayed in the cart for pickup", () => {
      const productCategory = dataPage.productWithModifiers.productCategory
      const productName = dataPage.productWithModifiers.productName

      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor");
      cy.wait(5000);
      menuPage.selectCategory(productCategory)
      menuPage.selectProduct(productName)
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor/products/687422");
      cy.wait(3000);
      productDescriptionPage.addProductToCart().click();
      cy.wait(2000);

      // Validate handoff time in the cart
      menuPage.dropdownHandoffChangeMobile().click()
      menuPage.pickupTimeValue().invoke("text").then((handoffTime1) => {
        commonPage.navbarCart().click();
        cartPage.cartHeader().should("be.visible");
        cartPage.cartHandoffTime().should("contain", handoffTime1);
      });

      cartPage.cartCloseIcon().click()
      cy.wait(2000)
      menuPage.pickupTimeValue().click()
      changeHandoffModalPage.pickupTimeHeader().should("be.visible")
      changeHandoffModalPage.datePicker().click()
      changeHandoffModalPage.dateOption(1).click()
      changeHandoffModalPage.timePicker().click()
      changeHandoffModalPage.timeOption(1).click()
      changeHandoffModalPage.saveChangesButton().click()

      menuPage.dropdownHandoffChangeMobile().click()
      menuPage.pickupTimeValue().invoke("text").then((handoffTime2) => {
        commonPage.navbarCart().click();
        cartPage.cartHeader().should("be.visible");
        cartPage.cartHandoffTime().should("contain", handoffTime2);
      });
    
      cartPage.cartContainer().scrollTo("bottom")
      cartPage.estimatedTaxLabel().should("be.visible").should("not.be.empty")
      cartPage.checkoutButton().click()
      cy.wait(2000)
      cy.url().should("contain","/checkout")
    });

    //TODO: Bug 3126: Different pickup an delivery time date and hours between menu and cart
    it(["Bug"],"Test Case 2716: Cart - Verify restaurant informations displayed in the cart for delivery", () => {
      const addon1 = dataPage.productWithModifiers.addon1
      const productCategory = dataPage.productWithModifiers.productCategory
      const productName = dataPage.productWithModifiers.productName

      cy.visit("/");
      cy.wait(5000);
      handoffPage.accessMenuPageWithinDeliveryOption()
      menuPage.selectCategory(productCategory)
      menuPage.selectProduct(productName)
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor/products/687422");
      cy.wait(3000);
      productDescriptionPage.addProductToCart().click();
      cy.wait(2000);

      // Validate handoff time in the cart
      menuPage.dropdownHandoffChangeMobile().click()
      menuPage.pickupTimeValue().invoke("text").then((handoffTime1) => {
        commonPage.navbarCart().click();
        cartPage.cartHeader().should("be.visible");
        cartPage.cartHandoffTime().should("contain", handoffTime1);
      });

      cartPage.cartCloseIcon().click()
      cy.wait(2000)
      menuPage.pickupTimeValue().click()
      changeHandoffModalPage.pickupTimeHeader().should("be.visible")
      changeHandoffModalPage.datePicker().click()
      changeHandoffModalPage.dateOption(1).click()
      changeHandoffModalPage.timePicker().click()
      changeHandoffModalPage.timeOption(1).click()
      changeHandoffModalPage.saveChangesButton().click()
      cy.wait(1000)

      menuPage.pickupTimeValue().invoke("text").then((handoffTime2) => {
        commonPage.navbarCart().click();
        cartPage.cartHeader().should("be.visible");
        cartPage.cartHandoffTime().should("contain", handoffTime2);
      });
    
      cartPage.cartContainer().scrollTo("bottom")
      cartPage.estimatedTaxLabel().should("be.visible").should("not.be.empty")
      cartPage.checkoutButton().click()
      cy.wait(2000)
      cy.url().should("contain","/checkout")
    });

    it("Test Case 2717: Cart - Verify 'May We Suggest' Section", () => {
      const productCategory = dataPage.productSimple.productCategory;
      const productName = dataPage.productSimple.productName;
    
      // Visit the page and add the product to the cart
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor");
      cy.wait(3000);
      menuPage.selectCategory(productCategory);
      menuPage.addProductToBasket(productName);
    
      // Open the cart and validate the upsell section
      commonPage.navbarCart().click();
      cartPage.mayWeSuggestTitle().should("be.visible");
      cartPage.mayWeSuggestList().should("not.be.empty");
    
      // Capture the initial total price
      cartPage.checkoutButton().invoke('text').then((text) => {
        cy.log('Checkout button text (initial):', text); // Log the extracted text
    
        // Use regex to remove all non-digit characters except the decimal point
        const cleanedTotal1 = text.replace(/[^0-9.]/g, '').trim();
        cy.log('Cleaned total1:', cleanedTotal1); // Log the cleaned value
        
        const totalPrice1 = parseFloat(cleanedTotal1);  // Convert the cleaned string to a number
        cy.log('Initial total price (parsed):', totalPrice1);
    
        // Iterate over each item in the upsell list and click on the first one that contains a price
        cartPage.mayWeSuggestList().find('button').each(($el) => {
          const price = $el.find('div#upsellCardPriceCal p').first().text().trim();
          
          // Check if price is not empty or $0
          if (price && price !== '$0') {
            cy.wrap($el).click(); // Click the button that contains the price
            cy.wait(1000);
    
            // Capture the total price after selecting an upsell option
            cartPage.checkoutButton().invoke('text').then((text) => {
              cy.log('Checkout button text (after click):', text); // Log the extracted text
    
              // Use regex to remove all non-digit characters except the decimal point
              const cleanedTotal2 = text.replace(/[^0-9.]/g, '').trim();
              cy.log('Cleaned total2:', cleanedTotal2); // Log the cleaned value
    
              const totalPrice2 = parseFloat(cleanedTotal2);  // Convert the string to a number
              cy.log('Second total price (parsed):', totalPrice2);

              // Assert that the price has changed
              expect(totalPrice1).to.not.equal(totalPrice2);
            });
    
            return false; // Exit the loop after clicking the first item with a valid price
          }
        });
      });
    });

    it("Test Case 2718: Cart - Verify Utensils Option", () => {
      const productCategory = dataPage.productSimple.productCategory;
      const productName = dataPage.productSimple.productName;
    
      // Visit the page and add the product to the cart
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor");
      cy.wait(3000);
      menuPage.selectCategory(productCategory);
      menuPage.addProductToBasket(productName);
    
      // Open the cart and validate the upsell section
      commonPage.navbarCart().click();
      cartPage.mayWeSuggestTitle().should("be.visible");
      cartPage.mayWeSuggestList().should("not.be.empty");
    
      // Capture the initial total price
      cartPage.checkoutButton().invoke('text').then((text) => {
        cy.log('Checkout button text (initial):', text); // Log the extracted text
    
        // Use regex to remove all non-digit characters except the decimal point
        const cleanedTotal1 = text.replace(/[^0-9.]/g, '').trim();
        cy.log('Cleaned total1:', cleanedTotal1); // Log the cleaned value
        
        const totalPrice1 = parseFloat(cleanedTotal1);  // Convert the cleaned string to a number
        cy.log('Initial total price (parsed):', totalPrice1);
    
        // Click the utensils button
        cartPage.addUtensilsButton().click();
    
        // Capture the total price after clicking the utensils button
        cartPage.checkoutButton().invoke('text').then((text) => {
          cy.log('Checkout button text (after click):', text); // Log the extracted text
    
          // Use regex to remove all non-digit characters except the decimal point
          const cleanedTotal2 = text.replace(/[^0-9.]/g, '').trim();
          cy.log('Cleaned total2:', cleanedTotal2); // Log the cleaned value
    
          const totalPrice2 = parseFloat(cleanedTotal2);  // Convert the string to a number
          cy.log('Second total price (parsed):', totalPrice2);
    
          // Assert that the price has not changed
          expect(totalPrice1).to.equal(totalPrice2); // The price should remain the same
        });          
      });
    });

    it("Test Case 2719: Cart - Verify the prices displayed in the cart for pickup", () => {
      const productCategory1 = dataPage.productSimple.productCategory;
      const productName1 = dataPage.productSimple.productName;
    
      const productCategory2 = dataPage.productWithModifiers.productCategory;
      const productName2 = dataPage.productWithModifiers.productName;
    
      // Visit the page and add the first product to the cart
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor");
      cy.wait(3000);
      
      menuPage.selectCategory(productCategory1);
      menuPage.addProductToBasket(productName1);
    
      // Open the cart and capture the initial total price
      commonPage.navbarCart().click();
      cartPage.mayWeSuggestTitle().should("be.visible");
      cartPage.mayWeSuggestList().should("not.be.empty");
    
      cartPage.checkoutButton().invoke('text').then((text1) => {
        cy.log('Checkout button text (initial):', text1);
    
        // Clean the price and convert it to a number
        const cleanedTotal1 = text1.replace(/[^0-9.]/g, '').trim();
        const totalPrice1 = parseFloat(cleanedTotal1);
        cy.log('Initial total price:', totalPrice1);
    
        // Close the cart
        cartPage.cartCloseIcon().click();
        
        // Add a second item to the basket
        menuPage.selectCategory(productCategory2);
        menuPage.addProductToBasket(productName2);
    
        // Open the cart again and capture the updated total price
        commonPage.navbarCart().click();
    
        cartPage.checkoutButton().invoke('text').then((text2) => {
          cy.log('Checkout button text (updated):', text2);
    
          // Clean the price and convert it to a number
          const cleanedTotal2 = text2.replace(/[^0-9.]/g, '').trim();
          const totalPrice2 = parseFloat(cleanedTotal2);
          cy.log('Updated total price:', totalPrice2);
    
          // Assert that the total price has updated after adding the second item
          expect(totalPrice2).to.be.greaterThan(totalPrice1); // The price should increase
        });
      });
      cartPage.cartProductName(productName1).should("be.visible").log("Verify if 1st product was added to basket")
      cy.wait(500)
      cartPage.cartProductName(productName2).should("be.visible").log("Verify if 2nd product was added to basket")
      cartPage.checkoutButton().click()
      cy.wait(2000)
      cy.url().should("contain","/checkout")
    });
    
    
  });
});
