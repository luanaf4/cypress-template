const dataPage = require("../pages/DataPage");

class MenuPage {
  //Element Mapping
  pickupFromLabelMobile() {
    return cy.get("#dropdownHandoffChangeText");
  }

  selectedRestaurantNameMobile() {
    return cy.get("#addressHandoffChange");
  }

  selectedRestaurantAddressMobile() {
    return cy.get(
      "p.text-sm.text-supporting-darkBrown.group-hover\\:text-supporting-darkerBlue.ml-1.pt-\\[5px\\]"
    );
  }

  selectedRestaurantReferenceMobile() {
    return cy.get("#crossStreetHandoffChange");
  }

  editIconRestaurant() {
    return cy.get("#handoffRestaurantDataMobile");
  }

  pickupTimeLabel() {
    return cy.get("#timeChangeLabel");
  }

  pickupTimeValue() {
    return cy.get("#handoffTimeMobile");
  }

  editIconTime() {
    return cy
      .get(
        "div.desktop:hidden > .desktop:my-4 > .desktop:rounded-r-md > .mr-6 > .size-full"
      )
      .eq(1);
  }

  locationBoxDeliverTo() {
    return cy.contains("Deliver to");
  }

  locationBoxOrderingFrom() {
    return cy.get("#buttonRestaurantData");
  }

  locationBoxOrderingFromMobile() {
    return cy.get("#restaurantNameHandoffChange");
  }

  locationBoxDeliveryTimeMobile() {
    return cy.get("#timeChangeLabel");
  }

  locationBoxDeliveryTime() {
    return cy.contains("Delivery time");
  }

  locationBoxPickupTimeLabel() {
    return cy.contains("Pickup time");
  }

  locationBoxPickupFrom() {
    return cy.get("#buttonHandoffChange");
  }

  handoffChangeButton() {
    return cy.get("#buttonHandoffChange");
  }

  locationBoxPickupDateTime() {
    return cy.get("#handoffTimeDesktop");
  }

  storeLocationSection() {
    return cy.get("#addressHandoffChange");
  }

  locationSearchBoxPlaceholder() {
    return cy.contains("Enter your City, State, Zip Code");
  }

  handoffRestaurantNameDesktop() {
    return cy.get("#handoffRestaurantDataDesktop");
  }

  handoffTimeDesktop() {
    return cy.get('#handoffTimeDesktop')
  }

  useMyLocationLink() {
    return cy.contains("Use my location");
  }

  arrowIcon() {
    return cy.get('img[alt="Arrow Icon"]');
  }

  cardRestaurant(restaurantName) {
    return cy.get("#locationCard").contains(restaurantName);
  }

  cardRestaurantText() {
    return cy.contains(dataPage.restaurant.validRestaurantName2);
  }

  cardRestaurant2() {
    return cy.get("#locationCard");
  }

  restaurantPhoto() {
    return cy.get(":nth-child(2) > .mx-6 > .relative > img");
  }

  saveChangesButton() {
    return cy.get("#changeRestaurantLocationModal-ctaButton");
  }

  dropdownHandoffChangeMobile() {
    return cy.get("#dropdownHandoffChangeText");
  }

  pickupLocationModalTitle() {
    return cy.get("#modalHeader");
  }

  pickupOption() {
    return cy.get("#pickupTabButton");
  }

  deliveryOption() {
    return cy.contains("Delivery");
  }

  changeRestaurantLocationModalTitle() {
    return cy.get("#changeRestaurantLocationModal-headerTitle");
  }

  changeRestaurantLocationPickupModalTitle() {
    return (
      cy.contains("PICKUP LOCATION"),
      cy.contains("DELIVERY ADDRESS"),
      cy.contains("DELIVERY LOCATION")
    );
  }

  changeRestaurantLocationDeliveryModalTitle() {
    return (
      cy.contains("PICKUP LOCATION"),
      cy.contains("DELIVERY ADDRESS"),
      cy.contains("DELIVERY LOCATION")
    );
  }

  successfulDeliveryAddress() {
    return cy.contains(dataPage.delivery.validDeliveryAddress);
  }

  unsuccessfulDeliveryAddress() {
    return cy.contains(dataPage.delivery.invalidDeliveryAddress);
  }

  pickupTimeButtonDesktop() {
    return cy.get("#buttonHandoffTime");
  }

  deliveryTimeButtonDesktop() {
    return cy.get("#buttonHandoffTime");
  }

  pickupTimeLabelDesktop() {
    return cy.get("#handoffTimeDesktop");
  }

  deliveryTimeLabelDesktop() {
    return cy.get("#handoffTimeDesktop");
  }

  editRestaurantButton() {
    return cy.get("#buttonHandoffChange");
  }

  changeHandoffButton() {
    return cy.get("#buttonHandoffChange");
  }

  deliverToButton() {
    return cy.get("#buttonHandoffChange");
  }

  deliverToMobileButton() {
    return cy.get("#handoffRestaurantDataMobile");
  }

  deliverToValue() {
    return cy.get("#addressHandoffChange");
  }

  deliverToMobileValue() {
    return cy.get("#addressHandoffChange");
  }

  restaurantAddressValue(address) {
    return cy.contains(address);
  }

  restaurantNameValue(name) {
    return cy.contains(name);
  }

  noAdditionalLocationsAvailableMessage() {
    return cy.get("#no-other-locations-text");
  }

  editYourAddressMessage() {
    return cy.get("#edit-your-address-message");
  }

  changeHandoffButton() {
    return cy.get("#buttonHandoffChange");
  }

  breakfastCategory() {
    return cy.get("#category-75283");
  }

  specialsCategory() {
    return cy.get("#category-75285");
  }

  testCategory() {
    return cy.get("#category-78857");
  }

  newYearsMealsToGoCategory() {
    return cy.get("#category-75590");
  }

  dailyPlatesCategory() {
    return cy.get("#category-75278");
  }

  selectedCategory() {
    return cy.get("#selected-category");
  }

  breakfastMeatLoverProduct() {
    return cy.get("#product-name-17854463");
  }

  meatAndEggsProduct() {
    return cy.get("#product-name-18334750");
  }

  shoyuProduct() {
    return cy.get("#product-name-18339583");
  }

  potatoBaconProduct() {
    return cy.get("#product-cost-17795206");
  }

  zipPacTestProduct() {
    return cy.get("#product-name-18338726");
  }

  zipPacTestDescription() {
    return cy.get("#product-description-18338726");
  }

  zipPacTestCost() {
    return cy.get("#product-cost-18338726");
  }

  zipPacTestCalories() {
    return cy.get("#product-calories-18338726");
  }

  tomatoBisqueProduct() {
    return cy.get("#product-name-17795207");
  }

  tomatoBisqueDescription() {
    return cy.get("#product-description-17795207");
  }

  bakedHamCalories() {
    return cy.get("#product-calories-17795199");
  }

  tomatoBisqueCalories() {
    return cy.get("#product-calories-17795207");
  }

  tomatoBisqueCost() {
    return cy.get("#product-cost-17795207");
  }

  tomatoBisqueImage() {
    return cy.get(":nth-child(55) > .relative > #product-image");
  }

  waterTestCost() {
    return cy.get("#product-cost-18339585");
  }

  categoriesList() {
    return cy.get("#categories-list");
  }

  categoryItem(productName) {
    return cy.get("#categories-list").contains(productName);
  }

  productCard() {
    return cy.get('[data-testid="product-button"]');
  }

  productItem(productName) {
    return this.productCard().contains(productName);
  }

  productImage(productName) {
    return this.productCard()
      .contains(productName)
      .closest("button")
      .find('img[data-testid="product-image"]');
  }

  productTitle(productName) {
    return this.productCard()
      .contains(productName)
      .closest("button")
      .find('[data-testid="product-name"]');
  }

  productDescription(productName) {
    return this.productCard()
      .contains(productName)
      .closest("button")
      .find('[data-testid="product-description"]');
  }

  productCost(productName) {
    return this.productCard()
      .contains(productName)
      .closest("button")
      .find('[data-testid="product-cost"]');
  }

  productCalories(productName) {
    return this.productCard()
      .contains(productName)
      .closest("button")
      .find('[data-testid="product-calories"]');
  }

  productAvailability(productName) {
    return this.productCard()
      .contains(productName)
      .closest("button")
      .find('[data-testid="chip-text"]'); 
  }

  productDescriptionSize(sizeName) {
    return cy.get('[data-testid="size"]').contains(sizeName);
  }

  productDescriptionTotalCost() {
    return cy.get("#product-cost");
  }

  productDescriptionAddToCartCtaButton() {
    return cy.get("#add-to-cart");
  }

  featuredIcon(productName) {
    return cy
      .get('[data-testid="product-button"]')
      .contains(productName)
      .closest("button")
      .siblings('[data-testid="featured-icon"]');
  }

  addressDesktop() { 
    return cy.get('#addressHandoffChange')
  }

  //Methods

  selectNextRestaurantCard() {
    cy.focused().tab().tab().click().click();
  }

  selectCategory(categoryName) {
    this.categoriesList().contains(categoryName).click();
  }

  addProductToBasket(productName) {
    this.productCard().contains(productName).click();
    this.productDescriptionAddToCartCtaButton().click();
    cy.wait(5000);
  }

  selectProduct(productName) {
    this.productCard().contains(productName).click();
  }

  validateDeliveryHandoffSection() {
    this.locationBoxDeliverTo().should("be.visible");
    this.locationBoxDeliveryTime().should("be.visible");
    this.locationBoxOrderingFrom().should("be.visible");
  }

  validatePickupHandoffSection() {
    this.locationBoxPickupFrom().should("be.visible");
    this.locationBoxPickupTimeLabel().should("be.visible");
    this.locationBoxPickupDateTime().should("be.visible");
  }

  validateDifferentRestaurantsAfterLocationChange() {
    cy.wait(1000).then(() => {
      // Retrieve the environment variables
      const newDateTrimmed = Cypress.env("newDateTrimmed");
      const firstTimeTrimmed = Cypress.env("firstTimeTrimmed");

      // Log the original date and time for debugging
      cy.log(`Original Date: ${newDateTrimmed}`);
      cy.log(`Expected Time: ${firstTimeTrimmed}`);

      // Check if the newDateTrimmed variable is defined and not null
      if (!newDateTrimmed) {
        throw new Error("newDateTrimmed is undefined or null");
      }

      // Check if the firstTimeTrimmed variable is defined and not null
      if (!firstTimeTrimmed) {
        throw new Error("firstTimeTrimmed is undefined or null");
      }

      // Split the original date string into parts
      const parts = newDateTrimmed.split(" ");

      // Log the parts for debugging
      cy.log(`Date Parts: ${JSON.stringify(parts)}`);

      // Check if the parts array has the expected length
      if (parts.length < 3) {
        throw new Error(`Unexpected date format: ${newDateTrimmed}`);
      }

      // Extract relevant parts (handling the optional dayOfWeek)
      const [dayOfWeek, month, day] = parts;

      // Create a map to convert month abbreviation to month number
      const monthMap = {
        Jan: "1",
        Feb: "2",
        Mar: "3",
        Apr: "4",
        May: "5",
        Jun: "6",
        Jul: "7",
        Aug: "8",
        Sep: "9",
        Oct: "10",
        Nov: "11",
        Dec: "12",
      };

      // Check if the month abbreviation is valid
      const monthNumber = monthMap[month];
      if (!monthNumber) {
        throw new Error(`Invalid month abbreviation: ${month}`);
      }

      // Remove leading zero from the day if present
      const formattedDay = day.replace(/^0/, "");

      // Format the time from the environment variable correctly
      const formattedTime = firstTimeTrimmed
        .toLowerCase()
        .replace(/\s/g, "")
        .replace(/^0/, "");

      // Combine the transformed date and time into the desired format
      const transformedDate = `${monthNumber}/${formattedDay} ${formattedTime}`;
      cy.log(`Transformed Date: ${transformedDate}`);

      cy.contains(transformedDate).should("exist");

      // cy.get(':nth-child(1) > #buttonHandoffTime > .desktop\\:pl-1 > #handoffTimeDesktop')
      //   .invoke('text')
      //   .then((text) => {
      //     cy.log(`Actual Text: ${text}`);
      //     // Assertion to compare the expected and actual text
      //     expect(text.trim()).to.equal(transformedDate);
      //     Cypress.env('transformedDate', transformedDate);
      //   });
    });
  }

  mockFeaturedProducts() {
    cy.intercept(
      "GET",
      "https://dev-zippys-ignite.westus2.azurecontainer.io/locations/133094/menu?includedisabled=true",
      (req) => {
        req.reply((res) => {
          // Modify the response by adding the metadata to all products
          res.body.categories.forEach((category) => {
            category.products.forEach((product) => {
              product.metadata = [
                { key: "product-size", value: "2" },
                { key: "product-tag", value: "featured" },
              ];
            });
          });

          // Send the modified response
          res.send();
        });
      }
    ).as("getMenu");
  }

  mockUnavailableProducts() {
    cy.intercept(
      "GET",
      "https://dev-zippys-ignite.westus2.azurecontainer.io/locations/133094/menu?includedisabled=true",
      (req) => {
        req.reply((res) => {
          // Modify the response by adding the metadata to all products
          res.body.categories.forEach((category) => {
            category.products.forEach((product) => {
              product.availability = [
                {
                  always: false,
                  now: false,
                  startDate: "20240823",
                  endDate: "20240830",
                  isDisabled: false,
                },
              ];
            });
          });

          // Send the modified response
          res.send();
        });
      }
    ).as("getMenu");
  }

  mockSoldOutProducts() {
    cy.intercept(
      "GET",
      "**/locations/*/menu*",
      (req) => {
        req.reply((res) => {
          // Modify the response by adding the metadata to all products
          res.body.categories.forEach((category) => {
            category.products.forEach((product) => {
              product.availability = [
                {
                  isDisabled: true,
                },
              ];
            });
          });

          // Send the modified response
          res.send();
        });
      }
    ).as("getMenu");
  }
}

export default MenuPage;
