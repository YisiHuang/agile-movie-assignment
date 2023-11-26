let movies; 
let cast;

describe("Cast List Testing", () => {

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

    describe("The Cast List display", () => {

        before(() => {
            cy.request(
                `https://api.themoviedb.org/3/movie/${
                    movies[0].id
                }/credits?api_key=${Cypress.env("TMDB_KEY")}`
                )
                .its("body")
                .then((castList) => {
                    cast = castList.cast;
                });
        });

        beforeEach(() => {
            cy.visit(`/movies/${movies[0].id}/cast`);
        });

        it("displays the page header and 11 cast members on first load", () => {
            cy.get("h3").contains("Cast");
            cy.get(".MuiCardHeader-root").should("have.length", 11);
        });

        it("displays the 'Search In Cast' card and all relevant filter/sort fields", () => {
            cy.get(".MuiGrid-root.MuiGrid-container")
            .eq(1)
            .find(".MuiGrid-root.MuiGrid-item")
            .eq(0)
            .within(() => {
                cy.get("h1").contains("Search In Cast");
                cy.get("[id='filled-search']").eq(0).should('have.class',
                    "MuiInputBase-input MuiFilledInput-input MuiInputBase-inputTypeSearch");
                cy.get(".MuiFormControl-root").eq(0).find('label').contains('Input Actor Name');
            });
        });
    });
})
