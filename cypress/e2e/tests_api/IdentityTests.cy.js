import ApiPage from "../pages/ApiPage";
const apiBaseUrl = 'https://dev-zippys-ignite.westus2.azurecontainer.io';
const locationsEndpoint = `${apiBaseUrl}/identity/v1/registration`;

// Import the faker library correctly
const { faker } = require('@faker-js/faker');
const apiPage = new ApiPage();

const birthDateValid = "2000-04-05";
const birthDateInvalid = "2030-04-05";
const basketIdValid = "5064472039" ;//"25ddba09-bd67-49cf-b5bf-c88c841e2ca0";
const basketIdEmpty = ""
const basketIdInvalid = "a"
const userEmailValid = "jhonatanpereiratest3@gmail.com"
const userEmailEmpty = ""
const userEmailInvalid = "aa123"
const userPasswordValid = "Test12345!" 
const userPasswordEmpty = ""
const userPasswordInvalid = "a"



describe('Identity API', () => {

  
// TODO: Registration tests will be skipped to avoid overflowing our account list in sandbox
  context('POST Register', () => { 

    let randomEmailFixed;

    before(() => {
      randomEmailFixed = faker.internet.email(); // Generate a random email using faker
    });

    it.skip('Test Case 3685: Verify Registration without BasketID', () => {
      const randomFirstName = faker.person.firstName(); // Generate a random first name using faker
      const randomLastName = faker.person.lastName(); // Generate a random last name using faker
      const randomEmail = faker.internet.email(); // Generate a random email using faker


      apiPage.registerNewAccountFromAPI(randomFirstName,randomLastName,randomEmail,birthDateValid, basketIdEmpty).then((response) => {
        expect(response.status).to.equal(200);
      });
    });

    it.skip('Test Case 3683: Verify Registration with BasketID', () => {
      const randomFirstName = "."; //faker.person.firstName(); // Generate a random first name using faker
      const randomLastName = "."; //faker.person.lastName(); // Generate a random last name using faker
      const randomEmail = faker.internet.email(); // Generate a random email using faker


      apiPage.registerNewAccountFromAPI(randomFirstName,randomLastName,randomEmail,birthDateValid, basketIdValid, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.equal(200);
      });
    });

    //TODO: Bug 3761: User can register an account with a future birth date
    it.skip(["Bug"],'Test Case 3687: Verify Registration with Birth Date in Future', () => {
      const randomFirstName = faker.person.firstName(); // Generate a random first name using faker
      const randomLastName = faker.person.lastName(); // Generate a random last name using faker
      const randomEmail = faker.internet.email(); // Generate a random email using faker


      apiPage.registerNewAccountFromAPI(randomFirstName,randomLastName,randomEmail,birthDateInvalid, basketIdEmpty, { failOnStatusCode: false }).then((response) => {
        expect(response.status).not.to.equal(200);
      });
    });

    it.skip('Test Case 3688: Verify Registration with valid Birth Date', () => {
      const randomFirstName = faker.person.firstName(); // Generate a random first name using faker
      const randomLastName = faker.person.lastName(); // Generate a random last name using faker
      const randomEmail = faker.internet.email(); // Generate a random email using faker


      apiPage.registerNewAccountFromAPI(randomFirstName,randomLastName,randomEmail,birthDateValid, basketIdEmpty).then((response) => {
        expect(response.status).to.equal(200);
      });
    });

    it.skip('Test Case 3689: Verify Registration with repeated email', () => {
      const existentEmail = "Oda50@hotmail.com"
      const existentName = "Jordi"
      const existentLastName = "Harvey"
      const errorMessage = "It looks like this email address is already registered with an account.  Simply login to get started. If you can't remember your password, click 'Forgot Password.'"

      //Create 1st account
      apiPage.registerNewAccountFromAPI(existentName, existentLastName, randomEmailFixed).then((response) => {
        expect(response.status).to.equal(200);
        cy.log("1st Account created with success!")
      });

      //Create 2nd account with same parameters
      apiPage.registerNewAccountFromAPI(existentName, existentLastName, randomEmailFixed, birthDateValid, basketIdValid, { failOnStatusCode: false }).then((response) => {
        expect(response.status).not.to.equal(200);
        expect(response.body).to.have.property('detail', errorMessage);
        cy.log("2nd account should not be created with existent or repeated email")
      });
    });
  });


  context('POST Login', () => {  

    //TODO: Bug 3793: User can't login with a valid BasketID
    it(["Bug"],'Test Case 3765: Verify login with email valid, password valid, basketID valid', () => {
      apiPage.loginWithAnAccount(userEmailValid, userPasswordValid, basketIdValid).then((response) => {
        expect(response.status).to.equal(200);
      });
    });

    it('Test Case 3767: Verify login with email valid, password valid, basketID invalid', () => {
      apiPage.loginWithAnAccount(userEmailValid, userPasswordValid, basketIdInvalid).then((response) => {
        expect(response.status).not.to.equal(200); // Assuming an invalid basketID returns 400
      });
    });

    it('Test Case 3768: Verify login with email valid, password valid, basketID blank', () => {
      apiPage.loginWithAnAccount(userEmailValid, userPasswordValid, basketIdEmpty).then((response) => {
        expect(response.status).to.equal(200); // Adjust based on expected outcome
      });
    });

    it('Test Case 3769: Verify login with email valid, password invalid, basketID valid', () => {
      apiPage.loginWithAnAccount(userEmailValid, userPasswordInvalid, basketIdValid).then((response) => {
        expect(response.status).not.to.equal(200); // Assuming invalid password returns 401
      });
    });

    it('Test Case 3770: Verify login with email valid, password invalid, basketID invalid', () => {
      apiPage.loginWithAnAccount(userEmailValid, userPasswordInvalid, basketIdInvalid).then((response) => {
        expect(response.status).not.to.equal(200);
      });
    });

    it('Test Case 3771: Verify login with email valid, password invalid, basketID blank', () => {
      apiPage.loginWithAnAccount(userEmailValid, userPasswordInvalid, basketIdEmpty).then((response) => {
        expect(response.status).not.to.equal(200);
      });
    });

    it('Test Case 3772: Verify login with email valid, password blank, basketID valid', () => {
      apiPage.loginWithAnAccount(userEmailValid, userPasswordEmpty, basketIdValid).then((response) => {
        expect(response.status).not.to.equal(200);
      });
    });

    it('Test Case 3773: Verify login with email valid, password blank, basketID invalid', () => {
      apiPage.loginWithAnAccount(userEmailValid, userPasswordEmpty, basketIdInvalid).then((response) => {
        expect(response.status).not.to.equal(200);
      });
    });

    it('Test Case 3774: Verify login with email valid, password blank, basketID blank', () => {
      apiPage.loginWithAnAccount(userEmailValid, userPasswordEmpty, basketIdEmpty).then((response) => {
        expect(response.status).not.to.equal(200);
      });
    });

    it('Test Case 3775: Verify login with email invalid, password valid, basketID valid', () => {
      apiPage.loginWithAnAccount(userEmailInvalid, userPasswordValid, basketIdValid).then((response) => {
        expect(response.status).not.to.equal(200);
      });
    });

    it('Test Case 3776: Verify login with email invalid, password valid, basketID invalid', () => {
      apiPage.loginWithAnAccount(userEmailInvalid, userPasswordValid, basketIdInvalid).then((response) => {
        expect(response.status).not.to.equal(200);
      });
    });

    it('Test Case 3777: Verify login with email invalid, password valid, basketID blank', () => {
      apiPage.loginWithAnAccount(userEmailInvalid, userPasswordValid, basketIdEmpty).then((response) => {
        expect(response.status).not.to.equal(200);
      });
    });

    it('Test Case 3778: Verify login with email invalid, password invalid, basketID valid', () => {
      apiPage.loginWithAnAccount(userEmailInvalid, userPasswordInvalid, basketIdValid).then((response) => {
        expect(response.status).not.to.equal(200);
      });
    });

    it('Test Case 3779: Verify login with email invalid, password invalid, basketID invalid', () => {
      apiPage.loginWithAnAccount(userEmailInvalid, userPasswordInvalid, basketIdInvalid).then((response) => {
        expect(response.status).not.to.equal(200);
      });
    });

    it('Test Case 3780: Verify login with email invalid, password invalid, basketID blank', () => {
      apiPage.loginWithAnAccount(userEmailInvalid, userPasswordInvalid, basketIdEmpty).then((response) => {
        expect(response.status).not.to.equal(200);
      });
    });

    it('Test Case 3781: Verify login with email invalid, password blank, basketID valid', () => {
      apiPage.loginWithAnAccount(userEmailInvalid, userPasswordEmpty, basketIdValid).then((response) => {
        expect(response.status).not.to.equal(200);
      });
    });

    it('Test Case 3782: Verify login with email invalid, password blank, basketID invalid', () => {
      apiPage.loginWithAnAccount(userEmailInvalid, userPasswordEmpty, basketIdInvalid).then((response) => {
        expect(response.status).not.to.equal(200);
      });
    });

    it('Test Case 3783: Verify login with email invalid, password blank, basketID blank', () => {
      apiPage.loginWithAnAccount(userEmailInvalid, userPasswordEmpty, basketIdEmpty).then((response) => {
        expect(response.status).not.to.equal(200);
      });
    });

    it('Test Case 3784: Verify login with email blank, password valid, basketID valid', () => {
      apiPage.loginWithAnAccount(userEmailEmpty, userPasswordValid, basketIdValid).then((response) => {
        expect(response.status).not.to.equal(200);
      });
    });

    it('Test Case 3785: Verify login with email blank, password valid, basketID invalid', () => {
      apiPage.loginWithAnAccount(userEmailEmpty, userPasswordValid, basketIdInvalid).then((response) => {
        expect(response.status).not.to.equal(200);
      });
    });

    it('Test Case 3786: Verify login with email blank, password valid, basketID blank', () => {
      apiPage.loginWithAnAccount(userEmailEmpty, userPasswordValid, basketIdEmpty).then((response) => {
        expect(response.status).not.to.equal(200);
      });
    });

    it('Test Case 3787: Verify login with email blank, password invalid, basketID valid', () => {
      apiPage.loginWithAnAccount(userEmailEmpty, userPasswordInvalid, basketIdValid).then((response) => {
        expect(response.status).not.to.equal(200);
      });
    });

    it('Test Case 3788: Verify login with email blank, password invalid, basketID invalid', () => {
      apiPage.loginWithAnAccount(userEmailEmpty, userPasswordInvalid, basketIdInvalid).then((response) => {
        expect(response.status).not.to.equal(200);
      });
    });

    it('Test Case 3789: Verify login with email blank, password invalid, basketID blank', () => {
      apiPage.loginWithAnAccount(userEmailEmpty, userPasswordInvalid, basketIdEmpty).then((response) => {
        expect(response.status).not.to.equal(200);
      });
    });

    it('Test Case 3790: Verify login with email blank, password blank, basketID valid', () => {
      apiPage.loginWithAnAccount(userEmailEmpty, userPasswordEmpty, basketIdValid).then((response) => {
        expect(response.status).not.to.equal(200);
      });
    });

    it('Test Case 3791: Verify login with email blank, password blank, basketID invalid', () => {
      apiPage.loginWithAnAccount(userEmailEmpty, userPasswordEmpty, basketIdInvalid).then((response) => {
        expect(response.status).not.to.equal(200);
      });
    });

    it('Test Case 3792: Verify login with email blank, password blank, basketID blank', () => {
      apiPage.loginWithAnAccount(userEmailEmpty, userPasswordEmpty, basketIdEmpty).then((response) => {
        expect(response.status).not.to.equal(200);
      });
    });


  });


});