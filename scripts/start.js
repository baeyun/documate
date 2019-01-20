/**
 * Documate start development build
 */

const { readFileSync, writeFileSync } = require("fs");

const { pathToUri } = require("../src/utils");
const {
  createCleanDirectory,
  markdownDocsToHtml,
  processTopnavPages
} = require("./utils");

const CWD = process.cwd();
const outputPath = `${CWD}/documate/public/partials`;
const {
  navs: { TOPNAV, SIDENAV }
} = require(CWD + "/documate/config.js");

createCleanDirectory(outputPath); // Empty dir for partials

// Generate docs and pages
const { siteName } = require(CWD + "/documate/config");
const topnavSourceMap = processTopnavPages(TOPNAV, outputPath);
const { sidenavSourceMap, searchables, usedCodeLangs } = markdownDocsToHtml(
  SIDENAV,
  outputPath
);

// SET GLOBALS
process.env.REACT_APP_DOCUMATE_SITENAME = siteName;
process.env.REACT_APP_DOCUMATE_TOPNAV = JSON.stringify(TOPNAV);
process.env.REACT_APP_DOCUMATE_SIDENAV = JSON.stringify(SIDENAV);
process.env.REACT_APP_DOCUMATE_SEARCHABLES = JSON.stringify(searchables);
process.env.REACT_APP_DOCUMATE_TOPNAVSOURCEMAP = JSON.stringify(
  topnavSourceMap
);
process.env.REACT_APP_DOCUMATE_SIDENAVSOURCEMAP = JSON.stringify(
  sidenavSourceMap
);
process.env.REACT_APP_DOCUMATE_CODELANGS = JSON.stringify(usedCodeLangs);

/**
 * Leave the rest to CRA's start script
 */
require("./craStart");
