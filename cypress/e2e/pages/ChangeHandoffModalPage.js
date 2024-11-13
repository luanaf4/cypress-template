import HandoffPage from "../pages/HandoffPage";
import MenuPage from "../pages/MenuPage";
import CommonPage from "../pages/CommonPage";

const dataPage = require("../pages/DataPage");
const handoffPage = new HandoffPage();
const commonPage = new CommonPage();
const menuPage = new MenuPage();

class ChangeHandoffModalPage {
  // Elements

  modalTitle() {
    return cy.get("#changeRestaurantLocationModal-headerTitle");
  }

  pickupTimeTitle() {
    return cy.get("#handoffTimeModal-headerTitle");
  }

  deliveryTimeTitle() {
    return cy.get("#handoffTimeModal-headerTitle");
  }

  alertMessage() {
    return cy.get("#handoffTimeModalAlertMessage");
  }

  datePicker() {
    return cy.get("#selectDate");
  }

  dateList() {
    return cy.get(".styled-scrollbar > li");
  }

  dateOption1() {
    return cy.get("#date-option-1");
  }

  dateOption2() {
    return cy.get("#date-option-2");
  }

  dateOption(numberOption) {
    return cy.get(`#date-option-${numberOption}`);
  }

  cardRestaurant(restaurantName) {
    return cy.get("#locationCard").contains(restaurantName);
  }

  timePicker() {
    return cy.get("#selectTime");
  }

  datePicker() {
    return cy.get('#selectDate');
  }

  timeOption(numberOption) {
    return cy.get(`#time-option-${numberOption}`);
  }

  timeList() {
    return cy.get(".styled-scrollbar > li");
  }

  saveChangesButton() {
    return cy.contains("SAVE CHANGES");
  }

  closeButton() {
    return cy.get("#closeButton");
  }

  searchBar() {
    return cy.get("#orderLocationSearchBox");
  }

  honoluluAddress() {
    return cy.contains("450 Kamehameha HWY, Pearl City, HI 96782 US");
  }

  pickupOption() {
    return cy.get("#pickupTabButton");
  }

  deliveryOption() {
    return cy.get("#deliveryTabButton");
  }

  noKeepPickupButton() {
    return cy.contains("NO, KEEP PICKUP");
  }

  noKeepDeliveryButton() {
    return cy.contains("NO, KEEP DELIVERY");
  }

  yesChangeToDeliveryButton() {
    return cy.contains("YES, CHANGE TO DELIVERY");
  }

  yesChangeToPickupButton() {
    return cy.contains("YES, CHANGE TO PICKUP");
  }

  dropdownLocationAddressAccepted() {
    return cy.contains(dataPage.delivery.validDeliveryAddress);
  }

  dropdownLocationAddressAccepted2() {
    return cy.contains(dataPage.delivery.validDeliveryAddress2);
  }

  dropdownLocationAddressNotAccepted() {
    return cy.contains(dataPage.delivery.invalidDeliveryAddress);
  }

  deliveryAvailabilityMessage() {
    return cy.get("#deliveryAvailabilityText");
  }

  deliveryUnavailableSubMessage() {
    return cy.get("#deliveryAvailabilitySubText");
  }

  locationSearchBox() {
    return cy.get("#orderLocationSearchBox");
  }

  dropdownLocationAddress() {
    return cy.get("#addressOption");
  }

  searchText() {
    return cy.get("#searchText");
  }

  pickupTimeHeader() {
    return cy.get('#handoffTimeModal-headerTitle')
  }

  // Methods

  typeValidDeliveryAddress() {
    this.locationSearchBox()
      .type(dataPage.delivery.validDeliveryAddress)
      .type(" ")
      .type("{backspace}")
      .wait(500);
  }

  typeAddress(address) {
    cy.wait(2000);
    this.searchBar().click();
    this.searchBar().clear();
    this.locationSearchBox().type(address).wait(3000).type("{backspace}");
    this.dropdownLocationAddress().contains(address).click();
    cy.wait(1500);
    this.searchText().click().click();
  }

  validateDifferentDateSlots() {
    this.datePicker()
      .invoke("text")
      .then((initialDate) => {
        const initialDateTrimmed = initialDate.trim();
        this.dateList().eq(1).click();

        this.datePicker()
          .invoke("text")
          .then((newDate) => {
            const newDateTrimmed = newDate.trim();
            expect(initialDateTrimmed).not.to.equal(newDateTrimmed);
            Cypress.env("newDateTrimmed", newDateTrimmed);
          });
      });
  }

  validateDifferentTimeSlots() {
    this.timeOption(1)
      .invoke("text")
      .then((firstTime) => {
        const firstTimeTrimmed = firstTime.trim();
        const expectedSecondTime = this.addMinutesToTime(firstTimeTrimmed, 15);

        this.timeOption(2)
          .invoke("text")
          .then((secondTime) => {
            const secondTimeTrimmed = secondTime.trim();

            cy.log(`First time: ${firstTimeTrimmed}`);
            cy.log(`Second time: ${secondTimeTrimmed}`);
            cy.log(`Expected second time: ${expectedSecondTime}`);

            expect(this.formatTime(secondTimeTrimmed)).to.equal(
              this.formatTime(expectedSecondTime),
              `Expected ${secondTimeTrimmed} to be 15 minutes after ${firstTimeTrimmed}`
            );
            Cypress.env("firstTimeTrimmed", firstTimeTrimmed);
          });
      });
  }

  addMinutesToTime(timeString, minutesToAdd) {
    const [time, period] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period === "PM" && hours !== 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    const totalMinutes = hours * 60 + minutes + minutesToAdd;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;

    const newPeriod = newHours >= 12 ? "PM" : "AM";
    const adjustedHours = newHours % 12 === 0 ? 12 : newHours % 12;
    const adjustedMinutes = newMinutes.toString().padStart(2, "0");

    return `${adjustedHours}:${adjustedMinutes} ${newPeriod}`;
  }

  formatTime(timeString) {
    const [time, period] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    const formattedHours = hours.toString().padStart(1, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes} ${period}`;
  }

  timeStringToMinutes(timeString) {
    const [time, period] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period === "PM" && hours !== 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    return hours * 60 + minutes;
  }
}

export default ChangeHandoffModalPage;
