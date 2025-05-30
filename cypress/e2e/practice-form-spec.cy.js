describe('Demo Practice Form - Automated Tests', () => {
  beforeEach(() => {
    cy.visit('https://automationbookstore.dev/')
  })

  it('should display the search bar (positive case)', () => {
    cy.get('input#searchBar').should('be.visible')
  })

  it('should filter books when a valid search term is entered (positive case)', () => {
    cy.get('input#searchBar').type('Selenium')
    cy.get('.book').should('have.length.greaterThan', 0)
    cy.get('.book:visible').each(($el) => {
      cy.wrap($el).should('contain.text', 'Selenium')
    })
  })

  it('should show no books when an invalid search term is entered (negative case)', () => {
    cy.get('input#searchBar').type('nonexistentbook')
    cy.get('.book:visible').should('have.length', 0)
    cy.contains('No books found').should('not.exist') // The site may not show this, but ensures no error message
  })

  it('should clear the search bar and show all books again (positive case)', () => {
    cy.get('input#searchBar').type('Java')
    cy.get('.book:visible').should('have.length.greaterThan', 0)
    cy.get('input#searchBar').clear()
    cy.get('.book:visible').should('have.length', 8) // There are 8 books on the page
  })

  it('should not find the search bar with an incorrect selector (negative case)', () => {
    cy.get('input#nonExistentSearchBar').should('not.exist')
  })
})