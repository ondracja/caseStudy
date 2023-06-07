const { onFormPage } = require('../support/pageActions/formActions')

describe('Regression test spec', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  /**
   * 1. Navigate to baseUrl
   * 2. Fill in required inputs only
   * 3. Specify a platform
   * 4. Check the `I agree` checkbox
   * 5. Submit the form
   * 6. Verify that the user is redirected to a different page
   * and that the platform is included in the url
   */
  it('Platform prefil in the url', () => {
    const platformValue = 'mt4'
    onFormPage.fillInMinimalForm()
    onFormPage.fillDropdown('select#platform', platformValue)
    onFormPage.submitForm()
    cy.url().should('include', platformValue)
  })

  /**
   * 1. Navigate to baseUrl
   * 2. Fill in required inputs only
   * 3. Set the deposit value to underVal, OverVal and acceptableVal
   * 4. Verify the boundaries
   */
  it('Initial deposit - boundary values', () => {
    const testData = {
      underVal: 0,
      overVal: 99999999,
      acceptableVal: 1000
    }
    onFormPage.fillInMinimalForm()
    onFormPage.fillInInput('input#deposit', testData.underVal)
    // bottom  boundary
    onFormPage.submitForm()
    cy.url().should('include', '/jp/registration/demo')
    // top boundary
    onFormPage.fillInInput('input#deposit', testData.overVal)
    onFormPage.submitForm()
    cy.url().should('include', '/jp/registration/demo')
    // acceptable value
    onFormPage.fillInInput('input#deposit', testData.acceptableVal)
    onFormPage.submitForm()
    cy.url().should('not.include', '/jp/registration/demo')
  })

  /**
   * 1. Navigate to baseUrl
   * 2. Fill in the form completely
   * 3. Submit the form
   * 4. Intercept the POST request with the form data
   * 5. Verify that the payload and test data filled in match
   */
  // Note: This test is going to fail due to bug described in my Notion page
  it('payload values mapping', () => {
    onFormPage.fillInFullForm()
    cy.intercept('POST', '/jp/registration/submit-form').as('postRequest')
    onFormPage.submitForm()
    cy.wait('@postRequest').then((interception) => {
      // store the request body and parse it to an object
      const body = new URLSearchParams(interception.request.body)
      const verificationObject = Object.fromEntries(body.entries())
      // verify verificationObject against the test data
      cy.fixture('testUser').then((user) => {
        Object.keys(user).forEach((key) => {
          expect(verificationObject[key]).to.eq(user[key])
        })
      })
    })
  })
})
