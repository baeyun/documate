/**
 * Documate start development build
 */

const { normalize } = require("path");
const { readFileSync, writeFileSync } = require("fs");

const { pathToUri } = require("../src/utils");
const {
  createCleanDirectory,
  markdownDocsToHtml,
  processTopnavPages
} = require("./utils");

const CWD = process.cwd();
const patialsOutputPath = `${CWD}/documate/public/partials`;
const {
  title,
  logo: logoPath,
  navs: { TOPNAV, SIDENAV },
  footerContent,
  codeBlockTheme
} = require(CWD + "/documate/config.js");
let base64logoSrc =
  "data:image/png;base64," +
    readFileSync(normalize(`${CWD}/documate/${logoPath}`), "base64") || null;

createCleanDirectory(patialsOutputPath); // Empty dir for partials

// Generate docs and pages
const topnavSourceMap = processTopnavPages(TOPNAV, patialsOutputPath);
const { sidenavSourceMap, searchables, usedCodeLangs } = markdownDocsToHtml(
  SIDENAV,
  patialsOutputPath
);

// SET GLOBALS
process.env.REACT_APP_DOCUMATE_SITENAME = title;
process.env.REACT_APP_DOCUMATE_LOGOSRC = base64logoSrc;
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
process.env.REACT_APP_DOCUMATE_FOOTERCONTENT = footerContent;
process.env.REACT_APP_DOCUMATE_CODEBLOCKTHEME = codeBlockTheme
  ? codeBlockTheme
  : "default";

/**
 * Leave the rest to CRA's start script
 */
require("./craStart");
