import React, { Component } from "react";
import { Alert, Space } from "antd";
import Header from "../Header";
import { Provider } from "../movieContext";
import GetMovies from "../service/getMovies";
import "./App.css";
import Tabs from "../Tabs";

class App extends Component {
  state = {
    hasError: false,
    genres: null,
    rateActive: false,
  };

  componentDidMount() {
    const genres = new GetMovies();
    genres.getGenres().then((dt) => {
      const data = dt.genres;
      const obj = {};
      for (let i = 0; i < data.length; i++) {
        obj[data[i].id] = data[i].name;
      }
      this.setState({
        genres: obj,
      });
    });
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  rateActive = () => {
    this.setState({
      rateActive: true,
    });
  };

  // onTabChange = (e) => {
  //   if (e.target.innerText === "Rated") {
  //     this.setState({
  //       rated: true,
  //     });
  //   } else {
  //     this.setState({
  //       rated: false,
  //     });
  //   }
  // };

  render() {
    const { hasError, genres, rateActive } = this.state;
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
    return (
      <div className="App">
        <Header isActive={rateActive} />
        <Provider value={genres}>
          <Tabs rateActive={this.rateActive} />
        </Provider>
      </div>
    );
  }
}

export default App;
