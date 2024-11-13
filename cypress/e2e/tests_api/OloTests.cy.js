
describe('OLO API', () => {

  it('GET OLO Locations', () => {
    cy.api({
      method: 'GET',
      url: 'https://dev-zippys-ignite.westus2.azurecontainer.io/ordering/v1/restaurants/near?lat=40.71427&long=-74.00597&radius=100&limit=10',
      headers: {
        //Authorization: "prj_test_pk_1e7234e526dfff310a82a76de8fc81712ab3cf75",
      //  'Authorization': `Bearer ${Cypress.env('bearerToken')}`,
      //  'Content-Type': 'application/json'
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

});

