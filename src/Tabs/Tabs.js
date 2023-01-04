import React, { Component } from "react";
import GetMovies from "../service/getMovies";
import Rated from "../Rated";
import Search from "../Search";

class Tabs extends Component {
  state = {
    rated: null,
    movies: null,
    hasError: false,
    intError: false,
    loading: true,
    total_results: 1,
  };

  componentDidMount() {
    this.setState({
      rated: JSON.parse(localStorage.getItem("rated")),
    });
    window.addEventListener("beforeunload", () => {
      const { rated } = this.state;
      localStorage.setItem("rated", JSON.stringify(rated));
    });

    this.getMovies();
  }

  componentDidUpdate() {
    this.getMovies();
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  ratedToStorage = (id, n) => {
    this.setState(() => {
      const { rated } = this.state;
      const newRated = { ...{ [id]: n }, ...rated };
      return {
        rated: newRated,
      };
    });
  };

  getMovies = (page) => {
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
    const {
      movies,
      hasError,
      loading,
      intError,
      total_results,
      rated: rating,
    } = this.state;
    const { rated } = this.props;

    return (
      <div>
        {" "}
        {!rated ? (
          <Search rating={rating} ratedToStorage={this.ratedToStorage} />
        ) : (
          <Rated
            rating={rating}
            ratedToStorage={this.ratedToStorage}
            movies={movies}
            hasError={hasError}
            loading={loading}
            intError={intError}
            total_results={total_results}
            getMovies={this.getMovies}
          />
        )}
      </div>
    );
  }
}

export default Tabs;
