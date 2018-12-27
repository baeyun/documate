const { existsSync, writeFileSync } = require('fs')
const { sep: pathSeperator } = require('path')
const dir = __dirname + pathSeperator
const cwd = process.cwd() + pathSeperator
const { createCleanDirectory } = require('./utils')
const chalk = require('chalk')

createCleanDirectory(cwd + 'documate')

if (!existsSync(cwd + 'documate/nav.md'))
  writeFileSync(cwd + 'documate/nav.md', `<!-- TOPNAV -->

- [Home](/)

<!-- SIDENAV -->

- [Welcome](./welcome.md)
`)

if (!existsSync(cwd + 'documate/welcome.md'))
  writeFileSync(cwd + 'documate/welcome.md', `<h1 style="text-align: centerl;">Welcome to Documate</h1>

Hi, and welcome to Documate, the tool that'll make creating sites for your projects docs a lot easier.

Start by editing this file in \`./documate/welcome.md\` in your project's root directory. Control your site routes from \`./documate/nav.md\`.

For more info on getting started, visit our [docs](http://documate.github.io) that's been built with Documate too.

Enjoy writing docs with documate. Made with ❤ by [@bukharim96](https://twitter.com/bukharim96) and [@undefinedbuddy](https://twitter.com/undefinedbuddy).`)

console.info(
  `\n    ${chalk.green("Documate initialized successfully. Enjoy documenting your project!")}\n`
)