class CommonPage {
  //Element Mapping

  logoZippys() {
    return cy.get(
      '[data-testid="zippysLogoMenuLink"], [data-testid="zippysLogoSearchLink"]'
    );
  }

  aboutZippys() {
    return cy.get('[data-testid="aboutZippysLink"]');
  }

  signUp() {
    return cy.get('[data-testid="signUpLink"]')
  }

  logIn() {
    return cy.get('[data-testid="logInLink"]');
  }

  checkoutButton() {
    return cy.get("#navbar-checkout");
  }

  navbarCart() {
    return cy.get('[data-testid="cartButton"]');
  }

  hamburgerMenuButton() {
    return cy.get('[data-testid="hamburgerButton"] > img');
  }

  hamburgerMenuCloseButton() {
    return cy.get('[data-testid="hamburgerNavCloseButton"] > img');
  }

  alohaText() {
    return cy.get('[data-testid="alohaText"]');
  }

  toastElement() {
    return cy.get('[data-testid="add-product-toast"]')
  }

  //Methods

  validateHomePageElements() {
    this.menuButton.should("be", "visible");
  }

  denyGeolocationPermission() {
    Cypress.env("browserPermissions", {
      ...Cypress.env("browserPermissions"),
      geolocation: "block",
    });
  }

  allowGeolocationPermission() {
    Cypress.env("browserPermissions", {
      ...Cypress.env("browserPermissions"),
      geolocation: "allow",
    });
  }

  openBrowserWithGeolocationPermission() {
    cy.visit("/", {
      onBeforeLoad(win) {
        const latitude = 40.7119697;
        const longitude = -74.010665;

        // Set the geolocation to the specified coordinates
        cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake(
          (cb, err) => {
            const geolocationPermission =
              Cypress.env("browserPermissions").geolocation;
            if (geolocationPermission === "block") {
              return err({ code: 1, message: "User denied Geolocation" });
            } else {
              return cb({ coords: { latitude, longitude } });
            }
          }
        );

        // Stub the watchPosition method similarly if needed
        cy.stub(win.navigator.geolocation, "watchPosition").callsFake(
          (cb, err) => {
            const geolocationPermission =
              Cypress.env("browserPermissions").geolocation;
            if (geolocationPermission === "block") {
              return err({ code: 1, message: "User denied Geolocation" });
            } else {
              return cb({ coords: { latitude, longitude } });
            }
          }
        );
      },
    });
  }
}

export default CommonPage;
