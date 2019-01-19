const marked = require("marked");
const uniqider = require("uniqider");
const {
  readFileSync,
  writeFileSync,
  createReadStream,
  createWriteStream
} = require("fs");
const { normalize } = require("path");

const { pathToUri, createCleanDirectory } = require("../src/utils");

// Generate docs
function generateDocs(nav, outputPath) {
  var pathToSourceMap = {};
  var usedCodeLangs = [];

  const walk = nav => {
    for (const i in nav) {
      let pathSlashSub = nav[i];
      if (pathSlashSub.constructor === String) {
        let mdDocContent = readFileSync(
          `${CWD}/documate/${pathSlashSub}`
        ).toString();

        // Extract used code languages for code highlighting
        let matches = mdDocContent.match(/^```(\w+)\s*$/gim);

        if (matches)
          for (let i = 0; i < matches.length; i++) {
            usedCodeLangs.push(matches[i].substr(3).trim());
          }

        let htmlDocContent = marked(mdDocContent);
        let newFilename = uniqider() + ".html";

        writeFileSync(
          `${outputPath}/${newFilename}`,
          // Markdown to HTML
          marked(mdDocContent)
        );

        pathToSourceMap[pathToUri(pathSlashSub)] = "/partials/" + newFilename;
      } else {
        walk(pathSlashSub);
      }
    }
  };

  walk(nav);

  // remove duplicates
  usedCodeLangs = [...new Set(usedCodeLangs)];

  return { pathToSourceMap, usedCodeLangs };
}

// Handle navigation & doc/page gen
const CWD = process.cwd();
const outputPath = `${CWD}/documate/public/partials`;
const { TOPNAV, SIDENAV } = require(CWD + "/documate/nav.js");

// Empty dir for partials
createCleanDirectory(outputPath);

// TOPNAV
// copy to partials dir under new uid name
let TopnavSourceMap = {};
Object.keys(TOPNAV).map(k => {
  let newPartialName = uniqider() + ".html";

  createReadStream(normalize(`${CWD}/documate/${TOPNAV[k]}`)).pipe(
    createWriteStream(normalize(outputPath + "/" + newPartialName))
  );

  TopnavSourceMap[pathToUri(TOPNAV[k])] = "/partials/" + newPartialName;
});

// Set global REACT_APP_DOCUMATE_TOPNAVSOURCEMAP env var
process.env.REACT_APP_DOCUMATE_TOPNAVSOURCEMAP = JSON.stringify(
  TopnavSourceMap
);

// SIDENAV
const { pathToSourceMap, usedCodeLangs } = generateDocs(SIDENAV, outputPath);

// Set global REACT_APP_DOCUMATE_SIDENAVSOURCEMAP env var
process.env.REACT_APP_DOCUMATE_SIDENAVSOURCEMAP = JSON.stringify(
  pathToSourceMap
);

// Set global REACT_APP_DOCUMATE_CODELANGS env var
process.env.REACT_APP_DOCUMATE_CODELANGS = JSON.stringify(usedCodeLangs);

// Leave the rest to CRA's start script
require("./craStart");
