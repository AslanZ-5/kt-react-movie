import React, { Component } from "react";
import { Alert, Space } from "antd";
import Header from "../Header";
import "./App.css";
import Search from "../Search";
import Rated from "../Rated";

class App extends Component {
  state = {
    hasError: false,
    rated: false,
  };

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  onTabChange = (e) => {
    e.preventDefault();
    if (e.target.innerText === "Rated") {
      this.setState({
        rated: true,
      });
    } else {
      this.setState({
        rated: false,
      });
    }
  };

  render() {
    const { hasError, rated } = this.state;
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
        <Header onTabChange={this.onTabChange} rated={rated} />
        {!rated ? <Search /> : <Rated />}
      </div>
    );
  }
}

export default App;
