import { clickEachNoteLink } from '../utils';

beforeEach(() => {
  cy.visit('/articles')
})

describe('TaggedNoteListView', () => {
  it('has valid article links', () => {
    clickEachNoteLink()
  })
})
