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

describe("Product Description", () => {
  context("Desktop", () => {
    beforeEach(() => {
      handoffPage.mockAllAvailableRestaurants();
      cy.viewport(Cypress.env("desktop"));
    });

    it("Test Case 644: Open Product Details - Desktop", () => {
      cy.visit(
        "/menu/zippys-restaurants-sandbox-demo-vendor/products/687422"
      ).log("Visit product details page");
      cy.wait(5000);
      productDescriptionPage.productImage().should("be.visible");
      productDescriptionPage.productTitle().should("be.visible");
      productDescriptionPage.productDescription().should("be.visible");
      productDescriptionPage
        .productCollapsedDescription()
        .should("not.be.visible");
      productDescriptionPage.readMoreButton().should("not.exist");
    });

    it("Test Case 753: Quantity does not go below 1", () => {
      cy.visit(
        "/menu/zippys-restaurants-sandbox-demo-vendor/products/687422"
      ).log("Visit product details page");
      cy.wait(5000);
      productDescriptionPage
        .numberQuantityButtonDesktop()
        .should("have.text", "1");
      productDescriptionPage.removeQuantityButtonDesktop().click();
      productDescriptionPage
        .numberQuantityButtonDesktop()
        .should("have.text", "1");
    });

    it("Test Case 649: Increase and Decrease quantity by clicking the quantity picker", () => {
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

    it("Test Case 942: Verify Categories and Products when Changing Restaurant", () => {
      cy.visit("/").log("Visit handoff page");
      handoffPage.accessMenuPageWithinDeliveryOption();
      menuPage.locationBoxOrderingFrom().click();
      menuPage.cardRestaurant(restaurantName).click();
      cy.focused().tab().tab().click();
      changeHandoffModalPage.saveChangesButton().click();
      menuPage.breakfastMeatLoverProduct().should("not.exist");
    });

    it("Test Case 728: Product page details", () => {
      const productSize = dataPage.productWithModifiers.productSize1;
      const addon1 = dataPage.productWithModifiers.addon1;
      const addon3 = dataPage.productWithModifiers.addon3;
      const addon5 = dataPage.productWithModifiers.addon5;

      cy.visit(
        "/menu/zippys-restaurants-sandbox-demo-vendor/products/687422"
      ).log("Visit product details page");
      cy.wait(5000);
      productDescriptionPage.size(productSize).click();
      productDescriptionPage.addonProduct(addon1).click();
      productDescriptionPage.addonProduct(addon3).click();
      productDescriptionPage.addonProduct(addon5).click();
    });

    it("Test Case 730: Verify Product w/ Size modifier", () => {
      const productCategory = dataPage.productWithModifiers.productCategory;
      const productName = dataPage.productWithModifiers.productName;
      const productBaseCost = dataPage.productWithModifiers.productBaseCost;
      const productSize1 = dataPage.productWithModifiers.productSize1;
      const productSize1Cost =
        dataPage.productWithModifiers.productModifier1Cost;
      const totalWithModifier1 =
        dataPage.productWithModifiers.totalCostWithModifier1;
      const productSize2 = dataPage.productWithModifiers.productSize2;
      const productSize2Cost =
        dataPage.productWithModifiers.productModifier2Cost;
      const totalWithModifier2 =
        dataPage.productWithModifiers.totalCostWithModifier2;

      cy.visit(
        "/menu/zippys-restaurants-sandbox-demo-vendor/products/687422"
      ).log("Visit product details page");
      cy.wait(5000);
      //Validate 1st size
      productDescriptionPage.size(productSize1).click();
      productDescriptionPage
        .productCost()
        .should("contain", totalWithModifier1);

      //Validate 2nd size
      productDescriptionPage.size(productSize2).click();
      productDescriptionPage
        .productCost()
        .should("contain", totalWithModifier2);
    });

    it("Test Case 884: Product details edit and customize", () => {
      const productName = dataPage.productWithModifiers.productName;
      cy.visit(
        "/menu/zippys-restaurants-sandbox-demo-vendor/products/687422"
      ).log("Visit product details page");
      cy.wait(5000);
      productDescriptionPage.customizeYourPlateButton().click();
      productDescriptionPage.brownRicePlateCustomizer().click();
      productDescriptionPage.iAmDoneButton().click();
      cy.wait(1000);
      productDescriptionPage.brownRicePlateCustomizer().should("exist");
      productDescriptionPage.customizeYourPlateButton().click();
      productDescriptionPage.whiteRicePlateCustomizer().click();
      productDescriptionPage.cancelButton().click();
      cy.wait(1000);
      productDescriptionPage.brownRicePlateCustomizer().should("exist");
      productDescriptionPage.customizeYourPlateButton().click();
      productDescriptionPage.whiteRicePlateCustomizer().click();
      productDescriptionPage.iAmDoneButton().click();
      cy.wait(1000);
      productDescriptionPage.brownRicePlateCustomizer().should("not.exist");
      productDescriptionPage.whiteRicePlateCustomizer().should("exist");
    });

    it("Test Case 708: Complete your meal section", () => {
      const addon1 = dataPage.productWithModifiers.addon1;
      const addon3 = dataPage.productWithModifiers.addon3;
      const addon6 = dataPage.productWithModifiers.addon6;
      cy.visit(
        "/menu/zippys-restaurants-sandbox-demo-vendor/products/687422"
      ).log("Visit product details page");
      cy.wait(5000);
      cy.scrollTo("bottom");
      productDescriptionPage.completeYourMealSection().should("exist");
      productDescriptionPage.addonProduct(addon1).click();
      cy.scrollTo("bottom");
      productDescriptionPage.addonProduct(addon6).should("exist");
      productDescriptionPage.addonProduct(addon3).should("exist");
    });
    
    it("Test Case 3118: Sucess Toast", () => {
      cy.visit(
        "/menu/zippys-restaurants-sandbox-demo-vendor/products/687422"
      ).log("Visit product details page");
      cy.wait(5000);
      productDescriptionPage.addProductToCart().click()
      commonPage.toastElement().should("contain","Added to cart")
      cy.wait(6000)
      commonPage.toastElement().should("not.exist")
    });

    it("Test Case 3120: Error Toast", () => {
      productDescriptionPage.mockErrorInAddProductCall()
      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor/products/687422")
      productDescriptionPage.addProductToCart().click()
      commonPage.toastElement().should("contain","Unable to add items to cart")
      cy.wait(6000)
      commonPage.toastElement().should("not.exist")
    });

    it("Test Case 3143: Product Details - Customize your plate section should be not empty", () => {
      cy.visit(
        "/menu/zippys-restaurants-sandbox-demo-vendor/products/738424"
      ).log("Visit product details page");
      cy.wait(5000);
      const product2Size1 = dataPage.productWithModifiers.product2Size1
      const product2Size2 = dataPage.productWithModifiers.product2Size2
      const customizeOption1 = dataPage.productWithModifiers.customizeOption1
      productDescriptionPage.size(product2Size1).should("exist");
      productDescriptionPage.size(product2Size2).should("exist");
      productDescriptionPage.customizeYourPlateButton().click();
      productDescriptionPage.noCabbageCustomizer().click();
      productDescriptionPage.iAmDoneButton().click();
      productDescriptionPage.noCabbageCustomizer().should("exist");
    });    

    it("Test Case 3423: Product with combo configured", () => {
      cy.visit(
        "/menu/zippys-restaurants-sandbox-demo-vendor/products/742478"
      ).log("Visit product details page");
      cy.wait(5000);
      const comboOption1 = dataPage.productWithCombo.comboOption1;
      const addon1 = dataPage.productWithCombo.addon1;
      productDescriptionPage.addonProduct(comboOption1).click();
      productDescriptionPage.addonProduct(addon1).should("be.visible");
      productDescriptionPage.selectFlavorSectionTitle().should("be.visible");
    });


  });

  context("Mobile", () => {
    beforeEach(() => {
      handoffPage.mockAllAvailableRestaurants();
      cy.viewport(Cypress.env("mobile"));
    });

    it("Test Case 736: Open Product Details - Mobile", () => {
      const productName = dataPage.productWithModifiers.productName;

      cy.visit(
        "/menu/zippys-restaurants-sandbox-demo-vendor/products/687422"
      ).log("Visit product details page");
      cy.wait(5000);
      productDescriptionPage.productImage().should("be.visible");
      productDescriptionPage.productTitle().should("be.visible");
      productDescriptionPage.productCollapsedDescription().should("be.visible");
      productDescriptionPage.productDescription().should("not.be.visible");
      productDescriptionPage.readMoreButton().should("be.visible");

      productDescriptionPage.readMoreButton().click();
      productDescriptionPage.readMoreButton().should("not.exist");
      productDescriptionPage.productCollapsedDescription().should("be.visible");
      productDescriptionPage.productDescription().should("exist");
    });

    it("Test Case 754: Increase and Decrease quantity by clicking the quantity picker - Mobile", () => {
      const productName = dataPage.productWithModifiers.productName;

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

    it("Test Case 927: Verify Categories and Products for Pickup - Mobile", () => {
      const productName = dataPage.productWithModifiers.productName;
      const productCategory = dataPage.productWithModifiers.productCategory;

      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor").log(
        "Visit restaurant page"
      );
      cy.wait(5000);
      menuPage.selectCategory(productCategory);
      menuPage.productCard(productName).should("be.visible");
      menuPage.productImage(productName).should("be.visible");
      menuPage.productTitle(productName).should("be.visible");
      menuPage.productDescription(productName).should("be.visible");
      menuPage.productCalories(productName).should("be.visible");
      menuPage
        .productCost(productName)
        .should("be.visible")
        .should("not.be.empty");
    });

    it("Test Case 929: Verify No Calories items - Mobile", () => {
      const productName = dataPage.productWithNoCalories.productName;
      const productCategory = dataPage.productWithNoCalories.productCategory;
      const productCategories = dataPage.productWithNoCalories.productCalories;

      cy.visit("/menu/zippys-restaurants-sandbox-demo-vendor").log(
        "Visit restaurant page"
      );
      cy.wait(5000);
      menuPage.selectCategory(productCategory);
      menuPage.productCalories(productName).should("not.exist");
    });

    it("Test Case 931: Verify Categories and Products for Delivery - Mobile", () => {
      const productName = dataPage.productWithModifiers.productName;
      const productCategory = dataPage.productWithModifiers.productCategory;

      cy.visit("/").log("Visit handoff page");
      handoffPage.accessMenuPageWithinDeliveryOption();
      cy.wait(5000);
      menuPage.selectCategory(productCategory);
      menuPage.productCard(productName).should("be.visible");
      menuPage.productImage(productName).should("be.visible");
      menuPage.productTitle(productName).should("be.visible");
      menuPage.productDescription(productName).should("be.visible");
      menuPage.productCalories(productName).should("be.visible");
      menuPage.productCost(productName).should("be.visible");
    });

    //TODO: Bug 2354: Customize your plate products are not appearing for products with size modifiers
    it(
      ["Bug"],
      "Test Case 1070: Product details edit and customize - Mobile",
      () => {
        const productName = dataPage.productWithModifiers.productName;

        cy.visit(
          "/menu/zippys-restaurants-sandbox-demo-vendor/products/687422"
        ).log("Visit product details page");
        cy.wait(5000);
        productDescriptionPage.customizeYourPlateButton().click();
        productDescriptionPage.brownRicePlateCustomizerMobile().click();
        productDescriptionPage.iAmDoneButton().click();
        cy.wait(1000);
        productDescriptionPage.brownRicePlateCustomizerMobile().should("exist");
        productDescriptionPage.customizeYourPlateButton().click();
        productDescriptionPage.whiteRicePlateCustomizerMobile().click();
        productDescriptionPage.cancelButton().click();
        cy.wait(1000);
        productDescriptionPage.brownRicePlateCustomizerMobile().should("exist");
        productDescriptionPage.customizeYourPlateButton().click();
        productDescriptionPage.whiteRicePlateCustomizerMobile().click();
        productDescriptionPage.iAmDoneButton().click();
        cy.wait(1000);
        productDescriptionPage
          .brownRicePlateCustomizerMobile()
          .should("not.exist");
        productDescriptionPage.whiteRicePlateCustomizerMobile().should("exist");
      }
    );
  });
});
