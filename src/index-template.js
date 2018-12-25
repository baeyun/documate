const {
  readFileSync
} = require('fs')

const resetStyles = readFileSync('./src/assets/reset.css').toString()
const baseStyles = readFileSync('./src/assets/css/base.css').toString()
const codeTheme = readFileSync('./src/assets/code-theme.min.css').toString()
const styles = readFileSync('./src/assets/styles.css').toString()
const script = readFileSync('./src/assets/script.js').toString()

module.exports = (topnav, sidenav, defaultPartial = '') => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Documate</title>
  <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
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
    <a id="menu-link" href="">
    ${readFileSync('./src/assets/menu-icon.svg').toString()}
    </a>
    <div id="search">
      <input type="search" placeholder="Search docs..." />
      <a href="">
        ${readFileSync('./src/assets/search-icon.svg').toString()}
      </a>
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
    ${defaultPartial}
  </main>

  <script data-lib-type="base" type="text/javascript">
${script}
  </script>
  <script data-lib-type="base-icons" type="text/javascript">
${readFileSync('./src/assets/js/uikit-icons.min.js').toString()}
  </script>
</body>
</html>`
