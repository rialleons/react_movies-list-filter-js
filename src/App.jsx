import { useState } from 'react';

import './App.scss';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';

function getFilteredMovies(movies, query) {
  let filteredMovies = [...movies];

  const preparedQuery = query.trim().toLowerCase();

  if (query) {
    filteredMovies = filteredMovies.filter((movie) => {
      const preparedTitle = movie.title.toLowerCase();
      const preparedDescription = movie.description.toLowerCase();

      const titleIncludes = preparedTitle.includes(preparedQuery);
      const descriptionIncludes = preparedDescription.includes(preparedQuery);

      return titleIncludes || descriptionIncludes;
    });
  }

  return filteredMovies;
}

export const App = () => {
  const [query, setQuery] = useState('');

  const visibleMovies = getFilteredMovies(moviesFromServer, query);

  return (
    <div className="page">
      <div className="page-content">
        <div className="box">
          <div className="field">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="search-query" className="label">
              Search movie
            </label>

            <div className="control">
              <input
                type="text"
                id="search-query"
                className="input"
                placeholder="Type search word"
                onChange={(event) => {
                  setQuery(event.currentTarget.value);
                }}
              />
            </div>
          </div>
        </div>

        <MoviesList movies={visibleMovies} />
      </div>

      <div className="sidebar">
        Sidebar goes here
      </div>
    </div>
  );
};
