const { onFormPage } = require('../support/pageActions/formActions')

describe('Smoke test spec', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  /**
   * 1. Navigate to baseUrl
   * 2. Verify that all inputs are present and enabled
   * 3. Verify that all dropdowns have a >0 number of listed items
   * 4. Verify that the `I agree` checkbox is not checked by default
   * 5. Verify that the `Open a demo accoun` button is enabled
   */
  it('Basic form structure', () => {
    const inputsIds = ['firstname', 'lastname', 'phone', 'countryLabel', 'email', 'deposit']
    const dropdownsIds = ['platform', 'accountType', 'leverage', 'currency']

    inputsIds.forEach((input) => {
      onFormPage.verifyAnInput(`input#${input}`)
    })
    dropdownsIds.forEach((dropdown) => {
      onFormPage.verifyADropdownItems(`select#${dropdown}`)
    })
    onFormPage.verifyConsentCheckbox('input#iAgreeDemo')
    onFormPage.verifyOpenDemoAccountButton('input[type="submit"]')
  })

  /**
   * 1. Navigate to baseUrl
   * 2. Fill in required inputs only
   * 3. Check the `I agree` checkbox
   * 4. Submit the form
   * 5. Verify that the user is redirected to a different page
   */
  it('Form is completable', () => {
    const necessaryInputsIds = ['lastname', 'phone', 'email', 'deposit']
    cy.fixture('testUser').then((user) => {
      necessaryInputsIds.forEach((input) => {
        onFormPage.fillInInput(`input#${input}`, user[input])
      })
      onFormPage.checkConsentCheckbox()
      onFormPage.submitForm()
      cy.url().should('not.include', '/jp/registration/demo')
    })
  })
})
