const { mkdirSync, existsSync, readFileSync, writeFileSync } = require("fs");
const { normalize } = require("path");

const rimraf = require("rimraf");
const marked = require("marked");
const uniqider = require("uniqider");
const { pathToUri } = require("../src/utils");

const CWD = process.cwd();

const embedBase64Imgs = (htmlContent, srcPath) => {
  let imgMatches = htmlContent.match(/\<img.+\/?\>/gim);
  var newHtmlContent = "";

  if (imgMatches)
    for (let i = 0; i < imgMatches.length; i++) {
      let match = imgMatches[i];
      let imgPath = srcPath + match.match(/src\=\"[\.\/]*(.[^\"]+)\"/i)[1];

      // convert to base64 and replace src
      if (existsSync(imgPath)) {
        let base64Src =
          "data:image/png;base64," + readFileSync(imgPath, "base64");

        newHtmlContent = htmlContent.replace(
          match,
          match.replace(/src\=\"[\.\/]*(.[^\"]+)\"/i, `src="${base64Src}"`)
        );
      } else {
        console.warn(`DOCUMATE ERR: Unable to find image in: ${srcPath}`);
        process.kill(0);
      }
    }
  else return htmlContent;

  return newHtmlContent;
};

module.exports = {
  // copyPublicFolder: () => {
  //   fs.copySync(paths.appPublic, paths.appBuild, {
  //     dereference: true,
  //     filter: file => file !== paths.appHtml,
  //   });
  // },
  createCleanDirectory: dir => {
    if (!existsSync(dir)) mkdirSync(dir);
    else rimraf.sync(dir + "/*"); // clear
  },
  embedBase64Imgs,
  processTopnavPages: (topnav, outputPath) => {
    // copy to partials dir under new uid name
    let topnavSourceMap = {};

    Object.keys(topnav).map(k => {
      let path = normalize(`${CWD}/documate/${topnav[k]}`);

      try {
        var htmlContent = readFileSync(path).toString();

        // Embed all images as inline base64
        htmlContent = embedBase64Imgs(htmlContent, CWD + "/documate/");

        // Output
        let newPartialName = uniqider() + ".html";
        writeFileSync(
          // Output with new filename
          `${outputPath}/${newPartialName}`,
          htmlContent
        );

        topnavSourceMap[pathToUri(topnav[k])] = "/partials/" + newPartialName;
      } catch (e) {
        // It's propably a link
        topnavSourceMap[pathToUri(topnav[k])] = null;
      }
    });

    return topnavSourceMap;
  },
  markdownDocsToHtml: (nav, outputPath) => {
    var sidenavSourceMap = {};
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

          // Embed all images as inline base64
          htmlDocContent = embedBase64Imgs(
            htmlDocContent,
            CWD + "/documate/docs/"
          );

          // Output
          let newPartialName = uniqider() + ".html";
          writeFileSync(
            // Output with new filename
            `${outputPath}/${newPartialName}`,
            // Markdown to HTML
            htmlDocContent
          );

          sidenavSourceMap[pathToUri(pathSlashSub)] =
            "/partials/" + newPartialName;
        } else {
          walk(pathSlashSub);
        }
      }
    };

    walk(nav);

    // remove duplicates
    usedCodeLangs = [...new Set(usedCodeLangs)];

    return { sidenavSourceMap, usedCodeLangs };
  }
};
