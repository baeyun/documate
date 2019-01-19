const { mkdirSync, existsSync, readFileSync } = require("fs");
const rimraf = require("rimraf");

module.exports = {
  createCleanDirectory: dir => {
    if (!existsSync(dir)) mkdirSync(dir);
    else rimraf.sync(dir + "/*"); // clear
  },
  pathToUri: path => {
    // @todo handle errors
    let match = path.match(/[\.]?[\/]?(.*)\.\w+$/);
    return match && match[1] ? "/" + match[1] : "/";
  },
  embedBase64Imgs(htmlContent, srcPath) {
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
            match.replace(
              /src\=\"[\.\/]*(.[^\"]+)\"/i,
              `src="${base64Src}" width="100%"`
            )
          );
        } else {
          console.warn(`DOCUMATE ERR: Unable to find image in: ${srcPath}`);
          process.kill(0);
        }
      }

    return newHtmlContent;
  }
};
