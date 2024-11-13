import CommonPage from "../pages/CommonPage";
import DataPage from "../pages/DataPage"; 
import HandoffPage from "../pages/HandoffPage";
import MenuPage from "../pages/MenuPage";
import ChangeHandoffModalPage from "../pages/ChangeHandoffModalPage";
import ProductDescriptionPage from "../pages/ProductDescriptionPage";
import CheckoutPage from "../pages/CheckoutPage";

//Declare all pages here
const commonPage = new CommonPage();
const dataPage = require("../pages/DataPage");
const handoffPage = new HandoffPage();
const menuPage = new MenuPage();
const changeHandoffModalPage = new ChangeHandoffModalPage();
const productDescriptionPage = new ProductDescriptionPage();
const checkoutPage = new CheckoutPage();

class CartPage {
  //Elements

  cartHeader() {
    return cy.get('[data-testid="cartDrawerHeader"]');
  }

  cartCloseIcon() {
    return cy.get('[data-testid="cartDrawerCloseButton"]');
  }

  cartEmptyState() {
    return cy.get('[data-testid="cartDrawerEmptyState"]');
  }

  cartHandoffTime() {
    return cy.get('[data-testid="cartHandoffTime"]')
  }

  cartStartOrderCTAButon() {
    return cy.get('[data-testid="cartDrawerStartOrderButton"]');
  }

  cartProduct() {
    return cy.get('[data-testid="cartProductName"]');
  }

  productPrice() {
    return cy.get('[data-testid="cartProductCost"]');
  }

  numberQuantityButton() {
    return cy.get('[data-testid="cartQuantityPickerQuantityText"]');
  }

  addQuantityButton() {
    return cy.get('[data-testid="cartQuantityPickerAddImage"]');
  }

  removeQuantityButton() {
    return cy.get('[data-testid="cartQuantityPickerRemoveButton"]');
  }

  cartProductDescription() {
    return cy.get('[data-testid="cartProductChoices"]');
  }

  cartProductName(productName) {
    return cy.get('[data-testid="cartProductName"]').contains(productName);
  }

  quantityPicker() {
    return cy.get('[data-testid="cartQuantityPicker"]');
  }
  editButton() {
    return cy.get('[data-testid="cartProductEditButton"]');
  }

  cartContainer() {
    return cy.get('[data-testid="cartContent"]')
  }

  handoffInformation() {
    return cy.get('[data-testid="cartHandoffLocation"]');
  }

  itemsList() {
    return cy.get('[data-testid="cartContent"]');
  }

  checkoutButton() {
    return cy.get('[data-testid="CartCheckoutButton"]');
  }

  mayWeSuggestTitle() {
    return cy.contains('MAY WE SUGGEST');
  }

  mayWeSuggestList() {
    return cy.get('#upsellCard')
  }

  addUtensilsButton() {
    return cy.get('[data-testid="UtensilsButton"]'); 
  }
  
  

  subtotalLabel() {
    return cy.get('[data-testid="BasketInformationSectionSubtotal"]')
  }

  estimatedTaxLabel(){
    return cy.get('[data-testid="BasketInformationSectionTax"]')
  }

  //Methods

  addShoyuToCart() {
    cy.scrollTo("bottom");
    menuPage.testCategory().click();
    cy.scrollTo("bottom");
    menuPage.shoyuProduct().click();
    cy.wait(3000);
    productDescriptionPage.addProductToCart().click();
    cy.wait(2000);
  }
  
  addUpsellItemToBasket() {
    // Iterate over each upsell item and click the first one with a valid price
    this.mayWeSuggestList().find('button').each(($el) => {
        const price = $el.find('div#upsellCardPriceCal p').first().text().trim();

        // Proceed only if the price is not empty or $0
        if (price && price !== '$0') {
            const upsellName = $el.find('div#upsellCardTitle h3').first().text().trim();

            cy.log(`Product to add: ${upsellName}`);

            cy.wrap($el).click(); // Click the upsell item
            cy.wait(1000); 

            // Verify upsellName is a valid string
            expect(upsellName).to.be.a('string').and.not.be.empty;

            cy.get('[data-testid="cartProductName"]')
                .should('exist')
                .invoke('text') 
                .then((cartProductName) => {
                    cy.log(`Cart Product Name: ${cartProductName.trim()}`);
                    expect(cartProductName.trim()).to.contain(upsellName);
                });

            return false; // Stop after the first valid product
        }
    });
}

selectUpsellWithoutPrice() {
  // Iterate over each upsell item and click the first one with a valid price
  this.mayWeSuggestList().find('button').each(($el) => {
      const price = $el.find('div#upsellCardPriceCal p').first().text().trim();

      // Proceed only if the price is not empty or $0
      if (!price || price === '$0') {
          const upsellName = $el.find('div#upsellCardTitle h3').first().text().trim();

          cy.log(`Product to add: ${upsellName}`);

          cy.wrap($el).click(); // Click the upsell item
          cy.wait(1000); 

          // Verify upsellName is a valid string
          expect(upsellName).to.be.a('string').and.not.be.empty;

          cy.get('#productInfo-title')
              .should('exist')
              .invoke('text') 
              .then((cartProductName) => {
                  cy.log(`Cart Product Name: ${cartProductName.trim()}`);
                  expect(cartProductName.trim()).to.contain(upsellName);
              });
          cy.url().should("contain","/products")

          return false; // Stop after the first valid product
      }
  });
}

  mockCartItems() {
    cy.fixture("10_cartItems.json").then((data) => {
      const newRes = data;
      cy.intercept(
        {
          method: "POST",
          url: "**/bychainid",
        },
        (req) => {
          req.reply((res) => {
            res.send({
              body: newRes,
            });
          });
        }
      );
    });
  }
}

export default CartPage;
