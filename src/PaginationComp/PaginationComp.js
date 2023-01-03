import React from "react";
import { Pagination } from "antd";
import "./PaginationComp.css";

const PaginationComp = ({ query, total_results, getMovies }) => {
  const movies = query
    ? (page) => getMovies(query, page)
    : (page) => getMovies(page);
  return (
    <div className="antd-pag">
      <Pagination
        showSizeChanger={false}
        defaultPageSize={20}
        onChange={movies}
        defaultCurrent={1}
        total={total_results}
      />
    </div>
  );
};

export default PaginationComp;
