const dataPage = require("./DataPage");

class ApiPage {
  // Element Mapping

  // Methods

  loginWithAnAccount(email, password, basketId, options) {
    return cy.api ({ 
      method: "POST",
      url: 'https://dev-zippys-ignite.westus2.azurecontainer.io/identity/v1/login',
      body: 
      {
        "email": email,
        "password": password,
        "basketId": basketId
      },
      failOnStatusCode: false, // Prevent Cypress from failing the test on non-200 status
      ...options // Include options to allow for flexible handling
    })
  }

  registerNewAccountFromAPI(firstName, lastName, email, birth, basket, options = {}) {
    return cy.api({
      method: 'POST',
      url: 'https://dev-zippys-ignite.westus2.azurecontainer.io/identity/v1/registration',
      body: {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": "Test12345!",
        "phone": "2342342342",
        "dateOfBirth": birth, //"2000-04-05",
        "termsAccepted": true,
        "address1": "1234 Main St.",
        "address2": "PO Box 12345",
        "state": "TX",
        "city": "Dallas",
        "postalCode": "75217",
        "basketId": basket,
        "notificationPreferences": {
          "allowEmailNotifications": true,
          "allowPushNotifications": true,
          "allowTextNotifications": false
        }
      },
      failOnStatusCode: false, // Prevent Cypress from failing the test on non-200 status
      ...options // Include options to allow for flexible handling
    });
  }
}

export default ApiPage;
