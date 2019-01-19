const marked = require("marked");
const uniqider = require("uniqider");
const {
  existsSync,
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
        var htmlDocContent = marked(mdDocContent);

        // Extract used code languages for code highlighting
        let matches = mdDocContent.match(/^```(\w+)\s*$/gim);

        if (matches)
          for (let i = 0; i < matches.length; i++) {
            usedCodeLangs.push(matches[i].substr(3).trim());
          }

        // Handle images
        let imgMatches = htmlDocContent.match(/\<img.+\/?\>/gim);
        if (imgMatches) {
          for (let i = 0; i < imgMatches.length; i++) {
            let match = imgMatches[i];
            let imgPath =
              CWD + "/documate/docs/" + match.match(/src\=\"[\.\/]*(.[^\"]+)\"/i)[1];

            // convert to base64 and replace src
            if (existsSync(imgPath)) {
              let base64Src =
                "data:image/png;base64," + readFileSync(imgPath, "base64");

              htmlDocContent = htmlDocContent.replace(
                match,
                match.replace(
                  /src\=\"[\.\/]*(.[^\"]+)\"/i,
                  `src="${base64Src}" width="100%"`
                )
              );
            } else {
              console.warn("DOCUMATE ERR: Unable to find image.");
              process.kill(0);
            }
          }
        }

        // Output
        let newFilename = uniqider() + ".html";
        writeFileSync(
          // Output with new filename
          `${outputPath}/${newFilename}`,
          // Markdown to HTML
          htmlDocContent
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
