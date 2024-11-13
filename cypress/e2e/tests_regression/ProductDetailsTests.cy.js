import CommonPage from "../pages/CommonPage";
import MenuPage from "../pages/MenuPage";
import HandoffPage from "../pages/HandoffPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import ChangeHandoffModalPage from "../pages/ChangeHandoffModalPage";
import ProductDescriptionPage from "../pages/ProductDescriptionPage";

const handoffPage = new HandoffPage();
const commonPage = new CommonPage();
const productDescriptionPage = new ProductDescriptionPage();
const menuPage = new MenuPage();
const changeHandoffModalPage = new ChangeHandoffModalPage();
const checkoutPage = new CheckoutPage();
const cartPage = new CartPage();
const dataPage = require("../pages/DataPage");

const restaurantName = dataPage.restaurant.validRestaurantName;
const validAddress = dataPage.delivery.validDeliveryAddress;

describe("Product Details", () => {
  context("Desktop", () => {
    beforeEach(() => {
      handoffPage.mockAllAvailableRestaurants();
      cy.viewport(Cypress.env("desktop"));
      // cy.visit(
      //   "/menu/zippys-restaurants-sandbox-demo-vendor/products/687422"
      // ).log("Visit product details page");
      // cy.wait(5000);
    });

    it("Test Case 2706: Product Details - Verify Product Details Screen", () => {
      const productName = dataPage.productWithModifiers.productName;
      const productCategory = dataPage.productWithModifiers.productCategory;
      const productSize1 = dataPage.productWithModifiers.productSize1;
      const productSize2 = dataPage.productWithModifiers.productSize2;



      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor/products/687422").log("Visit product details page");
      cy.wait(7000);
      productDescriptionPage.productImage().should("be.visible");
      productDescriptionPage.productTitle().should("be.visible").should("not.be.empty");
      productDescriptionPage.productDescription().should("be.visible").should("not.be.empty");
      // productDescriptionPage
      //   .productCollapsedDescription()
      //   .should("not.be.visible");
      productDescriptionPage.readMoreButton().should("not.exist");
      productDescriptionPage.size(productSize1).should("be.visible").should("not.be.empty").log("validate size 1");
      productDescriptionPage.size(productSize2).should("be.visible").should("not.be.empty").log("validate size 2");
      productDescriptionPage.size(productSize2).click();

      productDescriptionPage.productCalories().should("be.visible").should("not.be.empty").log("validate calories");
      productDescriptionPage.productCost().should("be.visible").should("not.be.empty").log("validate cost");
      productDescriptionPage.addQuantityButtonDesktop().should("be.visible").log("validate add quantity");
      productDescriptionPage.removeQuantityButtonDesktop().should("be.visible").log("validate descrease quantity");
      productDescriptionPage.numberQuantityButtonDesktop().should("be.visible").should("not.be.empty").log("validate quantity number");
      productDescriptionPage.addProductToCart().should("be.visible").should("not.be.empty").log("validate add to cart cta");
      productDescriptionPage.customizeYourPlateButton().should("be.visible").log("validate customize your plate section");
    });

    it("Test Case 2707: Product Details - Verify 'Complete Your Meal' Section", () => {
      const productWithModifiers = dataPage.productWithModifiers;
      const addons = [productWithModifiers.addon1, productWithModifiers.addon5];
    
      // Visit the product details page
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor/products/687422").log("Visit product details page");
      cy.wait(7000);
    
      // Validate the product cost is visible and capture the initial price
      productDescriptionPage.productCost().should("be.visible").should("not.be.empty").log("Validate initial cost");
    
      // Function to clean price text and return it as a number
      const getPrice = (priceText) => parseFloat(priceText.replace(/[^0-9.]/g, '').trim());
    
      // Capture the initial price
      productDescriptionPage.productCost().invoke('text').then((initialPriceText) => {
        let currentPrice = getPrice(initialPriceText);
        cy.log('Initial price (parsed):', currentPrice);
    
        // Loop through the addons and verify the price update after each click
        addons.forEach((addon) => {
          productDescriptionPage.addonProduct(addon).click();  // Click addon
          productDescriptionPage.productCost().invoke('text').then((newPriceText) => {
            const newPrice = getPrice(newPriceText);
            cy.log(`Price after clicking addon ${addon}:`, newPrice);
    
            // Assert that the price has increased after selecting the addon
            expect(newPrice).to.be.greaterThan(currentPrice);
            currentPrice = newPrice;  // Update current price for the next comparison
          });
        });
      });
    });

    //TODO: Substitution feature pending implementation
    it("Test Case 2708: Product Details - Verify 'Customize Your Plate' Section", () => {
      const productName = dataPage.productWithModifiers.productName;
    
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor/products/687422").log("Visit product details page");
      cy.wait(7000);
      productDescriptionPage.customizeYourPlateButton().should("be.visible")
      productDescriptionPage.customizeYourPlateProductsList().should("be.visible").should("not.be.empty")
      
      //Verify Customize your plate Cancel button
      productDescriptionPage.customizeYourPlateButton().click()
      productDescriptionPage.cancelButton().click()
      productDescriptionPage.productTitle().should("contain",productName)
      cy.url().should("contain","/products")

      //Verify Customize your plate I am Done button
      productDescriptionPage.customizeYourPlateButton().click()
      //insert substitutions here after implementation
      productDescriptionPage.iAmDoneButton().click()
      productDescriptionPage.productTitle().should("contain",productName)
      cy.url().should("contain","/products")
     
    });

    it("Test Case 2709: Product Details - Verify Product Quantity", () => {
      cy.visit(
        "/menu/zippys-restaurants-sandbox-demo-vendor/products/687422"
      ).log("Visit product details page");
      cy.wait(5000);
      // Get the initial product price and store it in a variable
      productDescriptionPage
        .productCost()
        .invoke("text")
        .then((text) => {
          const price = parseFloat(text.replace("$", ""));
          productDescriptionPage
            .productCost()
            .should("have.text", `$${price.toFixed(2)}`);

          // Increase quantity to 2 and validate the quantity
          productDescriptionPage
            .numberQuantityButtonDesktop()
            .should("have.text", "1");
          productDescriptionPage.addQuantityButtonDesktop().click();
          productDescriptionPage
            .numberQuantityButtonDesktop()
            .should("have.text", "2");

          // Validate the total price for quantity 2
          productDescriptionPage
            .productCost()
            .invoke("text")
            .then((updatedText) => {
              const updatedPrice = parseFloat(updatedText.replace("$", ""));
              expect(updatedPrice).to.equal(price * 2);
            });

          // Increase quantity to 3 and validate the quantity
          productDescriptionPage.addQuantityButtonDesktop().click();
          productDescriptionPage
            .numberQuantityButtonDesktop()
            .should("have.text", "3");

          // Validate the total price for quantity 3
          productDescriptionPage
            .productCost()
            .invoke("text")
            .then((updatedText) => {
              const updatedPrice = parseFloat(updatedText.replace("$", ""));
              expect(updatedPrice).to.equal(price * 3);
            });

          // Decrease quantity to 2 and validate the quantity
          productDescriptionPage.removeQuantityButtonDesktop().click();
          productDescriptionPage
            .numberQuantityButtonDesktop()
            .should("have.text", "2");

          // Validate the total price for quantity 2
          productDescriptionPage
            .productCost()
            .invoke("text")
            .then((updatedText) => {
              const updatedPrice = parseFloat(updatedText.replace("$", ""));
              expect(updatedPrice).to.equal(price * 2);
            });

          // Decrease quantity to 1 and validate the quantity
          productDescriptionPage.removeQuantityButtonDesktop().click();
          productDescriptionPage
            .numberQuantityButtonDesktop()
            .should("have.text", "1");

          // Validate the total price for quantity 1
          productDescriptionPage
            .productCost()
            .invoke("text")
            .then((updatedText) => {
              const updatedPrice = parseFloat(updatedText.replace("$", ""));
              expect(updatedPrice).to.equal(price * 1);
            });
        });
    });

    it("Test Case 2710: Product Details - Verify Total Price", () => {
      const productName = dataPage.productWithModifiers.productName;
      const productCategory = dataPage.productWithModifiers.productCategory;
      const productSize1 = dataPage.productWithModifiers.productSize1;
      const productSize1TotalPrice = dataPage.productWithModifiers.totalCostWithModifier1;
      const productSize2 = dataPage.productWithModifiers.productSize2;
      let productSize2TotalPrice = dataPage.productWithModifiers.totalCostWithModifier2;
      
      // Function to clean and parse the price text
      const getPrice = (priceText) => parseFloat(priceText.replace(/[^0-9.]/g, '').trim());
      
      // Clean the productSize2TotalPrice to remove the '$'
      productSize2TotalPrice = getPrice(productSize2TotalPrice);
      cy.log('Cleaned productSize2TotalPrice:', productSize2TotalPrice);
    
      // Visit the product details page
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor/products/687422").log("Visit product details page");
      cy.wait(7000);
    
      // Validate that the product information is visible
      productDescriptionPage.productImage().should("be.visible");
      productDescriptionPage.productTitle().should("be.visible").should("not.be.empty");
      productDescriptionPage.productDescription().should("be.visible").should("not.be.empty");
      productDescriptionPage.readMoreButton().should("not.exist");
    
      // Validate both sizes are visible
      productDescriptionPage.size(productSize1).should("be.visible").should("not.be.empty").log("Validate size 1");
      productDescriptionPage.size(productSize2).should("be.visible").should("not.be.empty").log("Validate size 2");
    
      // Capture the price before selecting the second size
      productDescriptionPage.productCost().invoke('text').then((initialPriceText) => {
        const initialPrice = getPrice(initialPriceText);
        cy.log('Initial price:', initialPrice);
    
        // Click on size 2 and capture the price after the selection
        productDescriptionPage.size(productSize2).click();
    
        // Capture the updated price
        productDescriptionPage.productCost().invoke('text').then((updatedPriceText) => {
          const updatedPrice = getPrice(updatedPriceText);
          cy.log('Updated price:', updatedPrice);
    
          // Assert that the price matches the cleaned productSize2TotalPrice
          expect(updatedPrice).to.equal(productSize2TotalPrice);
    
          // Additional validations
          productDescriptionPage.productCalories().should("be.visible").should("not.be.empty").log("Validate calories");
          productDescriptionPage.addQuantityButtonDesktop().should("be.visible").log("Validate add quantity");
          productDescriptionPage.removeQuantityButtonDesktop().should("be.visible").log("Validate decrease quantity");
          productDescriptionPage.numberQuantityButtonDesktop().should("be.visible").should("not.be.empty").log("Validate quantity number");
          productDescriptionPage.addProductToCart().should("be.visible").should("not.be.empty").log("Validate add to cart CTA");
          productDescriptionPage.customizeYourPlateButton().should("be.visible").log("Validate customize your plate section");
        });
      });
    });
    
  });

  context("Mobile", () => {
    beforeEach(() => {
      handoffPage.mockAllAvailableRestaurants();
      cy.viewport(Cypress.env("mobile"));
    });

    it("Test Case 2706: Product Details - Verify Product Details Screen", () => {
      const productName = dataPage.productWithModifiers.productName;
      const productCategory = dataPage.productWithModifiers.productCategory;
      const productSize1 = dataPage.productWithModifiers.productSize1;
      const productSize2 = dataPage.productWithModifiers.productSize2;



      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor/products/687422").log("Visit product details page");
      cy.wait(7000);
      productDescriptionPage.productImage().should("be.visible");
      productDescriptionPage.productTitle().should("be.visible").should("not.be.empty");
      productDescriptionPage.productCollapsedDescription().should("be.visible").should("not.be.empty");
      // productDescriptionPage
      //   .productCollapsedDescription()
      //   .should("not.be.visible");
      productDescriptionPage.readMoreButton().should("exist");
      productDescriptionPage.size(productSize1).should("be.visible").should("not.be.empty").log("validate size 1");
      productDescriptionPage.size(productSize2).should("be.visible").should("not.be.empty").log("validate size 2");
      productDescriptionPage.size(productSize2).click();

      productDescriptionPage.productCalories().should("be.visible").should("not.be.empty").log("validate calories");
      productDescriptionPage.productCost().should("be.visible").should("not.be.empty").log("validate cost");
      productDescriptionPage.addQuantityButtonMobile().should("be.visible").log("validate add quantity");
      productDescriptionPage.removeQuantityButtonMobile().should("be.visible").log("validate descrease quantity");
      productDescriptionPage.numberQuantityButtonMobile().should("be.visible").should("not.be.empty").log("validate quantity number");
      productDescriptionPage.addProductToCart().should("be.visible").should("not.be.empty").log("validate add to cart cta");
      productDescriptionPage.customizeYourPlateButton().should("be.visible").log("validate customize your plate section");
    });

    it("Test Case 2707: Product Details - Verify 'Complete Your Meal' Section", () => {
      const productWithModifiers = dataPage.productWithModifiers;
      const addons = [productWithModifiers.addon1, productWithModifiers.addon5];
    
      // Visit the product details page
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor/products/687422").log("Visit product details page");
      cy.wait(7000);
    
      // Validate the product cost is visible and capture the initial price
      productDescriptionPage.productCost().should("be.visible").should("not.be.empty").log("Validate initial cost");
    
      // Function to clean price text and return it as a number
      const getPrice = (priceText) => parseFloat(priceText.replace(/[^0-9.]/g, '').trim());
    
      // Capture the initial price
      productDescriptionPage.productCost().invoke('text').then((initialPriceText) => {
        let currentPrice = getPrice(initialPriceText);
        cy.log('Initial price (parsed):', currentPrice);
    
        // Loop through the addons and verify the price update after each click
        addons.forEach((addon) => {
          productDescriptionPage.addonProduct(addon).click();  // Click addon
          productDescriptionPage.productCost().invoke('text').then((newPriceText) => {
            const newPrice = getPrice(newPriceText);
            cy.log(`Price after clicking addon ${addon}:`, newPrice);
    
            // Assert that the price has increased after selecting the addon
            expect(newPrice).to.be.greaterThan(currentPrice);
            currentPrice = newPrice;  // Update current price for the next comparison
          });
        });
      });
    });

    //TODO: Substitution feature pending implementation
    it("Test Case 2708: Product Details - Verify 'Customize Your Plate' Section", () => {
      const productName = dataPage.productWithModifiers.productName;
    
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor/products/687422").log("Visit product details page");
      cy.wait(7000);
      productDescriptionPage.customizeYourPlateButton().should("be.visible")
      productDescriptionPage.customizeYourPlateProductsList().should("be.visible").should("not.be.empty")
      
      //Verify Customize your plate Cancel button
      productDescriptionPage.customizeYourPlateButton().click()
      productDescriptionPage.cancelButton().click()
      productDescriptionPage.productTitle().should("contain",productName)
      cy.url().should("contain","/products")

      //Verify Customize your plate I am Done button
      productDescriptionPage.customizeYourPlateButton().click()
      //insert substitutions here after implementation
      productDescriptionPage.iAmDoneButton().click()
      productDescriptionPage.productTitle().should("contain",productName)
      cy.url().should("contain","/products")
     
    });

    it("Test Case 2709: Product Details - Verify Product Quantity", () => {
      cy.visit(
        "/menu/zippys-restaurants-sandbox-demo-vendor/products/687422"
      ).log("Visit product details page");
      cy.wait(5000);
      // Get the initial product price and store it in a variable
      productDescriptionPage
        .productCost()
        .invoke("text")
        .then((text) => {
          const price = parseFloat(text.replace("$", ""));
          productDescriptionPage
            .productCost()
            .should("have.text", `$${price.toFixed(2)}`);

          // Increase quantity to 2 and validate the quantity
          productDescriptionPage
            .numberQuantityButtonMobile()
            .should("have.text", "1");
          productDescriptionPage.addQuantityButtonMobile().click();
          productDescriptionPage
            .numberQuantityButtonMobile()
            .should("have.text", "2");

          // Validate the total price for quantity 2
          productDescriptionPage
            .productCost()
            .invoke("text")
            .then((updatedText) => {
              const updatedPrice = parseFloat(updatedText.replace("$", ""));
              expect(updatedPrice).to.equal(price * 2);
            });

          // Increase quantity to 3 and validate the quantity
          productDescriptionPage.addQuantityButtonMobile().click();
          productDescriptionPage
            .numberQuantityButtonMobile()
            .should("have.text", "3");

          // Validate the total price for quantity 3
          productDescriptionPage
            .productCost()
            .invoke("text")
            .then((updatedText) => {
              const updatedPrice = parseFloat(updatedText.replace("$", ""));
              expect(updatedPrice).to.equal(price * 3);
            });

          // Decrease quantity to 2 and validate the quantity
          productDescriptionPage.removeQuantityButtonMobile().click();
          productDescriptionPage
            .numberQuantityButtonMobile()
            .should("have.text", "2");

          // Validate the total price for quantity 2
          productDescriptionPage
            .productCost()
            .invoke("text")
            .then((updatedText) => {
              const updatedPrice = parseFloat(updatedText.replace("$", ""));
              expect(updatedPrice).to.equal(price * 2);
            });

          // Decrease quantity to 1 and validate the quantity
          productDescriptionPage.removeQuantityButtonMobile().click();
          productDescriptionPage
            .numberQuantityButtonMobile()
            .should("have.text", "1");

          // Validate the total price for quantity 1
          productDescriptionPage
            .productCost()
            .invoke("text")
            .then((updatedText) => {
              const updatedPrice = parseFloat(updatedText.replace("$", ""));
              expect(updatedPrice).to.equal(price * 1);
            });
        });
    });

    it("Test Case 2710: Product Details - Verify Total Price", () => {
      const productName = dataPage.productWithModifiers.productName;
      const productCategory = dataPage.productWithModifiers.productCategory;
      const productSize1 = dataPage.productWithModifiers.productSize1;
      const productSize1TotalPrice = dataPage.productWithModifiers.totalCostWithModifier1;
      const productSize2 = dataPage.productWithModifiers.productSize2;
      let productSize2TotalPrice = dataPage.productWithModifiers.totalCostWithModifier2;
      
      // Function to clean and parse the price text
      const getPrice = (priceText) => parseFloat(priceText.replace(/[^0-9.]/g, '').trim());
      
      // Clean the productSize2TotalPrice to remove the '$'
      productSize2TotalPrice = getPrice(productSize2TotalPrice);
      cy.log('Cleaned productSize2TotalPrice:', productSize2TotalPrice);
    
      // Visit the product details page
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor/products/687422").log("Visit product details page");
      cy.wait(7000);
    
      // Validate that the product information is visible
      productDescriptionPage.productImage().should("be.visible");
      productDescriptionPage.productTitle().should("be.visible").should("not.be.empty");
      productDescriptionPage.productCollapsedDescription().should("be.visible").should("not.be.empty");
      productDescriptionPage.readMoreButton().should("exist");
    
      // Validate both sizes are visible
      productDescriptionPage.size(productSize1).should("be.visible").should("not.be.empty").log("Validate size 1");
      productDescriptionPage.size(productSize2).should("be.visible").should("not.be.empty").log("Validate size 2");
    
      // Capture the price before selecting the second size
      productDescriptionPage.productCost().invoke('text').then((initialPriceText) => {
        const initialPrice = getPrice(initialPriceText);
        cy.log('Initial price:', initialPrice);
    
        // Click on size 2 and capture the price after the selection
        productDescriptionPage.size(productSize2).click();
    
        // Capture the updated price
        productDescriptionPage.productCost().invoke('text').then((updatedPriceText) => {
          const updatedPrice = getPrice(updatedPriceText);
          cy.log('Updated price:', updatedPrice);
    
          // Assert that the price matches the cleaned productSize2TotalPrice
          expect(updatedPrice).to.equal(productSize2TotalPrice);
    
          // Additional validations
          productDescriptionPage.productCalories().should("be.visible").should("not.be.empty").log("Validate calories");
          productDescriptionPage.addQuantityButtonMobile().should("be.visible").log("Validate add quantity");
          productDescriptionPage.removeQuantityButtonMobile().should("be.visible").log("Validate decrease quantity");
          productDescriptionPage.numberQuantityButtonMobile().should("be.visible").should("not.be.empty").log("Validate quantity number");
          productDescriptionPage.addProductToCart().should("be.visible").should("not.be.empty").log("Validate add to cart CTA");
          productDescriptionPage.customizeYourPlateButton().should("be.visible").log("Validate customize your plate section");
        });
      });
    });


  });
    
});
