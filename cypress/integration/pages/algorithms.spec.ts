import { clickEachNoteLink, clickEachTagLink } from '../utils.spec';

beforeEach(() => {
  cy.visit('/algorithms')
})

describe('TaggedNoteTableView', () => {
  it('has valid algorithms links', () => {
    clickEachNoteLink()
  })

  it('has valid tag links', () => {
    clickEachTagLink()
  })
})
