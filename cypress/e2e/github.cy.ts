import _Cypress from 'cypress'

describe('Form spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('Ensures the existance of element in the form', () => {
    const app = '.app .app__container'

    // Title
    cy.get(app)
    cy.get('.MuiTypography-root')
      .should('exist')
      .should('have.length', '1')
      .should('contain', 'Github App')

    // Input field
    cy.get(app)
    cy.get('#outlined-error')
      .should('exist')
      .should('have.length', '1')

    // Disabled button
    cy.get(app)
    cy.get('.MuiButton-root')
      .should('exist')
      .should('have.length', '1')
      .should('be.disabled')

    //  Enabled button
    cy.get(app)
    cy.get('#outlined-error')
      .type('Begli0102')
      .should('exist')
      .should('have.length', '1')
    cy.get('.MuiButton-root').should('not.be.disabled')
  })
})
