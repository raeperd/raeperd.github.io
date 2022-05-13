import { clickEachNoteLink, clickEachTagLink } from '../utils.spec';

beforeEach(() => {
  cy.visit('/tags')
})

describe('TaggedNoteListView', () => {
  it('has valid note links', () => {
    clickEachNoteLink()
  })

  it('has valid tag links', () => {
    clickEachTagLink()
  })
})
