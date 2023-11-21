import _Cypress from 'cypress'

describe('Form spec', () => {
  const app = '.app .app__container'

  beforeEach(() => {
    cy.visit('https://github-application-chi.vercel.app/')
  })
  it('Ensures the existance of element in the form', () => {
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

  it('Ensure that result component exist', () => {
    // is not rendered before search button is clicked
    cy.get(app)
    cy.get('#outlined-error')
      .should('exist')
      .should('have.length', '1')
    cy.get('.container__result').should('not.be.visible')

    // is rendered after search button is clicked
    cy.get(app)
    cy.get('#outlined-error').type('Begli0102')
    cy.get('.MuiButton-root').click()
    cy.get('.container__result').should('be.visible')
  })
})
