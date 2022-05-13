import { clickEachNoteLink } from '../utils';

beforeEach(() => {
  cy.visit('/references')
})

describe('TaggedNoteListView', () => {
  it('has valid references links', () => {
    clickEachNoteLink()
  })
})
