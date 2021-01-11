/// <reference types="cypress" />

context('Test Movie Demo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('click on now playing', () => {
    cy.location().should((localtion) => {
      expect(localtion.pathname).to.eq('/')
    })

    cy.get('.dashboard').find('a').contains('Now Playing').click()

    cy.location().should((localtion) => {
      expect(localtion.pathname).to.eq('/nowplaying')
    })
  })

  it('click on upcoming', () => {
    cy.location().should((localtion) => {
      expect(localtion.pathname).to.eq('/')
    })

    cy.get('.dashboard')
      .find('a')
      .contains('Upcoming Releases')
      .click()

    cy.location().should((localtion) => {
      expect(localtion.pathname).to.eq('/upcoming')
    })
  })

  it('click on genres', () => {
    cy.location().should((localtion) => {
      expect(localtion.pathname).to.eq('/')
    })

    cy.get('.dashboard')
      .find('a')
      .contains('Genres')
      .click()

    cy.location().should((localtion) => {
      expect(localtion.pathname).to.eq('/genres')
    })
  })

  it('click on movie search', () => {
    cy.location().should((localtion) => {
      expect(localtion.pathname).to.eq('/')
    })

    cy.get('.navbar-wrapper')
      .find('a')
      .contains('Movie Search')
      .click()

    cy.location().should((localtion) => {
      expect(localtion.pathname).to.eq('/search')
    })
      
    cy.get('form .search-input')
      .should('be.visible')
      .should('have.value', '')
      .type('Soul{enter}')
      .get('form').next()
      .contains('Searching ')

    cy.wait(2000)

    cy.get('form').next()
      .contains('Movie Results for: ')
      .should('be.visible')
    
    cy.get('input[type=submit]')
      .should('be.visible')
      .click()

    cy.get('form').next()
      .contains('Searching ')
      //.wait(500)
      .contains('Woops, ')
      .should('be.visible')
  })

})
