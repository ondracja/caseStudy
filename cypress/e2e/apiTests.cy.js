describe('Api test spec', () => {
  /**
   * 1. call the cat fact api
   * 2. if the fact is short, log it
   */
  it('Look for a cat fact with short length in a silly way', () => {
    cy.getACatFact().then(({ fact, length }) => {
      if (length < 100) {
        cy.log(`This is a short cat fact: ${fact}`)
      } else {
        cy.log('This fact is too long!')
      }
    })
  })
})
