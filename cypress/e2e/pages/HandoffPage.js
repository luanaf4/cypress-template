const dataPage = require("../pages/DataPage");

class HandoffPage {
  //Element Mapping

  locationSearchBox() {
    return cy.get("#orderLocationSearchBox");
  }

  deliverySearchBoxPlaceholder() {
    return cy.contains("Enter your delivery address");
  }

  pickupSearchBoxPlaceholder() {
    return cy.contains("Enter your City, State, Zip Code");
  }

  startOrderButton() {
    return cy.get("#ctaButton");
  }

  selectLocationButton() {
    return cy.get("#ctaPickupButton");
  }

  dropdownLocationAddress() {
    return cy.get("#addressOption");
  }

  dropdownLocationAddressAccepted() {
    return cy.get(".px-4").contains(dataPage.delivery.validDeliveryAddress);
  }

  dropdownLocationAddressAccepted2() {
    return cy.get(".px-4").contains(dataPage.delivery.validDeliveryAddress2);
  }

  deliverySuccessMessage() {
    return cy.contains(dataPage.delivery.successMessageTitle);
  }

  dropdownLocationAddressUnsuccessful() {
    return cy.contains(dataPage.delivery.invalidDeliveryAddress);
  }

  invalidDeliveryAddress(address) {
    return cy.contains(address);
  }

  backgroundImage() {
    return cy.get(".bg-pattern-grey");
  }

  deliveryAvailableMessageTitle() {
    return cy.get("#deliveryAvailabilityText");
  }

  deliveryFailMessageTitle() {
    return cy.contains("DELIVERY IS NOT AVAILABLE");
  }

  deliveryFailMessageDescription() {
    return cy.contains("Please edit your address or try Pickup instead.");
  }

  dropdownNewYorkAddress() {
    return cy.contains("New York City");
  }

  dropdownHonoluluAddress() {
    return cy.contains("Honolulu, HI US");
  }

  locationList() {
    return cy.get("#locationList");
  }

  listItem1() {
    return cy.contains("Las Vegas");
  }

  listItem2() {
    return cy.contains("Zippy's Restaurants");
  }

  pickupOption() {
    return cy.get("#pickupTabButton");
  }

  deliveryOption() {
    return cy.get("#deliveryTabButton");
  }

  locationAddress() {
    return cy.contains("Street Name");
  }

  specialtyItems() {
    return cy.contains("Specialty items");
  }

  pickupMethods() {
    return cy.contains("Pickup methods");
  }

  timeStoreCloses() {
    return cy.contains("closes at");
  }

  findZippysIcon() {
    return cy.get(".mt-20");
  }

  useMyLocation() {
    return cy.contains("Use my location");
  }

  dropdownBrasiliaAddress() {
    return cy.contains("Brasilia, PR US");
  }

  sushiAvailable() {
    return cy.get("#sushi");
  }

  anyCardRestaurant() {
    return cy.get("#locationCard");
  }

  cardRestaurant(restaurantName) {
    return cy.get("#locationCard").contains(restaurantName);
  }

  primaryHeader() {
    return cy.get('[data-testid="primaryHeader"]');
  }

  restaurantHours() {
    return cy.get("#restaurantHours-0");
  }

  proceedAnywayButton() {
    return cy.get('[data-testid="proceed-anyway-button"]');
  }

  changeLocationButton() {
    return cy.get('[data-testid="change-location-button"]');
  }

  unavailableCardRestaurant() {
    return cy.get("#unavalibleBadge-0");
  }

  inStoreTag() {
    return cy.get('#pickupMethod-0-in-store')
  }

  curbsideTag() {
    return cy.get('#pickupMethod-0-curbside')
  }

  driveUpTag() {
    return cy.get('#pickupMethod-0-drive-up')
  }

  //Methods

  searchForLocation(address) {
    cy.wait(2000);
    this.locationSearchBox().type(address).wait(3000).type("{backspace}");
    this.dropdownLocationAddress().contains(address).click();
    cy.wait(1500);
    this.primaryHeader().click();
    cy.wait(500);
  }

  selectRestaurant(restaurantName) {
    this.cardRestaurant().contains(restaurantName).click();
    cy.wait(1500);
    this.startOrderButton().click();
  }

  accessMenuPageWithinDeliveryOption() {
    cy.wait(1000);
    this.deliveryOption().click().wait(500);
    cy.wait(500);
    this.deliveryOption().click().wait(500);
    this.locationSearchBox()
      .type(dataPage.delivery.validDeliveryAddress)
      .type("{backspace}")
      .wait(2000);
    this.dropdownLocationAddressAccepted().click().wait(1000);
    this.startOrderButton().click().click().wait(2000);
  }

  accessMenuPageWithinPickupOption() {
    cy.wait(1000);
    this.pickupOption().click().wait(500);
    this.pickupOption().click().wait(500);
    this.locationSearchBox()
      .type(dataPage.delivery.validDeliveryAddress)
      .type(" ")
      .type("{backspace}");
    cy.wait(500);
    this.dropdownLocationAddressAccepted().click();
    cy.wait(2000);
    this.startOrderButton().click();
    cy.wait(2000);

    //cy.visit('/menu/zippys-restaurants-sandbox-demo-vendor')
  }

  searchInvalidDeliveryAddress() {
    cy.wait(500);
    this.deliveryOption().click();
    this.typeInvalidDeliveryAddress();
  }

  typeInvalidDeliveryAddress() {
    this.locationSearchBox()
      .type("14841")
      .wait(500)
      .type(" Dallas")
      .wait(500)
      .type(" Pkwy,")
      .wait(500)
      .type(" Dallas,")
      .wait(500)
      .type(" TX")
      .wait(500)
      .type(" 75254")
      .wait(500)
      .type(" US")
      .wait(500)
      .type("{backspace}");
    cy.wait(2000);
  }

  typeValidDeliveryAddress() {
    this.locationSearchBox()
      .type(dataPage.delivery.validDeliveryAddress)
      .type(" ")
      .type("{backspace}")
      .wait(500);
  }

  mockHonoluluRestaurantsToCanNotPickupInStore() {
    cy.intercept("GET", "**/locations*", (req) => {
      req.reply((res) => {
        res.body.locations.forEach((restaurant) => {
          restaurant.canPickup = false;
        });
        res.send();
      });
    }).as("getNearbyRestaurants");
  }

  mockHonoluluRestaurantsToHaveOnePickupMethod() {
    cy.intercept("GET", "**/locations*", (req) => {
      req.reply((res) => {
        res.body.locations.forEach((restaurant) => {
          restaurant.canPickup = false;
          restaurant.supportsDispatch = false;
          restaurant.supportsDriveThru = false;
        });
        res.send();
      });
    }).as("getNearbyRestaurants");
  }

  mockRadarNewYorkSearch() {
    const response = {
      meta: {
        code: 200,
      },
      addresses: [
        {
          addressLabel: "2 World Trade Ctr",
          number: "2",
          street: "World Trade Ctr",
          city: "New York",
          stateCode: "NY",
          postalCode: "10007",
          county: "New York",
          countryCode: "US",
          formattedAddress: "2 World Trade Ctr, New York, NY 10007 US",
          layer: "address",
          latitude: 40.711969793,
          longitude: -74.01066507,
          geometry: {
            type: "Point",
            coordinates: [-74.01066507, 40.711969793],
          },
          distance: 7697805.902324961,
          confidence: "exact",
          state: "New York",
          country: "United States",
          countryFlag: "🇺🇸",
        },
        {
          addressLabel: "2 World Trade Ctr",
          number: "2",
          street: "World Trade Ctr",
          city: "Long Beach",
          stateCode: "CA",
          postalCode: "90802",
          county: "Los Angeles",
          countryCode: "US",
          formattedAddress: "2 World Trade Ctr, Long Beach, CA 90802 US",
          layer: "address",
          latitude: 33.7680015563965,
          longitude: -118.20157623291,
          geometry: {
            type: "Point",
            coordinates: [-118.20157623291, 33.7680015563965],
          },
          distance: 9912909.68384355,
          confidence: "exact",
          state: "California",
          country: "United States",
          countryFlag: "🇺🇸",
        },
      ],
    };

    cy.intercept("**/autocomplete/?query=*", {
      statusCode: 200,
      body: response,
    }).as("getAutocompleteNew");

    // cy.intercept("**/autocomplete/?query=2+World*", {
    //   statusCode: 200,
    //   body: response,
    // }).as("getAutocompleteWorldTrade");
  }

  mockAllHandoffMethodsAvailable() {
    cy.intercept("GET", "**/locations?*", (req) => {
      req.reply((res) => {
        // Modify the response body
        res.body.locations.forEach((location) => {
          location.isAvailable = true;
          location.isCurrentlyOpen = true;
          location.canPickup = true;
          location.supportsCurbside = true;
          location.supportsDineIn = true;
          location.supportsDispatch = true;
          location.supportsDriveThru= true;
        });
        // Send the modified response
        res.send(res.body);
      });
    });
  }

  mockAllHandoffMethodsUnavailable() {
    cy.intercept("GET", "**/locations?*", (req) => {
      req.reply((res) => {
        // Modify the response body
        res.body.locations.forEach((location) => {
          location.isAvailable = true;
          location.isCurrentlyOpen = true;
          location.canPickup = false;
          location.supportsCurbside = false;
          location.supportsDineIn = false;
          location.supportsDispatch = false;
          location.supportsDriveThru= false;
        });
        // Send the modified response
        res.send(res.body);
      });
    });
  }

  mockOnlyDineInAvailable() {
    cy.intercept("GET", "**/locations?*", (req) => {
      req.reply((res) => {
        // Modify the response body
        res.body.locations.forEach((location) => {
          location.isAvailable = true;
          location.isCurrentlyOpen = true;
          location.canPickup = true;
          location.supportsCurbside = false;
          location.supportsDineIn = false;
          location.supportsDispatch = false;
          location.supportsDriveThru= false;
        });
        // Send the modified response
        res.send(res.body);
      });
    });
  }

  mockOnlyCurbsideAvailable() {
    cy.intercept("GET", "**/locations?*", (req) => {
      req.reply((res) => {
        // Modify the response body
        res.body.locations.forEach((location) => {
          location.isAvailable = true;
          location.isCurrentlyOpen = true;
          location.canPickup = false;
          location.supportsCurbside = true;
          location.supportsDineIn = false;
          location.supportsDispatch = false;
          location.supportsDriveThru= false;
        });
        // Send the modified response
        res.send(res.body);
      });
    });
  }

  mockOnlyDriveThruAvailable() {
    cy.intercept("GET", "**/locations?*", (req) => {
      req.reply((res) => {
        // Modify the response body
        res.body.locations.forEach((location) => {
          location.isAvailable = true;
          location.isCurrentlyOpen = true;
          location.canPickup = false;
          location.supportsCurbside = false;
          location.supportsDineIn = false;
          location.supportsDispatch = false;
          location.supportsDriveThru= true;
        });
        // Send the modified response
        res.send(res.body);
      });
    });
  }

  mock10Restaurants() {
    cy.fixture("10_stores.json").then((data) => {
      const newRes = data;

      // Intercept the API request and respond with fixture data
      cy.intercept(
        {
          method: "GET",
          url: "**/locations*",
        },
        {
          statusCode: 200,
          body: newRes,
        }
      ).as("getRestaurants");
    });
  }

  mockSushiMetadataForAllRestaurants() {
    cy.intercept("GET", "**/locations?latitude*", (req) => {
      req.reply((res) => {
        // Modify the response body
        res.body.locations.forEach((location) => {
          location.metadata.push({
            key: "location-offerings",
            value: "sushi",
          });
        });

        // Send the modified response
        res.send(res.body);
      });
    }).as("getLocations");
  }

  mockAllAvailableRestaurants() {
    cy.intercept("GET", "**/locations?*", (req) => {
      req.reply((res) => {
        // Modify the response body
        res.body.locations.forEach((location) => {
          location.isAvailable = true;
          location.isCurrentlyOpen = true;
        });
        // Send the modified response
        res.send(res.body);
      });
    });
  }

  mockAllUnavailableRestaurants() {
    cy.intercept("GET", "**/locations?*", (req) => {
      req.reply((res) => {
        // Modify the response body
        res.body.locations.forEach((location) => {
          location.isAvailable = false;
          location.isCurrentlyOpen = true;
        });
        // Send the modified response
        res.send(res.body);
      });
    });
  }

  mockAllClosedRestaurants() {
    cy.intercept("GET", "**/locations?*", (req) => {
      req.reply((res) => {
        // Modify the response body
        res.body.locations.forEach((location) => {
          location.isAvailable = true;
          location.isCurrentlyOpen = false;
        });
        // Send the modified response
        res.send(res.body);
      });
    });
  }

  mockDeliveryCoverage() {
    cy.intercept("POST", "**/checkdeliverycoverage", (req) => {
      if (
        req.url ===
        "https://dev-zippys-ignite.westus2.azurecontainer.io/ordering/v1/restaurants/133094/checkdeliverycoverage"
      ) {
        req.reply({
          statusCode: 200,
          body: {
            candeliver: true,
            message: null,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        req.reply({
          statusCode: 200,
          body: {
            candeliver: false,
            message: null,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    });
  }
}
export default HandoffPage;
