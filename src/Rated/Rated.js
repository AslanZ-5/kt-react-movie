import React, { Component } from "react";
import { Alert, Space, Spin } from "antd";
import PaginationComp from "../PaginationComp";
import Movies from "../Movies";

class Rated extends Component {
  render() {
    const {
      movies,
      hasError,
      loading,
      intError,
      total_results,
      getMovies,
      ratedToStorage,
      rating,
    } = this.props;

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
        <Movies
          rating={rating}
          ratedToStorage={ratedToStorage}
          movies={movies}
          loading={loading}
        />
        <PaginationComp total_results={total_results} getMovies={getMovies} />
      </div>
    );
  }
}

export default Rated;
