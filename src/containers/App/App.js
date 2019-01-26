import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { loadCodeBlockAssets } from "../../utils";

import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import Document from "../../components/Document";
import Footer from "../../components/Footer";

import "./App.css";

// Load necessary Prism themes and languages
loadCodeBlockAssets();

const TOPNAV = JSON.parse(process.env.REACT_APP_DOCUMATE_TOPNAV);
window.searchables = JSON.parse(process.env.REACT_APP_DOCUMATE_SEARCHABLES);
let codeTheme = process.env.REACT_APP_DOCUMATE_CODEBLOCKTHEME;

let possibleTopnavPaths = Object.keys(
  JSON.parse(process.env.REACT_APP_DOCUMATE_TOPNAVSOURCEMAP)
);

let possibleDocPaths = Object.keys(
  JSON.parse(process.env.REACT_APP_DOCUMATE_DOCSSOURCEMAP)
);

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
