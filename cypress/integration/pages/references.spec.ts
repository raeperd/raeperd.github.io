import { clickEachNoteLink } from '../../support/utils';

beforeEach(() => {
  cy.visit('/references')
})

describe('TaggedNoteListView', () => {
  it('has valid references links', () => {
    clickEachNoteLink()
  })
})
