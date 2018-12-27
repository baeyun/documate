const {
  readFileSync,
  writeFileSync,
  createReadStream,
  createWriteStream,
  existsSync
} = require('fs')
const { exec } = require('child_process')

const { createCleanDirectory } = require('./utils')
const uniqider = require('uniqider')
const { Converter } = require('showdown')
const htmlTemplate = require('./assets/index-template')
const converterInstance = new Converter()

let urlRewriteMap = {}
let searchables = []
let codeLanguages = []
let navContent = readFileSync('./documate/nav.md').toString()
let initialPartial = ''

// handle logo
const logoBase64 = existsSync('./documate/logo.png')
  ? 'data:image/png;base64,' + readFileSync('./documate/logo.png', 'base64')
  : 'data:image/png;base64,' + readFileSync('./src/assets/img/documate-logo.png', 'base64')

createCleanDirectory('./documate-site/')
createCleanDirectory('./documate-site/cache/')
createCleanDirectory('./documate-site/cache/assets/')
createCleanDirectory('./documate-site/partials/')

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
  let partial = readFileSync('./documate/' + link[1]).toString()
  let urlPath = link[1].replace(/\.md$/, '').trim()

  // Handle images
  // @todo add markdown style images: ![Logo](./img/logo.png "Logo")
  let imgMatches = partial.match(/\<img.+\/?\>/gim)
  if (imgMatches) {
    imgMatches.map(match => {
      let imgPath = match.match(/src\=\"[\.\/]*(.[^\"]+)\"/i)[1]
      let newImgName = uniqider() + imgPath.match(/(\.\w+)$/)[1]

      // Copy to ./documate-site/cache/assets/
      createReadStream('./documate/' + imgPath).pipe(
        createWriteStream('./documate-site/cache/assets/' + newImgName)
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
  partial.match(/^\#{1,6}\s*.+/gim).map(match => {
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
    .map(lang => 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/languages/' + lang + '.min.js')
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
    `./documate-site/partials/${id}.html`,
    partialHTML
  )
})

const sidenavContentHTML = converterInstance.makeHtml(sidenavContent)
const htmlTempConfig = {
  urlRewriteMap,
  searchables,
  logoBase64,
  topnavContentHTML,
  sidenavContentHTML,
  initialPartial
}

writeFileSync(
  './documate-site/cache/index.html',
  htmlTemplate(htmlTempConfig)
)

const thread = exec(
  'parcel ./documate-site/cache/index.html --out-dir ./documate-site --port 1234 --no-cache'
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
