
describe('Radar API', () => {


  it('GET Radar Locations', () => {
    cy.api({
      method: 'GET',
      url: 'https://api.radar.io/v1/search/autocomplete/?query=new+york&country=US&layers=address,postalCode,locality&limit=4',
      headers: {
        Authorization: "prj_test_pk_1b756b8a50865a11608376b5ce628903176fd378",
      //  'Authorization': `Bearer ${Cypress.env('bearerToken')}`,
      //  'Content-Type': 'application/json'
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

});

