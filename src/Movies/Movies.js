import React, { Component } from "react";
import { Spin, Alert, Space } from "antd";
import GetMovies from "../service/getMovies";
import "./Movies.css";
import Movie from "../Movie";
import "antd/dist/reset.css";

class Movies extends Component {
  state = {
    movies: null,
    loading: true,
    hasError: false,
    intError: false,
  };

  componentDidMount() {
    const movies = new GetMovies();

    movies
      .serchMovies()
      .then((data) =>
        this.setState(
          {
            movies: data.results,
          },
          () => this.setState({ loading: false }),
        ),
      )
      .catch((er) => {
        if (er.message.split(" ")[0] === "NetworkError") {
          this.setState({
            intError: true,
          });
        } else {
          this.setState({
            hasError: true,
          });
        }
      });
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    const { movies, loading, hasError, intError } = this.state;
    if (hasError || intError) {
      return (
        <div className="error">
          <Space>
            <Alert
              message="Error"
              description={
                intError
                  ? "Failed to load resource( Check your Internet)"
                  : "Sorry!!! Something wen wrong."
              }
              type="error"
              showIcon
            />
          </Space>
        </div>
      );
    }
    let moviList = (
      <div className="spin">
        <Spin size="large" tip="Loading..." />
      </div>
    );

    if (!loading) {
      moviList = movies.map((movie) => {
        return (
          <Movie movie={movie} key={`${movie.original_title}-${movie.id}`} />
        );
      });
    }

    return <div className="movies">{moviList}</div>;
  }
}

export default Movies;
