import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li className="header-item ">
            <a className="header-link active" href="ds/">
              Search
            </a>
          </li>
          <li className="header-item">
            <a className="header-link" href="ds/">
              Rated
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
