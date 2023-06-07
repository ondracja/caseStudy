/**
 * @description - This command will return a cat fact from the catfact.ninja API
 * @returns {Object}
 */
Cypress.Commands.add('getACatFact', () => {
  return cy.request({
    method: 'GET',
    url: 'https://catfact.ninja/fact'
  }).then((res) => {
    expect(res.status).to.eq(200)
    expect(res.body.length).to.be.greaterThan(0)
    expect(res.duration).to.be.lessThan(500)
    return res.body
  })
})
