let movies;
let cast;

describe("Pagination", () => {

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

    it("shows the second page of 11 cast members when '2' is pressed", () => {
        cy.get(".pagination").within(() => {
            cy.get("li").eq(2).click();
        });

        cy.get(".MuiCardActions-root").each(($card, index) => {
            var name = cast[index + 11].name.replace( /\s\s+/g, ' ' );
            cy.wrap($card).find("a").contains(name);
        });
    });

    it("shows the first page of 11 cast members when '1' is pressed", () => {
        cy.get(".pagination").within(() => {
            cy.get("li").eq(2).click();
        });

        cy.get(".pagination").within(() => {
            cy.get("li").eq(1).click();
        });

        cy.get(".MuiCardActions-root").each(($card, index) => {
            var name = cast[index].name.replace( /\s\s+/g, ' ' );
            cy.wrap($card).find("a").contains(name);
        });
    });

    it("shows no change when current page is pressed", () => {
        cy.get(".pagination").within(() => {
            cy.get("li").eq(2).click();
        });

        cy.get(".pagination").within(() => {
            cy.get("li").eq(2).click();
        });

        cy.get(".MuiCardActions-root").each(($card, index) => {
            var name = cast[index + 11].name.replace( /\s\s+/g, ' ' );
            cy.wrap($card).find("a").contains(name);
        });
    });
});
