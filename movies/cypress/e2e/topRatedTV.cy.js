let movies;

describe('Top Rated TV Page', () => {
    before(() => {
        cy.request(
                `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
            )
            .its("body")
            .then((response) => {
                movies = response.results;
            });
    });
    beforeEach(() => {
        cy.visit(`/`);
    });
    describe("Navigate to top rated tv page", () => {
        it("Jump to top rated tv page from the button in header", () => {
            cy.get("button").contains("TV").click()
            cy.url().should("include", "/tv/top_rated")
        })
    })

    describe("display page", () => {
        it('should display top-rated TV shows', () => {
            cy.visit('/tv/top_rated'); 
            cy.get('.spinner').should('not.exist'); 
            cy.get('h1').should('not.contain', 'Error'); 
          });
    })
    
  });
  