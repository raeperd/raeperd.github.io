import { clickEachNoteLink } from '../utils.spec';

beforeEach(() => {
  cy.visit('/references')
})

describe('TaggedNoteListView', () => {
  it('has valid references links', () => {
    clickEachNoteLink()
  })
})
