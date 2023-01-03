import React, { Component } from "react";
import { Spin, Alert, Space, Input, Pagination } from "antd";
import { debounce } from "lodash";
import is_expired from "../helper/is_expired";
import GetMovies from "../service/getMovies";
import "./Movies.css";
import Movie from "../Movie";
import "antd/dist/reset.css";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.deblog = debounce((query) => this.getMovies(query), 1000);
  }

  state = {
    query: "return",
    movies: null,
    loading: true,
    hasError: false,
    intError: false,
    total_pages: 1,
  };

  componentDidMount() {
    const session = localStorage.getItem("guest_session");
    let expired;
    if (session) {
      const ex_dt = JSON.parse(session).expires_at;
      expired = is_expired(ex_dt);
    }

    if (!session || expired) {
      this.addGuestSession();
    }

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
            total_pages: data.total_pages,
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
    const { query } = this.state;
    this.setState(
      {
        query: e.target.value,
      },
      () => this.deblog(query),
    );
  };

  addGuestSession() {
    const movies = new GetMovies();
    movies.getGuestSes().then((data) => {
      if (data.guest_session_id) {
        localStorage.setItem("guest_session", JSON.stringify(data));
      }
    });
  }

  render() {
    const { movies, loading, hasError, intError, query, total_pages } =
      this.state;
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
      if (!movies.length) {
        return (
          <div>
            <h1>No results</h1>
          </div>
        );
      }
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
        <div className="antd-pag">
          <Pagination
            onChange={(page) => this.getMovies(query, page)}
            simple={false}
            defaultCurrent={1}
            total={total_pages}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
