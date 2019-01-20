const { mkdirSync, existsSync } = require("fs");

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
      .join(" ")
};
