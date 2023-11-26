# Assignment 1 - Agile Software Practice.

__Name:__ Yisi Huang

This repository contains the implementation of a React App, its associated Cypress tests and the GitLab CI pipeline.

## React App Features.

 
+ Trending Movies Page
+ Now Playing Page
+ Top Rated TV Page
+ Add Cast List to movies and the page link to movie details page
+ Add sort and filtering: sort by Rating or Latest movies
+ Add Crew List to movies and the page link to movie details page
+ Add search filter to Cast List page: search cast name
+ Add search filter to Crew List page: search crew name
+ Add switch button (responsive UI): sort cast name alphabetically
+ Add People Details Page - link to cast and crew card
+ Add Login, Logout, Register, Reset Page
+ Add Google authentication with firebase
+ Add Pagination to all page
+ Add new MUI components: ManIcon, LocationOnIcon, FaceIcon, WomanIcon

## Automated Tests. 

### Unique functionality testing (if relevant).

Pagination - The user can click page number and then page jump to the cliked number page.

+ cypress/e2e/pagination.cy.js

Sort By Rating and Latest - The use can choose filter by rating or latest, the page can change to page that movies sorted by rating or latest.

+ cypress/e2e/sortMovies.cy.js

### Best test cases

+ cypress/e2e/peopleDetails.cy.js
+ cypress/e2e/sortMovies.cy.js

### Error/Exception testing (if relevant).

+ cypress/e2e/pagination.cy.js

1. If don't click, the page not changed
1. Click the number, the page changed
1. If click the present page, it don't changed

### Cypress Custom commands (if relevant).

+ cypress/e2e/sortMovies.cy.js

## Code Splitting.


+ src/pages/castListPage.js
+ src/pages/crewListPage.js
+ src/pages/favoriteMoviesPage.js
+ src/pages/homePage.js
+ src/pages/movieDetailsPage.js
+ src/pages/movieReviewPage.js
+ src/pages/mustWatchMoviesPage.js
+ src/pages/personDetailsPage.js
+ src/pages/trendingMoviesPage.js
+ src/pages/upcomingMoviesPage.js
+ src/pages/nowPlayingPage.js
+ src/pages/topRatedTVPage.js

## Pull Requests.

[ Specify the URL of the GitHub repository that contains a record of the Pull Requests made during this assignment's code (source code or test code). If you used GitLab Merge Requests instead, then simply state this.]

## Independent learning (If relevant).

