/// <reference types="cypress" />

context('Test Movie Demo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('now playing', () => {
    cy.location().should((localtion) => {
      expect(localtion.pathname).to.eq('/')
    })

    cy.get('.dashboard').find('a').contains('Now Playing').click()

    cy.location().should((localtion) => {
      expect(localtion.pathname).to.eq('/nowplaying')
    })

    cy.scrollTo('bottom', { duration: 2000 })

    cy.get('h1.now-playing-title').contains('Movies In Theaters Now').should('be.visible')
      .get('h1.movie-title')
      .filter(':contains("Skylines")')
      .first()
      .click()
      .get('div .App>h1').contains('Movie Details').should('be.visible')
      .get('div .App>h3').contains('Loading').should('be.visible')

    cy.location().should((localtion) => {
      expect(localtion.pathname).to.contains('movie')
    })

    cy.wait(1000)
    
    cy.get('div .movie-details-title>h1').contains('Skylines').should('be.visible')
      .get('div .movie-details-info').contains('Movie Overview').should('be.visible')

    cy.scrollTo('bottom', { duration: 500 })
    cy.scrollTo('top', { duration: 500 })

    cy.get('div .movie-details-title>i.fa-chevron-left').should('be.visible').click()
      .location().should((localtion) => {
        expect(localtion.pathname).to.eq('/nowplaying')
      })
  })

  it('upcoming', () => {
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

    cy.get('nav.navbar-wrapper')
      .next()
      .contains('Upcoming Movies').should('be.visible')
      .next()
      .contains('Loading').should('be.visible')

    cy.scrollTo('bottom', { duration: 2000 })

    cy.get('h1.movie-title')
      .filter(':contains("Monster Hunter")')
      .first()
      .click()
      .get('div .App>h1').contains('Movie Details').should('be.visible')
      .get('div .App>h3').contains('Loading').should('be.visible')

    cy.location().should((localtion) => {
      expect(localtion.pathname).to.contains('movie')
    })

    cy.wait(1000)
    
    cy.get('div .movie-details-title>h1').contains('Monster Hunter').should('be.visible')
      .get('div .movie-details-info').contains('Movie Overview').should('be.visible')

    cy.scrollTo('bottom', { duration: 500 })
    cy.scrollTo('top', { duration: 500 })

    cy.get('div .movie-details-title>i.fa-chevron-left').should('be.visible').click()
      .location().should((localtion) => {
        expect(localtion.pathname).to.eq('/upcoming')
      })

  })

  it('genres', () => {
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

    cy.scrollTo('bottom', { duration: 2000 })

    cy.get('div .genre-component')
      .find('h3')
      .get('.genre-name')
      .contains('Music')
      .first()
      .click()
      .get('h1').first().contains('Music Movies').should('be.visible')
    
    cy.location().should((localtion) => {
      expect(localtion.pathname).to.contain('/genres/Music')
    })

    cy.get('div .movie-component')
      .first()
      .click()
      .get('div .App>h1').contains('Movie Details').should('be.visible')
      .get('div .App>h3').contains('Loading').should('be.visible')

    cy.location().should((localtion) => {
      expect(localtion.pathname).to.contains('movie')
    })

    cy.wait(1000)
    
    cy.get('div .movie-details-title>h1').contains('Soul').should('be.visible')
      .get('div .movie-details-info').contains('Movie Overview').should('be.visible')

    cy.scrollTo('bottom', { duration: 500 })
    cy.scrollTo('top', { duration: 500 })

    cy.get('div .movie-details-title>i.fa-chevron-left')
      .should('be.visible')
      .click()
      .location().should((localtion) => {
        expect(localtion.pathname).to.contain('/genres/Music')
      })
    
    cy.wait(1000)

    cy.get('div .genre-search-title')
      .find('div')
      .get('div .fa-chevron-left')
      .should('be.visible')
      .click()
      .location().should((localtion) => {
        expect(localtion.pathname).to.contain('/genres')
      })
  })

  it('movie search', () => {
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
      .should('be.visible')

    // waiting for response
    cy.wait(5000)

    cy.get('form').next()
      .contains('Movie Results for: ')
      .should('be.visible')
    
    cy.get('h1.movie-title')
      .filter(':contains("Soul")')
      .first()
      .click()
      .get('div .App>h1').contains('Movie Details').should('be.visible')
      .get('div .App>h3').contains('Loading').should('be.visible')

    cy.location().should((localtion) => {
      expect(localtion.pathname).to.contains('movie')
    })

    cy.wait(1000)
    
    cy.get('div .movie-details-title>h1').contains('Soul').should('be.visible')
      .get('div .movie-details-info').contains('Movie Overview').should('be.visible')

    cy.scrollTo('bottom', { duration: 500 })
    cy.scrollTo('top', { duration: 500 })

    cy.get('div .movie-details-title>i.fa-chevron-left').should('be.visible').click()
      .location().should((localtion) => {
        expect(localtion.pathname).to.eq('/search')
      })

    cy.wait(1000)
    
    cy.get('input[type=submit]')
      .should('be.visible')
      .click()

    cy.get('form').next()
      .contains('Searching ')
      .contains('Woops, ')
      .should('be.visible')
  })

})
