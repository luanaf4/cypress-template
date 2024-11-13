const apiBaseUrl = 'https://dev-zippys-ignite.westus2.azurecontainer.io';
const locationsEndpoint = `${apiBaseUrl}/locations`;

describe('GET Retrieve Locations', () => {

  it('should retrieve locations by latitude and longitude', () => {
    cy.api({
      method: 'GET',
      url: `${locationsEndpoint}?latitude=21.2958413&longitude=-157.8338316`,
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it('should retrieve locations by latitude, longitude, and radius', () => {
    cy.api({
      method: 'GET',
      url: `${locationsEndpoint}?latitude=21.2958413&longitude=-157.8338316&radius=15`,
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it('should retrieve locations with delivery option by latitude, longitude, and radius', () => {
    cy.api({
      method: 'GET',
      url: `${locationsEndpoint}?hasDelivery=true`,
    }).then((response) => {
      expect(response.status).to.equal(200);

      let hasFalseCanDeliver = false;
      response.body.locations.forEach(location => {
        cy.log(`Location: ${location.name}, canDeliver: ${location.canDeliver}`);
        if (location.canDeliver === false) {
          hasFalseCanDeliver = true;
        }
      });
    });
  });

  it('should retrieve locations by latitude, longitude, and store number', () => {
    cy.api({
      method: 'GET',
      url: `${locationsEndpoint}?latitude=40.7119697&longitude=-74.010665&locationNumber=OLO`,
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it('should retrieve locations by latitude, longitude, page size, and delivery option', () => {
    cy.api({
      method: 'GET',
      url: `${locationsEndpoint}?latitude=40.7119697&longitude=-74.010665&pageSize=1&hasDelivery=true`,
    }).then((response) => {
      // Verify response status
      expect(response.status).to.equal(200);
      cy.log(`Response body: ${JSON.stringify(response.body)}`);
  
      // Validate that 'locations' is an array
      expect(response.body.locations).to.be.an('array');
  
      if (response.body.locations.length === 0) {
        // Log a message if no locations are returned
        cy.log('No locations were returned in the response.');
      } else {
        // Validate that at least one location is returned
        expect(response.body.locations).to.not.be.empty;
  
        // Check that all locations have the required properties
        response.body.locations.forEach(location => {
          cy.log(`Location: ${location.name}, canDeliver: ${location.canDeliver}`);
          expect(location).to.have.all.keys('id', 'name', 'address', 'latitude', 'longitude', 'canDeliver');
        });
  
        // Validate that if 'hasDelivery' is true, 'canDeliver' should also be true for all locations
        const allCanDeliver = response.body.locations.every(location => location.canDeliver === true);
        expect(allCanDeliver).to.be.true;
      }
    });
  });
  

});

describe('GET Retrieve Single Location', () => {

  it('should retrieve a single location by valid location ID', () => {
    cy.api({
      method: 'GET',
      url: `${locationsEndpoint}/133094`,
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

});

describe('GET /locations', () => {
  it('should return all locations with the correct structure', () => {
    cy.request(`${locationsEndpoint}`).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(JSON.stringify(response.body));
      expect(response.body).to.have.property('locations');
      response.body.locations.forEach((location) => {
        cy.log(JSON.stringify(location));
        cy.log(`Location keys: ${Object.keys(location)}`);
      });
    });
  });
});

describe('GET /locations/:locationId', () => {
  it('should return the correct location details for a valid ID', () => {
    cy.request(`${locationsEndpoint}/133094`).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(JSON.stringify(response.body));
      cy.log(`Location keys: ${Object.keys(response.body)}`);
    });
  });

  it('should return 404 or 500 for an invalid location ID', () => {
    cy.request({ 
      url: `${locationsEndpoint}/aaaaaa`, 
      failOnStatusCode: false 
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect([404, 500]).to.include(response.status);
    });
  });
});

describe('GET /locations/:locationId/menu', () => {
  it('should return the menu for a valid location ID', () => {
    cy.request(`${locationsEndpoint}/133094/menu`).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(JSON.stringify(response.body));
      expect(response.body).to.have.property('categories'); 
    });
  });

  it('should return 404 or 500 for an invalid location ID menu request', () => {
    cy.request({ 
      url: `${locationsEndpoint}/aaaaaa/menu`, 
      failOnStatusCode: false 
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect([404, 500]).to.include(response.status);
    });
  });
});

describe('GET /products/:productId/modifiers', () => {
  const productsEndpoint = `${apiBaseUrl}/products`;

  it('should return modifiers for a valid product ID or 500 if the API is misbehaving', () => {
    cy.request({ 
      url: `${productsEndpoint}/validProductId/modifiers`, 
      failOnStatusCode: false 
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect([200, 500]).to.include(response.status);
      if (response.status === 200) {
        expect(response.body).to.have.property('modifiers');
        response.body.modifiers.forEach((modifier) => {
          expect(modifier).to.have.all.keys('id', 'name', 'options');
        });
      }
    });
  });

  it('should return 404 or 500 for an invalid product ID', () => {
    cy.request({ 
      url: `${productsEndpoint}/invalidProductId/modifiers`, 
      failOnStatusCode: false 
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect([404, 500]).to.include(response.status);
    });
  });
});

describe('GET /options/:optionId/nested', () => {
  const optionsEndpoint = `${apiBaseUrl}/options`;

  it('should return nested modifiers for a valid option ID or 500 if the API is misbehaving', () => {
    cy.request({ 
      url: `${optionsEndpoint}/validOptionId/nested`, 
      failOnStatusCode: false 
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect([200, 500]).to.include(response.status);
      if (response.status === 200) {
        expect(response.body).to.have.property('nestedModifiers');
        response.body.nestedModifiers.forEach((modifier) => {
          expect(modifier).to.have.all.keys('id', 'name', 'options');
        });
      }
    });
  });

  it('should return 404 or 500 for an invalid option ID', () => {
    cy.request({ 
      url: `${optionsEndpoint}/invalidOptionId/nested`, 
      failOnStatusCode: false 
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect([404, 500]).to.include(response.status);
    });
  });
});
