import React, { Component } from "react";
import { Rate } from "antd";
import { format } from "date-fns";
import GetMovies from "../service/getMovies";
import { Consumer } from "../movieContext";
import img from "./bkimg.jpg";
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

class Movie extends Component {
  render() {
    // const rated = JSON.parse(localStorage.getItem("rated"));
    const rate = new GetMovies();
    const { movie, ratedToStorage, rating: rated } = this.props;
    const {
      id,
      original_title,
      vote_average,
      release_date,
      overview,
      genre_ids,
      poster_path,
    } = movie;
    let cl;
    const average = Number(vote_average);
    if (average <= 3) {
      cl = "very-low";
    } else if (average <= 5) {
      cl = "low";
    } else if (average <= 7) {
      cl = "medium";
    } else {
      cl = "high";
    }
    const img_path = poster_path
      ? `https://image.tmdb.org/t/p/w500/${poster_path}`
      : img;
    return (
      <div className="movie">
        <div className="left-side">
          <img className="poster" src={img_path} alt="poster img" />
        </div>
        <div className="right-side">
          <div className="movie__header">
            <h1 className="movie__heading">{original_title}</h1>
            <div className={`movie__rating ${cl}`}>{average.toFixed(1)}</div>
          </div>
          <p className="movie__added">{FormatDate(release_date)}</p>
          <div className="movie__genres">
            <Consumer>
              {(genres) => {
                if (genres) {
                  return genre_ids.map((genre) => (
                    <div key={genre} className="movie__genre">
                      {genres[genre]}
                    </div>
                  ));
                }
                return <div>loading...</div>;
              }}
            </Consumer>
          </div>
          <p className="movie__text">{ShortText(overview)} ...</p>
          <Rate
            count="10"
            style={{ fontSize: "18px" }}
            onChange={(n) => {
              ratedToStorage(id, n);
              rate.sendRateRequest(id, n);
            }}
            value={rated ? rated[id] : 0}
          />
        </div>
      </div>
    );
  }
}

export default Movie;
