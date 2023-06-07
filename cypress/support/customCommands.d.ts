declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * @description - This command will return a cat fact from the catfact.ninja API
     * @returns {Object}
     */
    getACatFact(): Chainable<any>;
  }
}