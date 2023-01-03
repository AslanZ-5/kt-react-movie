import React from "react";
import "./Header.css";

const Header = ({ rated, onTabChange }) => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li className="header-item ">
            <a
              onClick={(e) => onTabChange(e)}
              className={`header-link ${!rated ? "active" : ""}`}
              href="ds/"
            >
              Search
            </a>
          </li>
          <li className="header-item">
            <a
              onClick={(e) => onTabChange(e)}
              className={`header-link ${rated ? "active" : ""}`}
              href="ds/"
            >
              Rated
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
