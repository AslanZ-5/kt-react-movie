import React from "react";
import "./Header.css";

const Header = ({ isActive }) => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li className="header-item ">
            <a className={`header-link ${!isActive ? "active" : ""}`} href="/">
              Search
            </a>
          </li>
          <li className="header-item">
            <a
              className={`header-link ${isActive ? "active" : ""}`}
              href="/rated"
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
