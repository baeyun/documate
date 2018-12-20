const { readFileSync, writeFileSync } = require('fs')
const { exec } = require('child_process')

const { Converter } = require('showdown')
const htmlTemplate = require('./html-template')
const converter = new Converter()
const navContent = readFileSync('./documate/nav.md').toString()
const nav = converter.makeHtml(navContent)

writeFileSync('./cache/index.html', htmlTemplate(nav))

const thread = exec(
  'parcel ./cache/index.html --out-dir ./documate/public --no-cache'
)

thread.stdout.on('data', (data) => {
  console.log(data.toString())
})

thread.stderr.on('data', (data) => {
  console.log(data.toString())
})

thread.on('exit', (code) => {
  console.log(`Child exited with code ${code}`)
})
