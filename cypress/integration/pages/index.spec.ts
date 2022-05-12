beforeEach(() => {
  cy.visit('/')
})

describe('ProfileView', () => {
  it('has github profile', () => {
    cy.get('[data-cy=profile-image]').should('be.visible')

    cy.get('[data-cy=profile-name]').should('not.be.empty')

    cy.get('[data-cy=profile-bio]').should('not.be.empty')
  })
})

describe('NoteListView', () => {
  it('has valid article links', () => {
    cy.get('[data-cy=note-link]').each((element) => {
      cy.wrap(element).invoke('attr', 'href')
        .then((href) => {
          if (!href) { throw new Error('No href found') }
          cy.request(href).its('status').should('eq', 200)
        })
    })
  })
})

export {}
