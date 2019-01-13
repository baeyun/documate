const { mkdirSync, existsSync } = require("fs");
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
  }
};
