const { mkdirSync, existsSync, readFileSync } = require("fs");
const rimraf = require("rimraf");

module.exports = {
  createCleanDirectory: dir => {
    if (!existsSync(dir)) mkdirSync(dir);
    else rimraf.sync(dir + "/*"); // clear
  },
  pathToUri: path => {
    let match = path.match(/[\.]?[\/]?(.*)\.\w+$/);
    if (match && match[1] === "index") return "/";
    return match && match[1] ? "/" + match[1] : null;
  },
  titleCase: title =>
    title
      .split(/[\-\s]/g)
      .map(word => `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`)
      .join(" "),
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
            match.replace(/src\=\"[\.\/]*(.[^\"]+)\"/i, `src="${base64Src}"`)
          );
        } else {
          console.warn(`DOCUMATE ERR: Unable to find image in: ${srcPath}`);
          process.kill(0);
        }
      }
    else return htmlContent;

    return newHtmlContent;
  }
};
