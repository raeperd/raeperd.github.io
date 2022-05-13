import { clickEachNoteLink } from '../utils.spec';

beforeEach(() => {
  cy.visit('/tags')
})

describe('TaggedNoteListView', () => {
  it('has valid note links', () => {
    clickEachNoteLink()
  })
})
