import { sortItemsLargeFirst } from "../support/e2e";
let movies;

describe("Sorting Movies", () => {
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

    describe("The Discover Movies page", () => {

        beforeEach(() => {
            cy.visit("/");
        });

        it("Sorts by latest", () => {
            cy.get("[id='sort-select']");
            cy.get("[id='sort-select']").click();
            cy.get("li").contains("Latest").click();
            movies = sortItemsLargeFirst(movies, "latest");

            cy.verifyMovieTitles(movies);
        });

        it("Sorts by rating", () => {
            cy.get("[id='sort-select']");
            cy.get("[id='sort-select']").click();
            cy.get("li").contains("Rating").click();
            movies = sortItemsLargeFirst(movies, "vote_average");

            cy.verifyMovieTitles(movies);
        });
    });
})