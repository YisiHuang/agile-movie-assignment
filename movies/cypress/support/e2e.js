export const filterByTitle = (movieList, string) =>
  movieList.filter((m) => m.title.toLowerCase().search(string) !== -1);

export const filterByGenre = (movieList, genreId) =>
  movieList.filter((m) => m.genre_ids.includes(genreId));

export const sortItemsLargeFirst = (list, sortType) =>
  list.sort((i1, i2) => (
    (i1[sortType] < i2[sortType]) ? 1 : (i1[sortType] > i2[sortType]) ? -1 : 0
));