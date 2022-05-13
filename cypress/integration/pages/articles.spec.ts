import { clickEachNoteLink, clickEachTagLink } from '../utils.spec';

beforeEach(() => {
  cy.visit('/articles')
})

describe('TaggedNoteListView', () => {
  it('has valid article links', () => {
    clickEachNoteLink()
  })

  it('has valid tag links', () => {
    clickEachTagLink()
  })
})
