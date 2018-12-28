const {
  readFileSync
} = require('fs')
const { sep: pathSeperator } = require('path')

const dir = __dirname + pathSeperator
const resetStyles = readFileSync(dir + 'reset.css').toString()
const baseStyles = readFileSync(dir + 'css/base.css').toString()
const codeTheme = readFileSync(dir + 'code-theme.min.css').toString()
const styles = readFileSync(dir + 'styles.css').toString()
const script = readFileSync(dir + 'script.js').toString()
const menuIcon = readFileSync(dir + 'menu-icon.svg').toString()
const searchIcon = readFileSync(dir + 'search-icon.svg').toString()
const uikitIcons = readFileSync(dir + 'js/uikit-icons.min.js').toString()

module.exports = ({
  urlRewriteMap,
  searchables,
  projectName: title,
  logoBase64,
  topnavContentHTML: topnav,
  sidenavContentHTML: sidenav,
  initialPartial
}) => {
  title = title[0].toUpperCase() + title.slice(1)
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>${title}</title>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
  <link rel="icon" href="favicon.ico" sizes="16x16" type="image/ico">
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/highlight.min.js"></script>
  <style data-lib-type="reset" type="text/css">
${resetStyles}
  </style>
  <style data-lib-type="base" type="text/css">
${baseStyles}
  </style>
  <style data-lib-type="documate" type="text/css">
${styles}
  </style>
  <style data-lib-type="highlight" type="text/css">
${codeTheme}
  </style>
</head>
<body>
  <nav id="topnav" class="navbar-container navbar-transparent" navbar>
    <a id="logo" href="/">
      <img src="${logoBase64}" />
    </a>
    <a id="menu-link" href="">
    ${menuIcon}
    </a>
    <div id="search">
      <input type="search" placeholder="Search docs..." />
      <a href="">
        ${searchIcon}
      </a>
      <div id="search-results"></div>
    </div>
    <div class="navbar-right">
      <ul class="navbar-nav">
        ${topnav}
      </ul>
    </div>
  </nav>
  <aside id="sidenav">
    ${sidenav}
  </aside>
  <main id="main-content">
    ${initialPartial}
  </main>
  
  <script data-lib-type="base" type="text/javascript">
var urlRewriteMap = ${JSON.stringify(urlRewriteMap)};
var searchables = ${JSON.stringify(searchables)};
  </script>
  <script data-lib-type="base" type="text/javascript">
;(function(window) {
  ${script}
})(window);
  </script>
  <script data-lib-type="base-icons" type="text/javascript">
${uikitIcons}
  </script>
</body>
</html>`
}
