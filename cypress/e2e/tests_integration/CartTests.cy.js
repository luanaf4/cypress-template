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
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor");
      cy.wait(5000);
    });

    it("Test Case 1002: Verify Cart Empty State with restaurant selected - Desktop", () => {
      commonPage.navbarCart().click();
      cartPage.cartHeader().should("be.visible").should("have.text", "Cart");
      cartPage.cartEmptyState().should("be.visible");
      cartPage.cartStartOrderCTAButon().should("be.visible").click();
      cy.url().should(
        "contain",
        "/menu/zippys-restaurants-sandbox-demo-vendor"
      );
    });

    it("Test Case 1003: Verify Cart Empty State with no restaurant selected - Desktop", () => {
      cy.visit("/");
      commonPage.navbarCart().click();
      cartPage.cartHeader().should("be.visible").should("have.text", "Cart");
      cartPage.cartEmptyState().should("be.visible");
      cartPage.cartStartOrderCTAButon().should("be.visible").click();
      cy.url().should(
        "not.contain",
        "/menu/zippys-restaurants-sandbox-demo-vendor"
      );
      handoffPage.pickupOption().should("be.visible");
      handoffPage.deliveryOption().should("be.visible");
    });

    it("Test Case 1012: Open a filled cart", () => {
      const productCategory = dataPage.productSimple.productCategory;
      const productName = dataPage.productSimple.productName;

      menuPage.selectCategory(productCategory);
      menuPage.addProductToBasket(productName);
      commonPage.navbarCart().click();
      cy.wait(1000);
      cartPage.cartProduct().should("be.visible");
      // cartPage.cartProductDescription().should("be.visible");
      // cartPage.quantityPicker().should("be.visible");
    });

    it("Test Case 1018: See pickup information", () => {
      const productCategory = dataPage.productSimple.productCategory;
      const productName = dataPage.productSimple.productName;

      menuPage.selectCategory(productCategory);
      menuPage.addProductToBasket(productName);
      commonPage.navbarCart().click();
      cy.wait(1000);
      cartPage.handoffInformation().should("be.visible");
    });

    it("Test Case 1019: See delivery information", () => {
      const productCategory = dataPage.productSimple.productCategory;
      const productName = dataPage.productSimple.productName;

      cy.visit("/");
      cy.wait(2000);
      handoffPage.accessMenuPageWithinDeliveryOption();
      menuPage.selectCategory(productCategory);
      menuPage.addProductToBasket(productName);
      cy.wait(3000);
      commonPage.navbarCart().click();
      cy.wait(1000);
      cartPage.handoffInformation().should("be.visible");
    });

    it("Test Case 1026: Add more products", () => {
      const productCategory = dataPage.productSimple.productCategory;
      const productName = dataPage.productSimple.productName;

      cartPage.mockCartItems();
      menuPage.selectCategory(productCategory);
      menuPage.addProductToBasket(productName);
      commonPage.navbarCart().click();
      cartPage.itemsList().scrollTo("bottom");
    });

    it("Test Case 1027: Change quantity of product", () => {
      const productCategory = dataPage.productSimple.productCategory;
      const productName = dataPage.productSimple.productName;

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
    });

    it("Test Case 1043: Add Product to Cart", () => {
      const productName = dataPage.productWithModifiers.productName;
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor/products/687422");
      cy.wait(3000);
      productDescriptionPage.addProductToCart().click();
      commonPage.navbarCart().click();
      cy.url("contains", "menu/zippys-restaurants-sandbox-demo-vendor");
      cartPage.cartEmptyState().should("not.exist");
      cartPage.cartProductName(productName).should("exist");
      cartPage.checkoutButton().should("exist");
    });

    it("Test Case 1211: View upsell options in the cart",() => {
      const productCategory = dataPage.productSimple.productCategory
      const productName = dataPage.productSimple.productName

      menuPage.selectCategory(productCategory)
      menuPage.addProductToBasket(productName)
      commonPage.navbarCart().click()
      cartPage.mayWeSuggestTitle().should("be.visible")
    })

    it("Test Case 1079: Cart - Verify basket expiration",() => {
      const productCategory = dataPage.productSimple.productCategory
      const productName = dataPage.productSimple.productName

      menuPage.selectCategory(productCategory)
      menuPage.addProductToBasket(productName)
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor")
      commonPage.navbarCart().click()
      cartPage.cartEmptyState().should("not.exist")
    })

    it("Test Case 1546: Verify Utensils Option",() => {
      const productCategory = dataPage.productSimple.productCategory
      const productName = dataPage.productSimple.productName

      menuPage.selectCategory(productCategory)
      menuPage.addProductToBasket(productName)
      commonPage.navbarCart().click()
      cartPage.itemsList().scrollTo("bottom")
      cartPage.addUtensilsButton().should("be.visible")
      cartPage.addUtensilsButton().click()
      cartPage.addUtensilsButton().should("be.visible")
    });

    it("Test Case 3197: Handle correct values on the cart",() => {
      const productCategory = dataPage.productWithModifiers.productCategory
      const productName = dataPage.productWithModifiers.productName
      const addOn1 = dataPage.productWithModifiers.addon1

      menuPage.selectCategory(productCategory)
      menuPage.selectProduct(productName)
      cy.wait(1000)
      productDescriptionPage.addonProduct(addOn1)
      productDescriptionPage.productCost().invoke('text').then((productCostText) => {
        productDescriptionPage.addProductToCart().click();
        const productCostValue = parseFloat(productCostText.replace(/[^0-9.-]+/g,""));
        commonPage.navbarCart().click();
        cartPage.subtotalLabel().invoke('text').then((productPriceText) => {
          const productPriceValue = parseFloat(productPriceText.replace(/[^0-9.-]+/g,""));
  
          expect(productPriceValue).to.equal(productCostValue);
        });
      });
    });

    it("Test Case 1493: Verify if products from 'Complete Your Meal' are being included in the total price of the basket", () => {
      const addon1 = dataPage.productWithModifiers.addon1
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor/products/687422");
      cy.wait(3000);
      productDescriptionPage.addonProduct(addon1).click();
      productDescriptionPage.productCost().invoke('text').then((productCostText) => {
        productDescriptionPage.addProductToCart().click();
        const productCostValue = parseFloat(productCostText.replace(/[^0-9.-]+/g,""));
        commonPage.navbarCart().click();
        cartPage.subtotalLabel().invoke('text').then((productPriceText) => {
          const productPriceValue = parseFloat(productPriceText.replace(/[^0-9.-]+/g,""));
  
          expect(productPriceValue).to.equal(productCostValue);
        });
      });
    });

    it("Test Case 1213: Upsell options showing up to 6 options", () => {
      const productCategory = dataPage.productSimple.productCategory
      const productName = dataPage.productSimple.productName

      menuPage.selectCategory(productCategory)
      menuPage.addProductToBasket(productName)
      commonPage.navbarCart().click()
      cartPage.mayWeSuggestList().should("not.be.empty")
    });

    it("Test Case 1214: Add a suggested product to basket", () => {
      const productCategory = dataPage.productSimple.productCategory;
      const productName = dataPage.productSimple.productName;
    
      // Select the product category and add a product to the basket
      menuPage.selectCategory(productCategory);
      menuPage.addProductToBasket(productName);
    
      // Open the cart and verify that upsell products are listed
      commonPage.navbarCart().click();
      cartPage.mayWeSuggestList().should("not.be.empty");
    
      // Add the upsell product and verify it was added to the cart
      cartPage.addUpsellItemToBasket();
    });

    it("Test Case 1215: Upsell without price opens product details page", () => {
      const productCategory = dataPage.productSimple.productCategory;
      const productName = dataPage.productSimple.productName;
    
      // Select the product category and add a product to the basket
      menuPage.selectCategory(productCategory);
      menuPage.addProductToBasket(productName);
    
      // Open the cart and verify that upsell products are listed
      commonPage.navbarCart().click();
      cartPage.mayWeSuggestList().should("not.be.empty");
    
      // Add the upsell product and verify it was added to the cart
      cartPage.selectUpsellWithoutPrice();
    });
    

  });

  context("Mobile", () => {
    beforeEach(() => {
      handoffPage.mockAllAvailableRestaurants();
      cy.viewport(Cypress.env("mobile"));
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor");
      cy.wait(5000);
    });

    it("Test Case 1038: Verify Cart Empty State with restaurant selected - Mobile", () => {
      commonPage.navbarCart().click();
      cartPage.cartHeader().should("be.visible").should("have.text", "Cart");
      cartPage.cartEmptyState().should("be.visible");
      cartPage.cartStartOrderCTAButon().should("be.visible").click();
      cy.url().should(
        "contain",
        "/menu/zippys-restaurants-sandbox-demo-vendor"
      );
    });

    it("Test Case 1039: Verify Cart Empty State with no restaurant selected - Mobile", () => {
      cy.visit("/");
      commonPage.navbarCart().click();
      cartPage.cartHeader().should("be.visible").should("have.text", "Cart");
      cartPage.cartEmptyState().should("be.visible");
      cartPage.cartStartOrderCTAButon().should("be.visible").click();
      cy.url().should(
        "not.contain",
        "/menu/zippys-restaurants-sandbox-demo-vendor"
      );
      handoffPage.pickupOption().should("be.visible");
      handoffPage.deliveryOption().should("be.visible");
    });

    it("Test Case 1065: Open a filled cart - Mobile", () => {
      const productCategory = dataPage.productWithModifiers.productCategory;
      const productName = dataPage.productWithModifiers.productName;

      menuPage.selectCategory(productCategory);
      menuPage.addProductToBasket(productName);
      cy.wait(3000);
      commonPage.navbarCart().click();
      cy.wait(1000);
      cartPage.cartProductName(productName).eq(0).should("be.visible");
      cartPage.cartProductDescription().eq(0).should("be.visible");
      cartPage.quantityPicker().eq(0).should("be.visible");
    });

    it("Test Case 1066: See pickup information - Mobile", () => {
      const productCategory = dataPage.productSimple.productCategory;
      const productName = dataPage.productSimple.productName;

      menuPage.selectCategory(productCategory);
      menuPage.addProductToBasket(productName);
      cy.wait(3000);
      commonPage.navbarCart().click();
      cy.wait(1000);
      cartPage.handoffInformation().should("be.visible");
    });

    it("Test Case 1067: See delivery information - Mobile", () => {
      const productCategory = dataPage.productSimple.productCategory;
      const productName = dataPage.productSimple.productName;

      cy.visit("/");
      cy.wait(2000);
      handoffPage.accessMenuPageWithinDeliveryOption();
      menuPage.selectCategory(productCategory);
      menuPage.addProductToBasket(productName);
      commonPage.navbarCart().click();
      cy.wait(1000);
      cartPage.handoffInformation().should("be.visible");
    });

    it("Test Case 1068: Add more products - Mobile", () => {
      const productCategory = dataPage.productSimple.productCategory;
      const productName = dataPage.productSimple.productName;

      cartPage.mockCartItems();
      menuPage.selectCategory(productCategory);
      menuPage.addProductToBasket(productName);
      commonPage.navbarCart().click();
      cartPage.itemsList().scrollTo("bottom");
    });

    it("Test Case 1069: Change quantity of product - Mobile", () => {
      const productCategory = dataPage.productSimple.productCategory;
      const productName = dataPage.productSimple.productName;

      menuPage.selectCategory(productCategory);
      menuPage.addProductToBasket(productName);
      cy.wait(3000);
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
    });
  });
});
