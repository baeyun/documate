const { writeFileSync, readFileSync } = require("fs");

const CWD = process.cwd();
const { pathToUri } = require("../src/utils");
const uniqider = require("uniqider");
const marked = require("marked");

module.exports = {
  generateDocs: function(nav, outputPath) {
    // Generate docs
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

          pathToSourceMap[pathToUri(pathSlashSub)] = filename;
        } else {
          walk(pathSlashSub);
        }
      }
    };

    walk(nav);

    return pathToSourceMap;
  }
};
