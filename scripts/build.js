/**
 * Documate production build
 */

const { readFileSync, writeFileSync } = require("fs");

const { pathToUri } = require("../src/utils");
const {
  createCleanDirectory,
  markdownDocsToHtml,
  processTopnavPages
} = require("./utils");

const CWD = process.cwd();
const sitePath = `${CWD}/documate/website`;
const patialsOutputPath = sitePath + "/partials";
const {
  navs: { TOPNAV, SIDENAV }
} = require(CWD + "/documate/config.js");

createCleanDirectory(sitePath); // Empty dir for site
createCleanDirectory(patialsOutputPath); // Empty dir for partials

// Create redirect rules file. This is necessary
// for static site deployment services like netlify
writeFileSync(sitePath + "/_redirects", "/*    /index.html   200\n");

// Generate docs and pages
const { siteName } = require(CWD + "/documate/config");
const topnavSourceMap = processTopnavPages(TOPNAV, patialsOutputPath);
const { sidenavSourceMap, searchables, usedCodeLangs } = markdownDocsToHtml(
  SIDENAV,
  patialsOutputPath
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
require("./craBuild");
