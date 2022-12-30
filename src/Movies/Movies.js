import React, { Component } from "react";
import { Spin, Alert, Space, Input } from "antd";
import { debounce } from "lodash";
import GetMovies from "../service/getMovies";
import "./Movies.css";
import Movie from "../Movie";
import "antd/dist/reset.css";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.deblog = debounce((e) => this.getMovies(e.target.value), 1000);
  }

  state = {
    movies: null,
    loading: true,
    hasError: false,
    intError: false,
  };

  componentDidMount() {
    this.getMovies();
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  getMovies = (query = "return") => {
    const movies = new GetMovies();

    movies
      .serchMovies(query)
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
  };

  onInputChange = (e) => {
    // this.setState({
    //   query: e.target.value,
    // });
    this.deblog(e);
  };

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

    return (
      <div className="container">
        <Input
          // value={query}
          onChange={this.onInputChange}
          className="App__input"
        />
        <div className="movies">{moviList}</div>
      </div>
    );
  }
}

export default Movies;
