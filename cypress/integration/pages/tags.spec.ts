import { clickEachNoteLink } from '../../support/utils';

beforeEach(() => {
  cy.visit('/tags')
})

describe('TaggedNoteListView', () => {
  it('has valid note links', () => {
    clickEachNoteLink()
  })
})
