const dataPage = require("./DataPage");

class ProductDescriptionPage {
  //Element Mapping
  productImage() {
    return cy.get("#productDetailsImage");
  }

  productTitle() {
    return cy.get("#productInfo-title");
  }

  productCollapsedDescription() {
    return cy.get("#productDetailsCollapsedDescription");
  }

  productDescription() {
    return cy.get("#productInfo-description");
  }

  productCost() {
    return cy.get("#product-cost");
  }

  productCalories() {
    return cy.get("#price-calories");
  }

  readMoreButton() {
    return cy.get("#readMoreButton");
  }

  addQuantityButtonDesktop() {
    return cy.get("#quantity-selector-desktop > #quantity-select > #addButton");
  }

  addQuantityButtonMobile() {
    return cy.get("#quantity-selector-mobile > #quantity-select > #addButton");
  }

  removeQuantityButtonDesktop() {
    return cy.get(
      "#quantity-selector-desktop > #quantity-select > #removeButton"
    );
  }

  removeQuantityButtonMobile() {
    return cy.get(
      "#quantity-selector-mobile > #quantity-select > #removeButton"
    );
  }

  numberQuantityButtonDesktop() {
    return cy.get(
      "#quantity-selector-desktop > #quantity-select > #quantity-number"
    );
  }

  numberQuantityButtonMobile() {
    return cy.get(
      "#quantity-selector-mobile > #quantity-select > #quantity-number"
    );
  }

  size(sizeName) {
    return cy.get('[data-testid="size"]').contains(sizeName);
  }

  addonProduct(addonName) {
    return cy.get('[data-testid="addonCard"]').contains(addonName);
  }

  regularSizeModifier() {
    return cy.get("#size-2797180521");
  }

  miniSizeModifier() {
    return cy.get("#size-2797180520");
  }

  regularSizeModifierPrice() {
    return cy.get("#size-2797180521 > .font-din");
  }

  miniSizeModifierPrice() {
    return cy.get("#size-2797180520 > .font-din");
  }

  whiteRicePlateCustomizer() {
    return cy.get('[data-testid="image-2797180566"]');
  }

  whiteRicePlateCustomizerMobile() {
    return cy.get('[data-testid="image-2752616259"]');
  }

  brownRicePlateCustomizer() {
    return cy.get('[data-testid="image-2797180567"]');
  }

  brownRicePlateCustomizerMobile() {
    return cy.get('[data-testid="image-2752616260"]');
  }

  noCabbageCustomizer() {
    return cy.get('[data-testid="diagonal-line-image-2875572669"]');
  }

  addProductToCart() {
    return cy.get("#add-to-cart");
  }

  customizeYourPlateButton() {
    return cy.get('[data-testid="button-customize-your-plate"]');
  }

  customizeYourPlateProductsList() {
    return cy.get('[data-testid="option-grid"]');
  }

  customizeYourPlateProducts(customizeOption) {
    return cy.get('[data-testid="modifier-name"]').contains(customizeOption);
  }  

  iAmDoneButton() {
    return cy.get("#modifier-footer-done");
  }

  cancelButton() {
    return cy.get("#modifier-footer-cancel");
  }

  completeYourMealSection() {
    return cy.get('[data-testid="complete-your-meal"]');
  }

  featuredIcon() {
    return cy.get("#featured-icon");
  }

  selectFlavorSectionTitle() {
    return cy.contains("Select Flavor");
  }

  //Methods

  mockErrorInAddProductCall() {
    cy.intercept('POST', '**/ordering/v1/baskets/*/products/bychainid', {
      statusCode: 400, 
      body: { message: 'Internal Server Error' },
    }).as('addToCart'); 
  }
}

export default ProductDescriptionPage;
