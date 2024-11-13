const dataPage = require("./DataPage");

class OrderConfirmationPage {
  //Element Mapping

  orderConfirmationButton() {
    return cy.get('[data-testid="button-order-confirmation"]')
  }
  

  //Methods

  goToOrderConfirmation() {
    cy.visit("/checkout")
    cy.scrollTo("bottom")
    this.orderConfirmationButton().click()
  }

  mockErrorInCancelOrderCall() {
    cy.intercept('POST', '**/ordering/v1/orders/*/cancel', {
      statusCode: 400, // Ou 500, dependendo do erro que deseja simular
      body: { message: 'Erro ao cancelar o pedido' }, // Mensagem de erro personalizada
    }).as('cancelOrder');
  }
  
}
export default OrderConfirmationPage;
