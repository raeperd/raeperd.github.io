import { clickEachNoteLink } from '../utils';

beforeEach(() => {
  cy.visit('/tags')
})

describe('TaggedNoteListView', () => {
  it('has valid note links', () => {
    clickEachNoteLink()
  })
})
