import { clickEachNoteLink, clickEachTagLink } from '../utils.spec';

beforeEach(() => {
  cy.visit('/references')
})

describe('TaggedNoteListView', () => {
  it('has valid references links', () => {
    clickEachNoteLink()
  })

  it('has valid tag links', () => {
    clickEachTagLink()
  })
})
