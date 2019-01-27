/**
 * Documate start development build
 */

const { normalize } = require("path");
const { readFileSync } = require("fs");
const color = require("color");
const {
  createCleanDirectory,
  markdownDocsToHtml,
  processTopnavPages
} = require("./utils");

const CWD = process.argv[2] || process.cwd();
const patialsOutputPath = `${CWD}/documate/public/partials`;
const {
  title,
  logo: logoPath,
  navs: { TOPNAV, DOCS },
  footerContent,
  repoUrl,
  themeColors,
  codeBlockTheme
} = require(CWD + "/documate/config.js");
let base64logoSrc =
  "data:image/png;base64," +
    readFileSync(normalize(`${CWD}/documate/${logoPath}`), "base64") || null;
let primaryThemeColor = themeColors.primary || "#61dafb";
let lightPrimaryThemeColor = color(primaryThemeColor)
  .lighten(0.5)
  .string();
let secondaryThemeColor = themeColors.secondary || "#20232a";
let lightSecondaryThemeColor = color(secondaryThemeColor)
  .lighten(0.5)
  .string();
let brightSecondaryThemeColor = color(secondaryThemeColor)
  .lighten(0.9)
  .string();

createCleanDirectory(patialsOutputPath); // Empty dir for partials

// Generate docs and pages
const topnavSourceMap = processTopnavPages(TOPNAV, patialsOutputPath);
const { sidenavSourceMap, searchables, usedCodeLangs } = markdownDocsToHtml(
  DOCS,
  patialsOutputPath
);

// SET GLOBALS
process.env.REACT_APP_DOCUMATE_PROJECTVERSION =
  require(CWD + "/package.json").version || null;
process.env.REACT_APP_DOCUMATE_SITENAME = title;
process.env.REACT_APP_DOCUMATE_LOGOSRC = base64logoSrc;
process.env.REACT_APP_DOCUMATE_TOPNAV = JSON.stringify(TOPNAV);
process.env.REACT_APP_DOCUMATE_DOCS = JSON.stringify(DOCS);
process.env.REACT_APP_DOCUMATE_SEARCHABLES = JSON.stringify(searchables);
process.env.REACT_APP_DOCUMATE_TOPNAVSOURCEMAP = JSON.stringify(
  topnavSourceMap
);
process.env.REACT_APP_DOCUMATE_DOCSSOURCEMAP = JSON.stringify(sidenavSourceMap);
process.env.REACT_APP_DOCUMATE_CODELANGS = JSON.stringify(usedCodeLangs);
process.env.REACT_APP_DOCUMATE_FOOTERCONTENT = footerContent;
process.env.REACT_APP_DOCUMATE_REPOURL = (repoUrl && repoUrl) || null;
process.env.REACT_APP_DOCUMATE_CODEBLOCKTHEME = codeBlockTheme
  ? codeBlockTheme
  : "default";
process.env.REACT_APP_DOCUMATE_THEMECOLOR = `#main-content a,
#page a {
  color: #212529 !important;
  background-color: ${lightPrimaryThemeColor} !important;
}

#page .btn-link-arrow,
#footer a {
  color: ${lightPrimaryThemeColor} !important;
}

#main-content a:hover,
#page a:hover,
#page a.btn-link,
a.btn-link,
.accordion__body a.active::before {
  background-color: ${primaryThemeColor} !important;
}

#page .btn-link-arrow:hover,
#navbar a:hover:not(#navbar-brand),
#navbar #navbar-brand,
#navbar-links-left a:hover,
#navbar-links-left a.active,
div#search-results a:focus,
#footer a:hover,
#sidebar-fab,
.page-previous > span,
.page-next > span {
  color: ${primaryThemeColor} !important;
}

#navbar-links-left a:hover,
#navbar-links-left a.active {
  border-bottom-color: ${primaryThemeColor} !important;
}

#page .btn-link-arrow, #page .btn-link-arrow:hover {
  background-color: transparent !important;
}

#loader {
  stroke: ${primaryThemeColor} !important;
}

#navbar, #footer {
  background-color: ${secondaryThemeColor} !important;
}

input#navbar-search:focus,
#navbar a:focus:not(#navbar-brand) {
  background-color: ${brightSecondaryThemeColor} !important;
}

#pagination, #search-results {
  background-color: ${lightSecondaryThemeColor} !important;
}`;

/**
 * Leave the rest to CRA's start script
 */
require("./craStart");
