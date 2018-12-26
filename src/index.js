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

let urlRewriteMap = {}
let searchables = []
let codeLanguages = []
let navContent = readFileSync('./documate/nav.md').toString()
let initialPartial = ''

if (!existsSync('./documate/public/partials/'))
  mkdirSync('./documate/public/partials/')
else
  rimraf.sync(
    './documate/public/partials/*'
  )

let [, topnavContent, sidenavContent] = navContent.split(/\<\!\-\-\s*(?:TOPNAV|SIDENAV)\s*\-\-\>/)

const topnavContentHTML = converterInstance.makeHtml(topnavContent)
  .match(/\<ul\>((.|\n)*)\<\/ul\>/)[1].trim()

// Sidenav
sidenavContent.split('\n').filter(l => l.trim() !== '')
.map((line, i) => {
  // FIXME: `*` not appropriate
  let link = line.match(/\([\.\/]*(.+)\)/i)
  let id = uniqider()
  let partial = readFileSync('./documate/' + link[1]).toString()

  urlRewriteMap['/' + link[1].replace(/\.md$/, '')] = id

  sidenavContent = sidenavContent.replace(
    line.trim(),
    line.trim().split('](')[0] + `](${'/' + link[1].replace(/\.md$/, '')})`
  )

  // Match partial string before load to avoid
  // unnecessary DOM calls then highlight only
  // if <pre> tag contains a <code> sibling.
  let codePattern = partial.match(/^```(\w+)\s*$/gim);

  if (!!codePattern) {
    codePattern.map((matched) => {
      codeLanguages.push(matched.substr(3, matched.length))
    })
  }

  let codeLinks = codeLanguages
    .map(lang => 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/languages/' + lang + '.min.js')
    .map(mappedLink => '<span hidden="true" class="highlight-langs" data-src="' + mappedLink + '"></span>')
    .join('\n')
  let partialHTML = `<div id="${id}" class="content active">
  ${converterInstance.makeHtml(partial)}
  ${codeLinks}
</div>
`

  // Append unique partial ID to all permalinks
  partialHTML.match(/\<h[1-6]\s*id\=\"\w+\"\>/gim).map(match => {
    partialHTML = partialHTML.replace(match, match.split('id="').join(`data-path="${'/' + link[1].replace(/\.md$/, '')}~`))
  })
  
  if (i === 0)
    initialPartial = partialHTML

  writeFileSync(
    `./documate/public/partials/${id}.html`,
    partialHTML
  )
})

const sidenavContentHTML = converterInstance.makeHtml(sidenavContent)

writeFileSync(
  './documate/cache/index.html',
  htmlTemplate(urlRewriteMap, topnavContentHTML, sidenavContentHTML, initialPartial)
)

const thread = exec(
  'parcel ./documate/cache/index.html --out-dir ./documate/public --port 1234 --no-cache'
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
