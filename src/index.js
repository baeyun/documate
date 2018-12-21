const {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync
} = require('fs')
const { exec } = require('child_process')

const rimraf = require('rimraf')
const uniqider = require('uniqider')
const { Converter } = require('showdown')
const htmlTemplate = require('./index-template')
const converterInstance = new Converter()
let navContent = readFileSync('./documate/nav.md').toString()
let initialPartial = ''

if (!existsSync('./documate/public/partials/'))
  mkdirSync('./documate/public/partials/')
else
  rimraf.sync(
    './documate/public/partials/*'
  )

navContent.split('\n').filter(l => l.trim() !== '')
.map((line, i) => {
  // FIXME: `*` not appropriate
  let link = line.match(/\([\.\/]*(.+)\)/i)
  let id = uniqider()
  let partial = converterInstance.makeHtml(
    `<div id="${id}" class="content active">${readFileSync('./documate/' + link[1]).toString()}</div>`
  )
  
  if (i === 0)
    initialPartial = partial

  writeFileSync(
    `./documate/public/partials/${id}.html`,
    partial
  )

  try {
    navContent = navContent.replace(
      line.trim(),
      line.trim().split('](')[0] + `](../public/partials/${id}.html)`
    )
  } catch(e) {}
})

const nav = converterInstance.makeHtml(navContent)

writeFileSync(
  './documate/cache/index.html',
  htmlTemplate(nav, initialPartial)
)

const thread = exec(
  'parcel ./documate/cache/index.html --out-dir ./documate/public --no-cache'
)

thread.stdout.on('data', data => {
  console.log(data.toString())
})

thread.stderr.on('data', data => {
  console.log(data.toString())
})

thread.on('exit', code => {
  console.log(`Child exited with code ${code}`)
})
