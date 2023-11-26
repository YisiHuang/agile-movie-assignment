let movies;
let crew;
let movie;
var seen = {};


describe("Base tests for pages concerned with a single movie", () => {

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
        cy.request(
            `https://api.themoviedb.org/3/movie/${
                movies[0].id
            }?api_key=${Cypress.env("TMDB_KEY")}`
            )
            .its("body")
            .then((movieDetails) => {
                movie = movieDetails;
            });
        })

    describe("The Crew List page", () => {

            before(() => {
                cy.request(
                    `https://api.themoviedb.org/3/movie/${
                        movies[0].id
                    }/credits?api_key=${Cypress.env("TMDB_KEY")}`
                    )
                    .its("body")
                    .then((crewList) => {
                        crew = crewList.crew.filter(function(entry) {
                            var previous;
            
                            if (seen.hasOwnProperty(entry.id)) {
                                previous = seen[entry.id];
                                previous.job = previous.job + ', ' + entry.job;
                                return false;
                            }
            
                            seen[entry.id] = entry;
                            return true;
                        });;
                    });
            });
    
            beforeEach(() => {
                cy.visit(`/movies/${movies[0].id}/crew`);
            });
    
            it("displays the page header and 11 crew members on first load", () => {
                cy.get("h3").contains("Crew");
                cy.get(".MuiCardHeader-root").should("have.length", 11);
            });
    
            it("displays the 'Search Crew' card and all relevant filter/sort fields", () => {
                cy.get(".MuiGrid-root.MuiGrid-container")
                .eq(1)
                .find(".MuiGrid-root.MuiGrid-item")
                .eq(0)
                .within(() => {
                    cy.get("h1").contains("Search In Crew");
                    cy.get("[id='filled-search']").eq(0).should('have.class',
                        "MuiInputBase-input MuiFilledInput-input MuiInputBase-inputTypeSearch");
                    cy.get(".MuiFormControl-root").eq(0).find('label').contains('Input Crew Name');
                });
            });
    
            describe("Crew Information", () => {
                it("displays the correct crew names and links to their details page", () => {
                    cy.get(".MuiCardHeader-content").each(($card, index) => {
                        var name = crew[index].name.replace( /\s\s+/g, ' ' );
                        cy.wrap($card).find("p").find("a").should('contain', name)
                            .and('have.attr', 'href', '/person/' + crew[index].id);
                    });
                });
    
                it("displays the correct job(s) for each crew member", () => {
                    cy.get(".MuiCardContent-root > p").each(($card, index) => {
                        var job = crew[index].job;
                        cy.wrap($card).should('contain', job);
                    });
                });
            });
    });
})