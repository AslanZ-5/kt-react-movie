import React, { Component } from "react";
import GetMovies from "../service/getMovies";
import "./Movies.css";
import Movie from "../Movie";
import "antd/dist/reset.css";

class Movies extends Component {
  state = {
    movies: null,
    loading: true,
  };

  componentDidMount() {
    const movies = new GetMovies();

    movies.serchMovies().then((data) =>
      this.setState(
        {
          movies: data.results,
        },
        () => this.setState({ loading: false }),
      ),
    );
  }

  render() {
    const { movies, loading } = this.state;
    let moviList = <div>Loading......</div>;
    console.log(movies);
    if (!loading) {
      moviList = movies.map((movie) => {
        return <Movie movie={movie} key={movie.original_title} />;
      });
    }

    return <div className="movies">{moviList}</div>;
  }
}

export default Movies;
