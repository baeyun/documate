import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Row } from "reactstrap";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Main from "../../components/Main";
import Footer from "../../components/Footer";

import "./App.css";

// Get nav.json
const { TOPNAV, SIDENAV } = require(process.env.REACT_APP_DOCUMATE_CWD +
  "/documate/nav.json");

let possibleDocPaths = Object.keys(
  JSON.parse(process.env.REACT_APP_DOCUMATE_PATHTOSOURCEMAP)
);

class App extends Component {
  render() {
    return (
      <Router>
        <div id="app">
          <Navbar nav={TOPNAV} />
          <Route path="/" exact component={Main} />
          {possibleDocPaths.map((path, i) => (
            <Route key={"doc-paths-" + i} path={path} component={Main} />
          ))}
          <Sidebar nav={SIDENAV} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
