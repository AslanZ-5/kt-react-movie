import React, { Component } from "react";

import Header from "../Header";
import Movies from "../Movies";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Movies />
      </div>
    );
  }
}

export default App;
