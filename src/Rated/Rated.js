import React, { Component } from "react";
import { Alert, Space, Spin } from "antd";
import PaginationComp from "../PaginationComp";
import GetMovies from "../service/getMovies";
import Movies from "../Movies";

class Rated extends Component {
  state = {
    movies: null,
    hasError: false,
    intError: false,
    loading: true,
    total_results: 1,
  };

  componentDidMount() {
    this.getMovies();
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  getMovies = (page = 1) => {
    const mov = new GetMovies();
    mov
      .getRatedMovies(page)
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

  render() {
    const { movies, hasError, loading, intError, total_results } = this.state;
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
        <h1>Rated</h1>
        <Movies movies={movies} loading={loading} />
        <PaginationComp
          total_results={total_results}
          getMovies={this.getMovies}
        />
      </div>
    );
  }
}

export default Rated;
