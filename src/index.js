const {
  readFileSync,
  writeFileSync,
  createReadStream,
  createWriteStream,
  existsSync
} = require('fs')
const { sep: pathSeperator } = require('path')
const { exec } = require('child_process')
const chalk = require('chalk')

const { createCleanDirectory } = require('./utils')
const uniqider = require('uniqider')
const { Converter } = require('showdown')
const htmlTemplate = require('./assets/index-template')
const converterInstance = new Converter()
const dir = __dirname + pathSeperator
const cwd = process.cwd() + pathSeperator

if (!existsSync(cwd + 'package.json')) {
  // console.log('\033[2J');
  console.warn(`\n    ${chalk.red("Documate requires project to have a valid package.json file")}\n`)
  process.exit(0)
}

let projectName = require(cwd + 'package.json')['name']

let urlRewriteMap = {}
let searchables = []
let codeLanguages = []
let navContent = readFileSync(cwd + 'documate/nav.md').toString()
let initialPartial = ''

// handle logo
const logoBase64 = existsSync(cwd + 'documate/logo.png')
  ? 'data:image/png;base64,' + readFileSync(cwd + 'documate/logo.png', 'base64')
  : 'data:image/png;base64,' + readFileSync(dir + 'assets/img/documate-logo.png', 'base64')

createCleanDirectory(cwd + projectName + '-site/')
createCleanDirectory(cwd + projectName + '-site/cache/')
createCleanDirectory(cwd + projectName + '-site/cache/assets/')
createCleanDirectory(cwd + projectName + '-site/partials/')

let [, topnavContent, sidenavContent] = navContent.split(/\<\!\-\-\s*(?:TOPNAV|SIDENAV)\s*\-\-\>/)

const topnavContentHTML = converterInstance.makeHtml(topnavContent)
  .match(/\<ul\>((.|\n)*)\<\/ul\>/)[1].trim()

// Sidenav
sidenavContent.split('\n').filter(l => l.trim() !== '')
.map((line, i) => {
  // FIXME: `*` not appropriate
  let link = line.match(/\([\.\/]*(.+)\)/i)

  if (!link) return;

  let id = uniqider()
  let partial = readFileSync(cwd + 'documate/' + link[1]).toString()
  let urlPath = link[1].replace(/\.md$/, '').trim()

  // Handle images
  // @todo add markdown style images: ![Logo](./img/logo.png "Logo")
  let imgMatches = partial.match(/\<img.+\/?\>/gim)
  if (imgMatches) {
    imgMatches.map(match => {
      let imgPath = match.match(/src\=\"[\.\/]*(.[^\"]+)\"/i)[1]
      let newImgName = uniqider() + imgPath.match(/(\.\w+)$/)[1]

      // Copy to ./<PROJECT_NAME>-site/cache/assets/
      createReadStream(cwd + 'documate/' + imgPath).pipe(
        createWriteStream(cwd + projectName + '-site/cache/assets/' + newImgName)
      )

      // Update img with new src path
      partial = partial.replace(
        match,
        match.replace(
          new RegExp('[\.\/]*' + imgPath),
          '/assets/' + newImgName
        )
      )
    })
  }

  // Append unique partial ID to all permalinks,
  // then append info to searchables array
  let headers = partial.match(/^\#{1,6}\s*.+/gim)
  if (headers)
    headers.map(match => {
      let headerTagNumber = match.match(/\#/g).length
      let title = match.substring(headerTagNumber).trim()
      let titleSlug = title
        .replace(/[^a-zA-Z0-9_\s]+/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase()
      let permalink = urlPath + '~' + titleSlug
      
      searchables.push({title, permalink})
      
      partial = partial.replace(match, `<h${headerTagNumber} data-path="/${permalink}">${title}</h${headerTagNumber}>`)
    })

  urlRewriteMap[urlPath] = id

  sidenavContent = sidenavContent.replace(
    line.trim(),
    line.trim().split('](')[0] + `](${urlPath})`
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
    .map(lang => 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/languages/' + lang.trim() + '.min.js')
    .map(mappedLink => '<span hidden="true" class="highlight-langs" data-src="' + mappedLink + '"></span>')
    .join('\n')
  let partialHTML = `<div id="${id}" class="content active">
  ${converterInstance.makeHtml(partial)}
  ${codeLinks}
</div>
`
  
  if (i === 0)
    initialPartial = partialHTML

  writeFileSync(
    `${cwd + projectName}-site/partials/${id}.html`,
    partialHTML
  )
})

const sidenavContentHTML = converterInstance.makeHtml(sidenavContent)
const htmlTempConfig = {
  urlRewriteMap,
  searchables,
  projectName,
  logoBase64,
  topnavContentHTML,
  sidenavContentHTML,
  initialPartial
}

writeFileSync(
  cwd + projectName + '-site/cache/index.html',
  htmlTemplate(htmlTempConfig)
)

const cmd = process.env.NODE_ENV === 'production'
  ? `parcel build ${cwd + projectName}-site/cache/index.html --out-dir ${cwd + projectName}-site`
  : `parcel ${cwd + projectName}-site/cache/index.html --out-dir ${cwd + projectName}-site --port 3000 --no-cache`
const thread = exec(cmd)

thread.stdout.on('data', data => {
  console.log(data.toString())
})
thread.stderr.on('data', data => {
  console.log(data.toString())
})
thread.on('exit', code => {
  if (process.env.NODE_ENV === 'production')
    console.log(`Done.`)
})
