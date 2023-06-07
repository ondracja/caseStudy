/// <reference types="cypress" />

export class FormPage {
  verifyAnInput (inputSelector) {
    cy.get(inputSelector)
      .should('be.visible')
      .should('be.enabled')
  }

  verifyADropdownItems (dropdownSelector) {
    cy.get(dropdownSelector)
      .children()
      .should('have.length.greaterThan', 0)
  }

  verifyConsentCheckbox (consentCheckboxSelector) {
    cy.get(consentCheckboxSelector)
      .should('not.be.checked')
  }

  verifyOpenDemoAccountButton (openDemoAccountButtonSelector) {
    cy.get(openDemoAccountButtonSelector)
      .should('be.enabled')
  }

  fillInInput (inputSelector, value) {
    cy.get(inputSelector)
      .clear()
    cy.get(inputSelector)
      .type(value)
  }

  checkConsentCheckbox () {
    const consentCheckboxSelector = 'input#iAgreeDemo'
    cy.get(consentCheckboxSelector)
      .check()
    cy.get(consentCheckboxSelector)
      .should('be.checked')
  }

  fillDropdown (dropdownSelector, value) {
    cy.get(dropdownSelector)
      .select(value)
  }

  submitForm () {
    cy.get('input[type="submit"]')
      .click()
  }

  //
  // Shortcuts
  //

  fillInMinimalForm () {
    const necessaryInputsIds = ['lastname', 'phone', 'email', 'deposit']
    cy.fixture('testUser').then((user) => {
      necessaryInputsIds.forEach((input) => {
        this.fillInInput(`input#${input}`, user[input])
      })
      this.checkConsentCheckbox()
    })
  }

  fillInFullForm () {
    const inputsIds = ['firstname', 'lastname', 'phone', 'countryLabel', 'email', 'deposit']
    const dropdownsIds = ['platform', 'accountType', 'leverage', 'currency']
    cy.fixture('testUser').then((user) => {
      inputsIds.forEach((input) => {
        this.fillInInput(`input#${input}`, user[input])
      })
      dropdownsIds.forEach((dropdown) => {
        this.fillDropdown(`select#${dropdown}`, user[dropdown])
      })
      this.checkConsentCheckbox()
    })
  }
}

export const onFormPage = new FormPage()
