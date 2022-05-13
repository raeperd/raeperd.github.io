import { clickEachNoteLink } from '../utils.spec';

beforeEach(() => {
  cy.visit('/articles')
})

describe('TaggedNoteListView', () => {
  it('has valid article links', () => {
    clickEachNoteLink()
  })
})
