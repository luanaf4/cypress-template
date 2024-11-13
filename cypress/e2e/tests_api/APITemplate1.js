describe('Certificate API', () => {

  before(() => {
    loginPage.loginAPIClient();
  });

  it('POST Insert certificate', () => {
    const requestBody = {
      "course": {
        "name": "Mastering Python",
        "conclusionDate": "2023-07-31",
        "workload": 117,
        "level": "Curso",
        "disciplines": [ {"name": "Programação em Python III"},
         {"name":  "Machine Learning"},
          {"name": "IA com Python"}],   
        "partner": {"name": "AWS"}
      },
      "institution": {
        "name": "Universidade São Judas Tadeu",
        "city": "Belo Horizonte",
        "mecCode": 203,
        "brand": "UNIBH"
      },
      "root": {
        "type": "UC Graduação",
        "originSystem": "SIGA"
      },
      "signer": {
        "name": "Tony Stark",
        "position": "Diretor Geral"
      },
      "student": {
        "name": "Tales Melgaço",
        "cpf": "09717204012",
        "email": "tales@hotmail.com",
        "sex": "M",
        "registrationNumber": "889888"
      }
    };

    cy.api({
      method: 'POST',
      url: 'https://dev.api.diplomas.a2s.technology/certificate/api/certificate',
      headers: {
        'Authorization': `Bearer ${Cypress.env('bearerToken')}`,
        'Content-Type': 'application/json'
      },
      body: requestBody
    }).then((response) => {
      expect(response.status).to.equal(201);
    });
  });

  it('GET List certificates', () => {
    cy.api({
      method: 'GET',
      url: 'https://dev.api.diplomas.a2s.technology/certificate/api/certificate/batches/',
      headers: {
        'Authorization': `Bearer ${Cypress.env('bearerToken')}`,
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});
