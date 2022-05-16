import { clickEachNoteLink, clickEachTagLink } from '../utils.spec';

describe('has valid tag and reference links in pagees', () => {
  ['/references', '/references/pages/2', '/references/tags/network', '/references/tags/network/pages/2']
    .forEach((url) => {
      it(`${url}`, () => {
        cy.visit(url)
        clickEachTagLink()
        clickEachNoteLink()
      })
    })
})

describe('valid pagination buttons', () => {
  beforeEach(() => {
    cy.visit('/references')
  })

  it('prev and next buttons are properly disabled', () => {
    getPrevButton().should('have.class', 'disabled')
    getNextButton().should('not.have.class', 'disabled')

    getPageNumberButton().last().click()
    getPrevButton().should('not.have.class', 'disabled')
    getNextButton().should('have.class', 'disabled')
  })

  it('active valid number', () => {
    getPageNumberButton().contains(1).should('have.class', 'active')
    getPageNumberButton().contains(2).should('not.have.class', 'active')

    getPageNumberButton().contains(2).click()
    getPageNumberButton().contains(1).should('not.have.class', 'active')
    getPageNumberButton().contains(2).should('have.class', 'active')
  })

  it('paginate properly', () => {
    getNextButton().click()
    getPageNumberButton().contains(2).should('have.class', 'active')

    getNextButton().click()
    getPageNumberButton().contains(3).should('have.class', 'active')

    getPrevButton().click()
    getPageNumberButton().contains(2).should('have.class', 'active')

    getPrevButton().click()
    getPageNumberButton().contains(1).should('have.class', 'active')
  })

  function getPrevButton() {
    return cy.get('[data-cy="page-prev-button"]')
  }

  function getNextButton() {
    return cy.get('[data-cy="page-next-button"]')
  }

  function getPageNumberButton() {
    return cy.get('[data-cy="page-number-button"]')
  }
})
