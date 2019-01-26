/**
 * Documate create docs site files
 */

const { existsSync, copySync } = require("fs-extra");
const { normalize } = require("path");

const { throwErr } = require("./utils");

const CWD = process.cwd();

if (!existsSync(CWD + "/package.json"))
  throwErr("A package.json file is require to be present in project root.");

// Copy temp files over to project
copySync(
  normalize(__dirname + "/temps/documate/"),
  normalize(CWD + "/documate")
);
