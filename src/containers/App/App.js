import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import Document from "../../components/Document";
import Footer from "../../components/Footer";

import "./App.css";

// Get TOPNAV
const { TOPNAV } = require(process.env.REACT_APP_DOCUMATE_CWD +
  "/documate/nav.json");

let possibleTopnavPaths = Object.keys(
  JSON.parse(process.env.REACT_APP_DOCUMATE_TOPNAVSOURCEMAP)
);

let possibleDocPaths = Object.keys(
  JSON.parse(process.env.REACT_APP_DOCUMATE_SIDENAVSOURCEMAP)
);

class App extends Component {
  render() {
    return (
      <Router>
        <div id="app">
          <Navbar nav={TOPNAV} />

          {/* ROUTES */}
          <Route path="/" exact component={Page} />
          {possibleTopnavPaths.map((path, i) => (
            <Route key={"nav-paths-" + i} path={path} component={Page} />
          ))}
          <Route path="/docs" exact component={Document} />
          {possibleDocPaths.map((path, i) => (
            <Route key={"doc-paths-" + i} path={path} component={Document} />
          ))}

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
