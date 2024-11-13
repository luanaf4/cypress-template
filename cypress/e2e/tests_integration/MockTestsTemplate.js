import CommonPage from "../pages/CommonPage";
import HandoffPage from "../pages/HandoffPage";
import closedStoreMocked from "../../fixtures/closedStoreMocked.json";

const commonPage = new CommonPage();
const handoffPage = new HandoffPage();
const dataPage = require("../pages/DataPage");

const mockedResponse = {
  Cities: ["Mocked City"],
};

describe("MockAPI", () => {
  beforeEach(() => {
    cy.viewport(Cypress.env("desktop"));
  });

  it("Verificar URL da página de Diplomas", () => {
    //https://order.golo01.dominos.com/store-locator-typeahead-service/search/cities?countrycode=BR&State=MG
    cy.intercept(
      {
        method: "GET",
        url: "https://order.golo01.dominos.com/store-locator-typeahead-service/search/cities?countrycode=BR&State=MG",
      },
      (req) => {
        req.reply({
          statusCode: 200,
          body: mockedResponse,
        });
      }
    );

    cy.visit("https://www.dominos.com.br/pages/order/#!/locations/search");
    cy.wait(2000);
    cy.get(".Carryout").click();
    cy.get(".js-noCep").click();
    cy.get("#Region").select("MG");
    cy.get("#City").select("Mocked City");
    cy.get(".form__control-group--actions--aligncenter > .btn").click();
  });

  it("Verificar URL da página de menu", () => {
    cy.fixture("obs_1_store.json").then((data) => {
      const newRes = data;
      cy.intercept(
        {
          method: "GET",
          url: "/order/api/olo/v1.1/restaurants/near?lat=40.711969793&long=-74.01066507&radius=50&limit=10&calendarstart=20240624&calendarend=20240630",
        },
        (req) => {
          req.reply((res) => {
            res.send({
              body: newRes,
            });
          });
        }
      );

      cy.visit("https://mav-qa.outback.com/order");
      cy.wait(2000);

      // Make the POST request that will be intercepted
    });
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#onetrust-accept-btn-handler").click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-testid="curbside-address-input"]').type(
      "2 world trade center"
    );
    cy.get('[data-testid="suggestion-option-0"]').click();
    cy.wait(10000);
    /* ==== End Cypress Studio ==== */
  });

  it("Test Case 359: Mobile Web | Location Search Screen | Pickup | Location Services Enabled", () => {
    // Load fixture data
    cy.fixture("10_stores.json").then((data) => {
      const newRes = data;

      // Intercept the API request and respond with fixture data
      cy.intercept(
        {
          method: "GET",
          url: "**/restaurants/near*",
        },
        {
          statusCode: 200,
          body: newRes,
        }
      ).as("getRestaurants");

      // Allow geolocation permissions and open browser with mock location
      commonPage.allowGeolocationPermission();
      commonPage.openBrowserWithGeolocationPermission();

      /// Wait for the intercepted request to complete
      cy.wait("@getRestaurants");

      handoffPage.deliveryOption().click();
      handoffPage.locationSearchBox().click();
      handoffPage.locationSearchBox().type(dataPage.delivery.validDeliveryAddress);
      cy.wait(2000);
      handoffPage.dropdownLocationAddressAccepted().click();

      handoffPage.startOrderButton().click();
    });
  });
});
