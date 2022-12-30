import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
// import img from "./bkimg.png";
import "./Movie.css";

function ShortText(overview) {
  return overview.split(" ").slice(0, 19).join(" ");
}
function FormatDate(date) {
  let dt;
  try {
    dt = format(new Date(date), "MMMM d, yyyy");
  } catch {
    dt = date;
  }
  return dt;
}

const Movie = ({ movie }) => {
  const {
    original_title,
    vote_average,
    release_date,
    overview,
    genre_ids,
    poster_path,
  } = movie;
  return (
    <div className="movie">
      <div className="left-side">
        <img
          className="poster"
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt="poster img"
        />
      </div>
      <div className="right-side">
        <div className="movie__header">
          <h1 className="movie__heading">{original_title}</h1>
          <div className="movie__rating">{vote_average}</div>
        </div>
        <p className="movie__added">{FormatDate(release_date)}</p>
        <div className="movie__janres">
          <div className="movie__janre">{genre_ids.slice(0, 4)}</div>
        </div>
        <p className="movie__text">{ShortText(overview)} ...</p>
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
