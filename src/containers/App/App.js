import React, { Component } from "react";
import { Container, Row } from "reactstrap";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Main from "../../components/Main";
import Footer from "../../components/Footer";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div id="app">
        <Navbar />
        <Main />
        <Sidebar />
        <Footer />
      </div>
    );
  }
}

export default App;
