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

  const walk = nav => {
    for (const i in nav) {
      let pathSlashSub = nav[i];
      if (pathSlashSub.constructor === String) {
        let docContent = marked(
          readFileSync(`${CWD}/documate/${pathSlashSub}`).toString()
        );
        let filename = uniqider() + ".html";

        writeFileSync(`${outputPath}/${filename}`, docContent);

        pathToSourceMap[pathToUri(pathSlashSub)] = "/partials/" + filename;
      } else {
        walk(pathSlashSub);
      }
    }
  };

  walk(nav);

  return pathToSourceMap;
}

// Handle navigation & doc/page gen
const CWD = process.cwd();
const outputPath = `${CWD}/documate/public/partials`;
const { TOPNAV, SIDENAV } = require(CWD + "/documate/nav.json");

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
const SidenavSourceMap = generateDocs(SIDENAV, outputPath);

// Set global REACT_APP_DOCUMATE_SIDENAVSOURCEMAP env var
process.env.REACT_APP_DOCUMATE_SIDENAVSOURCEMAP = JSON.stringify(
  SidenavSourceMap
);
