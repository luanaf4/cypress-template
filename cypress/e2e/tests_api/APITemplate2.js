describe('Login API', () => {

  it('POST API Client Login', () => {
        
    const requestBody = 
    {
      "clientId": "diplomas.anima.graduar",
      "clientSecret": "duxgowwa8se9au8wkc59nh7kxwh5msgq034u58h19qyw31x81gd9",
      "grantType": "client_credentials"
    };
  
    // Send POST request using cy.request()
    cy.request({
      method: 'POST',
      url: 'https://dev.authentication.a2s.technology/api/authentication/login',
      headers: {
        'Content-Type': 'application/json'
      },
      body: requestBody
      }).then((response) => {
        // Assert response status code
        expect(response.status).to.equal(200); // Assuming successful creation returns 200
      });

    });

});
  