// eslint-disable-next-line import/prefer-default-export
export function clickEachNoteLink() {
  return cy.get('[data-cy=note-link]').each((element) => {
    cy.wrap(element).invoke('attr', 'href')
      .then((href) => {
        if (!href) { throw new Error('No href found') }
        cy.request(href).its('status').should('eq', 200)
      })
  })
}
