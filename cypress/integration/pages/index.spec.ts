import { clickEachNoteLink } from '../../support/utils';

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
    clickEachNoteLink()
  })
})

export {}
