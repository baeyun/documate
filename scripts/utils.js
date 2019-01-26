const { mkdirSync, existsSync, readFileSync, writeFileSync } = require("fs");
const { normalize } = require("path");

const rimraf = require("rimraf");
const marked = require("marked");
const uniqider = require("uniqider");
const { pathToUri } = require("../src/utils");

const CWD = process.cwd();
const SRC_PATH = CWD + "/documate/docs/";

// Setup markdown renderer
let markedRenderer = new marked.Renderer();

// Add GitHub styled heading links
markedRenderer.heading = (text, level) => {
  let escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");

  return `<h${level} id="${escapedText}" data-title="${text}">
    <a href="#${escapedText}" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>
    ${text}
  </h${level}>`;
};

// Use bootstrap's striped table
markedRenderer.table = (header, body) => {
  return `<table class="table table-striped">
    <thead>${header}</thead>
    <tbody>${body}</tbody>
  </table>`;
};

// Embed images
markedRenderer.image = (href, title, text) => {
  let imgPath = normalize(SRC_PATH + href);

  // convert to base64 and replace src
  if (!existsSync(imgPath)) {
    console.warn(`DOCUMATE ERR: Unable to find image in: ${imgPath}`);
    process.kill(0);
  }

  let base64Src = "data:image/png;base64," + readFileSync(imgPath, "base64");

  return `<img src="${base64Src}"${(title && ' title="' + title + '"') ||
    ""}${(text && ' alt="' + text + '"') || ""} />`;
};

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
    var searchables = {};

    const walk = nav => {
      for (const i in nav) {
        let pathSlashSub = nav[i];
        if (pathSlashSub.constructor === String) {
          let newPartialName = uniqider() + ".html";
          let path = pathToUri(pathSlashSub);
          let mdDocContent = readFileSync(
            `${CWD}/documate/${pathSlashSub}`
          ).toString();
          var htmlDocContent = marked(mdDocContent, {
            renderer: markedRenderer // custom renderer
          });

          // Extract searchable data
          // then append info to searchables array
          let headers = htmlDocContent.match(/\<h[1-6]\sid\=\".+?\"\sdata-title\=\".+?\"\>/gim);
          if (headers)
            for (let i = 0; i < headers.length; i++) {
              let header = headers[i];
              let match = header.match(
                /\<h[1-6]\sid\=\"(.+?)\"\sdata-title\=\"(.+?)\"\>/i
              );

              if (!match) continue;

              let [, permalink, title] = match;

              if (!searchables[path]) {
                searchables[path] = [{ permalink, title }];
                continue;
              }

              searchables[path].push({ permalink, title });
            }

          // Extract used code languages for code highlighting
          let matches = mdDocContent.match(/^```(\w+)\s*$/gim);

          if (matches)
            for (let i = 0; i < matches.length; i++) {
              usedCodeLangs.push(matches[i].substr(3).trim());
            }

          // Output
          writeFileSync(
            // Output with new filename
            `${outputPath}/${newPartialName}`,
            // Markdown to HTML
            htmlDocContent
          );

          sidenavSourceMap[path] = "/partials/" + newPartialName;
        } else {
          walk(pathSlashSub);
        }
      }
    };

    walk(nav);

    // remove duplicates
    usedCodeLangs = [...new Set(usedCodeLangs)];

    return { sidenavSourceMap, searchables, usedCodeLangs };
  }
};
