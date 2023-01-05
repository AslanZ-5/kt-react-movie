import React, { Component } from "react";
import { Alert, Space } from "antd";
import GetMovies from "../service/getMovies";
import is_expired from "../helper/is_expired";
import "./Movies.css";
import Movie from "../Movie";
import "antd/dist/reset.css";

class Movies extends Component {
  state = {
    hasError: false,
  };

  componentDidMount() {
    const { clearRated } = this.props;
    const session = localStorage.getItem("guest_session");
    let expired;
    if (session) {
      const ex_dt = JSON.parse(session).expires_at;
      expired = is_expired(ex_dt);
    }
    if (!session || expired) {
      if (clearRated) {
        clearRated(true);
      }

      localStorage.setItem("rated", JSON.stringify({}));
      this.addGuestSession();
    }
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  addGuestSession() {
    const session = new GetMovies();
    session.getGuestSes().then((data) => {
      if (data.guest_session_id) {
        localStorage.setItem("guest_session", JSON.stringify(data));
      }
    });
  }

  render() {
    const { movies, loading, ratedToStorage, rating } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return (
        <div className="error">
          <Space>
            <Alert
              message="Error"
              description="Sorry!!! Something went wrong."
              type="error"
              showIcon
            />
          </Space>
        </div>
      );
    }
    let moviList;
    if (!movies) {
      return <h1>No Rated Movies</h1>;
    }
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
          <Movie
            rating={rating}
            ratedToStorage={ratedToStorage}
            movie={movie}
            key={`${movie.original_title}-${movie.id}`}
          />
        );
      });
    }

    return (
      <div className="container">
        <div className="movies">{moviList}</div>
      </div>
    );
  }
}

export default Movies;
