export function clickEachNoteLink() {
  return cy.get('[data-cy=note-link]').each(validateHref)
}

export function clickEachTagLink() {
  return cy.get('[data-cy=tag-link]').each(validateHref)
}

function validateHref(element: JQuery<HTMLElement>) {
  cy.wrap(element).invoke('attr', 'href')
    .then((href) => {
      if (!href) {
        throw new Error('No href found')
      }
      cy.request(href).its('status').should('eq', 200)
    })
}
