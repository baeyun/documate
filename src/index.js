const { readFileSync, writeFileSync } = require('fs')
const { exec } = require('child_process')

const { Converter } = require('showdown')
const htmlTemplate = require('./index-template')
const converter = new Converter()
const navContent = readFileSync('./documate/nav.md').toString()
const nav = converter.makeHtml(navContent)
const links = navContent.match(/^\s*\-\s*\[.+\]\((.+)\)\s*$/gim)
  .map(link => link.match(/\((.+)\)/i)[1])

console.log(links)

// writeFileSync('./documate/cache/index.html', htmlTemplate(nav))

// const thread = exec(
//   'parcel ./documate/cache/index.html --out-dir ./documate/public --no-cache'
// )

// thread.stdout.on('data', data => {
//   console.log(data.toString())
// })

// thread.stderr.on('data', data => {
//   console.log(data.toString())
// })

// thread.on('exit', code => {
//   console.log(`Child exited with code ${code}`)
// })
