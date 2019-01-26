/**
 * Documate create docs site files
 */

const { existsSync, copySync } = require("fs-extra");
const { throwErr } = require("./utils");
const chalk = require("chalk");
const path = require("path");

const CWD = process.cwd();

if (!existsSync(CWD + "/package.json"))
  throwErr("A package.json file is require to be present in project root.");

if (existsSync(CWD + "/documate/"))
  throwErr(
    "Delete the documate folder in root directory first before re-initializing."
  );

// Copy temp files over to project
copySync(path.join(__dirname, "/temps/documate/"), path.join(CWD, "/documate"));

// success
console.log(
  chalk.green(
    "\n  Documate has been successfully initialized in this project.\n"
  )
);
