import React, { Component } from "react";
import { Alert, Space } from "antd";
import Header from "../Header";
import Movies from "../Movies";
import "./App.css";

class App extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
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
    return (
      <div className="App">
        <Header />
        <Movies />
      </div>
    );
  }
}

export default App;
