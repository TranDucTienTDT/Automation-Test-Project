describe('Demo Practice Form', () => {
  it('Verify practice form function', () => {
    cy.visit('https://automationbookstore.dev/')
    cy.get('input#searchBar').should('be.visible')
  })
})