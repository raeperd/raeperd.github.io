beforeEach(() => {
  cy.visit('/')
})

describe('Header', () => {
  it('has valid links to root', () => {
    cy.get('[data-cy="header-root-link"]').click()
    cy.url().should('contain', '/')
  })

  describe('internal links', () => {
    ['/articles', '/references', '/tags'].forEach((url) => {
      it(`has valid links to ${url}`, () => {
        cy.get(`a[href="${url}"`).click()
        cy.url().should('contain', url)
      })
    })
  })

  describe('social links', () => {
    ['github', 'linkedin'].forEach((sns) => {
      it(`has valid link to ${sns}`, () => {
        cy.get(`a[href*="${sns}"]`)
      })
    })
  })
})

describe('Footer', () => {
  it('has valid link to root', () => {
    cy.get('[data-cy="footer-root-link"]').click()
    cy.url().should('contain', '/')
  })

  describe('reference links', () => {
    ['nextjs.org', 'raeperd/nextjs-paper'].forEach((ref) => {
      it(`has valid links to ${ref}`, () => {
        cy.get(`a[href*="${ref}"]`)
      })
    })
  })
})

export {}
