import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GetMovies from "../service/getMovies";
import Rated from "../Rated";
import Search from "../Search";

class Tabs extends Component {
  state = {
    rated: {},
    movies: null,
    hasError: false,
    intError: false,
    loading: true,
    total_results: 1,
  };

  componentDidMount() {
    const st = localStorage.getItem("rated");
    this.setState({
      rated: JSON.parse(st),
    });
    window.addEventListener("beforeunload", () => {
      const { rated } = this.state;
      if (st) {
        localStorage.setItem("rated", JSON.stringify(rated));
      }
    });

    this.getMovies();
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  clearRated = (clear) => {
    if (clear) {
      this.setState({ rated: null });
    }
  };

  ratedToStorage = (id, n) => {
    this.setState(() => {
      const { rated } = this.state;
      if (rated) {
        let newRated;
        // console.log(rated[id], id);
        if (rated[id]) {
          const rt = Object.assign(rated);
          rt[id] = n;
          newRated = rt;
        } else {
          newRated = { ...{ [id]: n }, ...rated };
        }
        return {
          rated: newRated,
        };
      }
      return {
        rated: {},
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
    const { rateActive } = this.props;
    return (
      <Router>
        <div>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Search
                  clearRated={this.clearRated}
                  rating={rating}
                  ratedToStorage={this.ratedToStorage}
                />
              }
            />

            <Route
              path="/rated"
              element={
                <Rated
                  rateActive={rateActive}
                  rating={rating}
                  ratedToStorage={this.ratedToStorage}
                  movies={movies}
                  hasError={hasError}
                  loading={loading}
                  intError={intError}
                  total_results={total_results}
                  getMovies={this.getMovies}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default Tabs;
