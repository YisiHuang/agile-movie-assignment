let movies;
let movie;
let cast; 
let castMember; 

describe("People Details testing", () => {

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
    });

    describe("The Person Details page", () => {

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

        before(() => {
            cy.request(
            `https://api.themoviedb.org/3/person/${
                cast[0].id
            }?api_key=${Cypress.env("TMDB_KEY")}`
            )
            .its("body")
            .then((castDetails) => {
                castMember = castDetails;
            });
        });

        describe("Cast Version", () => {

            beforeEach(() => {
                cy.visit(`/person/${cast[0].id}`);
            });

            it("displays the header", () => {
                cy.get("h3").contains("People Details");
            });

            it("displays the cast member's biography", () => {
                if (castMember.biography) {
                    var name = castMember.name.replace( /\s\s+/g, ' ' );
                    cy.get(".MuiTypography-root").contains(name);
                }
                else {
                    var name = castMember.name.replace( /\s\s+/g, ' ' );
                    cy.get(".MuiTypography-root").eq(1).contains("Biography for " + name + " unavailable");
                }
            });

            

            it("displays the correct gender, place of birth, and area known for", () => {
                cy.get("ul").eq(0).within(() => {
                    if (castMember.gender === 1) {
                        cy.get("span").contains("Female");
                        cy.get("svg").should('have.attr', 'data-testid', 'WomanIcon')
                            .parent().should('have.attr', 'style');
                    }
                    else if (castMember.gender === 2) {
                        cy.get("span").contains("Male");
                        cy.get("svg").should('have.attr', 'data-testid', 'ManIcon')
                        .parent().should('have.attr', 'style');
                    }
                    else cy.get("span").contains("Gender: N/B or Unknown");

                    if (castMember.place_of_birth) cy.get("span").contains(castMember.place_of_birth);
                    else cy.get("span").contains("From: N/A");
                    cy.get("svg").eq(1).should('have.attr', 'data-testid', 'LocationOnIcon');
                });
            });
        });
    })
})