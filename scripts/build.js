/**
 * Documate production build
 */

const { normalize } = require("path");
const {
  existsSync,
  readFileSync,
  copyFileSync,
  copySync
} = require("fs-extra");

const {
  createCleanDirectory,
  markdownDocsToHtml,
  processTopnavPages
} = require("./utils");

const CWD = process.cwd();
const sitePath = `${CWD}/documate/website`;
const patialsOutputPath = sitePath + "/partials";
const {
  title,
  logo: logoPath,
  navs: { TOPNAV, SIDENAV },
  footerContent
} = require(CWD + "/documate/config.js");
let base64logoSrc =
  "data:image/png;base64," +
    readFileSync(normalize(`${CWD}/documate/${logoPath}`), "base64") || null;

createCleanDirectory(sitePath); // Empty dir for site
createCleanDirectory(patialsOutputPath); // Empty dir for partials

// Create redirect rules file. This is necessary
// for static site deployment services like netlify
copyFileSync(
  normalize(__dirname + "/temps/_redirects"),
  normalize(sitePath + "/_redirects")
);

// Copy the favicon folder over
let faviconDir = normalize(CWD + "/documate/public/favicons/")
if (existsSync(faviconDir))
  copySync(
    faviconDir,
    normalize(sitePath + "/favicons/")
  );

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

/**
 * Leave the rest to CRA's start script
 */
require("./craBuild");
