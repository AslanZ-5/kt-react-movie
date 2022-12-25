import React from "react";
import PropTypes from "prop-types";
import img from "./bkimg.png";

import "./Movie.css";

const Movie = ({ movie }) => {
  const { original_title, vote_average, release_date, overview, genre_ids } =
    movie;
  return (
    <div className="movie">
      <div className="right-side">
        <img src={img} alt="movie img" />
      </div>
      <div className="left-side">
        <div className="movie__header">
          <h1 className="movie__heading">{original_title}</h1>
          <div className="movie__rating">{vote_average}</div>
        </div>
        <p className="movie__added">{release_date}</p>
        <div className="movie__janres">
          <div className="movie__janre">{genre_ids.slice(0, 4)}</div>
        </div>
        <p className="movie__text">{overview.slice(0, 150)}...</p>
        <div className="movie__stars" />
      </div>
    </div>
  );
};
Movie.defaultProps = {
  movie: {},
};
Movie.propTypes = {
  movie: PropTypes.object,
};
export default Movie;
