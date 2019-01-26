import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { loadCodeLanguages } from "../../utils";

import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import Document from "../../components/Document";
import Footer from "../../components/Footer";

import "./App.css";
import "./editor-theme.css";

const TOPNAV = JSON.parse(process.env.REACT_APP_DOCUMATE_TOPNAV);
window.searchables = JSON.parse(process.env.REACT_APP_DOCUMATE_SEARCHABLES);

let possibleTopnavPaths = Object.keys(
  JSON.parse(process.env.REACT_APP_DOCUMATE_TOPNAVSOURCEMAP)
);

let possibleDocPaths = Object.keys(
  JSON.parse(process.env.REACT_APP_DOCUMATE_SIDENAVSOURCEMAP)
);

// Add necessary lang scripts from Prism
loadCodeLanguages(JSON.parse(process.env.REACT_APP_DOCUMATE_CODELANGS));

// Heart...
class App extends Component {
  render() {
    return (
      <Router>
        <div id="app">
          <Navbar nav={TOPNAV} />

          {/* ROUTES */}
          <Route path="/" exact component={Page} />
          {possibleTopnavPaths.map(
            (path, i) =>
              path !== "/" && (
                <Route key={"nav-paths-" + i} path={path} component={Page} />
              )
          )}
          <Route path="/docs" exact component={Document} />
          {possibleDocPaths.map((path, i) => (
            <Route
              key={"doc-paths-" + i}
              path={path}
              exact
              component={Document}
            />
          ))}

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
