import { clickEachNoteLink } from '../../support/utils';

beforeEach(() => {
  cy.visit('/articles')
})

describe('TaggedNoteListView', () => {
  it('has valid article links', () => {
    clickEachNoteLink()
  })
})
