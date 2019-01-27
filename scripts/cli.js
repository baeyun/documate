#!/usr/bin/env node

const { version } = require("../package.json");
const { existsSync } = require("fs");
const { exec } = require("child_process");
const path = require("path")
const chalk = require("chalk");

const { throwErr } = require("./utils");

const [, , ...args] = process.argv;
const CWD = process.cwd();

// Set global Documate env vars
process.env.REACT_APP_DOCUMATE_CWD = CWD;

switch (args[0]) {
  /**
   * documate init example-app
   */
  case "init":
    require("./init");
    break;

  /**
   * documate start & build cmds
   */
  case "start":
  case "build":
    if (!existsSync(CWD + "/documate/config.js")) {
      throwErr("A config.js must be present in ./documate/");
    }
    
    const startProcess = exec(
      `cd ${path.normalize(__dirname + "/../")} && node scripts/${args[0]}.js ${CWD}`
    )
  
    startProcess.stdout.on('data', function(data) {
      process.stdout.write(data.toString())
    })
  
    startProcess.stderr.on('data', function(data) {
      process.stdout.write(data.toString())
    })
  
    startProcess.on('exit', function(data) {
      process.stdout.write(data.toString())
    })
    break;

  /**
   * documate version
   */
  case "--version":
  case "version":
  case "-v":
    console.log(
      "\n  Documate version: " + chalk.hex("#1e87f0")(version) + "\n"
    );
    break;

  /**
   * documate version
   */
  case "--help":
  case "help":
  case "-h":
  default:
    console.log(`
  Welcome to Documate ${chalk.grey("- Version: " + version)}

    Command usage: ${chalk.hex("#1e87f0")("documate")} <command>
  
  AVAILABLE COMMANDS:
    
    ${chalk.hex("#1e87f0")("init")}
      Creates a ${chalk.grey("/documate")} folder with a ${chalk.grey(
      "/documate/nav.md"
    )}
      file in the folder where it's run. This is where
      your documentation files should live.

    ${chalk.hex("#1e87f0")("start")}
      Converts all ${chalk.grey(".md")} (markdown) files into valid
      HTML which is then formed into a static website
      in ${chalk.grey("./<PROJECT_NAME>-site")} in the directory where
      it's run. This site is then served with
      ${chalk.grey("parcel-bundler")}. This is useful for development.

    ${chalk.hex("#1e87f0")("build")}
      Creates a static website out of the documentation
      in the ${chalk.grey("/documate")} folder which it then outputs
      to ${chalk.grey("./<PROJECT_NAME>-site")} in the directory where
      it's run. This could then be deployed in any way
      you please, be it on github pages, netlify, zeit,
      custom host, etc.

    ${chalk.hex("#1e87f0")("--version | version | -v")}
      These commands simply return the current version
      of Documate that you are running.

    ${chalk.hex("#1e87f0")("--help | help | -h")}
      These commands coupled with the ${chalk.hex("#1e87f0")(
        "documate"
      )} command
      produce a brief documentation on all available
      Documate commands. For more info, visit our online
      documention pages via: ${chalk.grey("https://documate.netlify.com/")}
    `);
    break;
}
