import React, { Component } from "react";
import { debounce } from "lodash";
import { Input, Alert, Space, Spin } from "antd";
import Movies from "../Movies";
import GetMovies from "../service/getMovies";
import "./Search.css";
import PaginationComp from "../PaginationComp";

class Search extends Component {
  constructor(props) {
    super(props);
    this.deblog = debounce((query) => {
      this.getMovies(query);
    }, 1000);
  }

  state = {
    query: "",
    movies: null,
    hasError: false,
    intError: false,
    total_results: 1,
    loading: true,
  };

  componentDidMount() {
    this.getMovies();
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  getMovies = (query = "return", page = 1) => {
    const movies = new GetMovies();
    movies
      .serchMovies(query, page)
      .then((data) => {
        this.setState(
          {
            movies: data.results,
            total_results: data.total_results,
          },
          () => this.setState({ loading: false }),
        );
      })
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
    this.setState(
      {
        query: e.target.value,
      },
      () => {
        const { query } = this.state;

        this.deblog(query);
      },
    );
  };

  render() {
    const { movies, loading, hasError, intError, query, total_results } =
      this.state;
    const { ratedToStorage, rating, clearRated } = this.props;

    if (hasError || intError) {
      return (
        <div className="error">
          <Space>
            <Alert
              message="Error"
              description={
                intError
                  ? "Failed to load resource( Check your Internet)"
                  : "Sorry!!! Something went wrong."
              }
              type="error"
              showIcon
            />
          </Space>
        </div>
      );
    }
    if (loading) {
      return (
        <div className="spin">
          <Spin size="large" tip="Loading..." />
        </div>
      );
    }
    return (
      <div>
        <Input
          value={query}
          onChange={this.onInputChange}
          className="App__input"
        />
        <Movies
          clearRated={clearRated}
          rating={rating}
          ratedToStorage={ratedToStorage}
          loading={loading}
          movies={movies}
        />
        <PaginationComp
          total_results={total_results}
          query={query}
          getMovies={this.getMovies}
        />
      </div>
    );
  }
}

export default Search;
