const {
  readFileSync
} = require('fs')

const resetStyles = readFileSync('./src/assets/reset.css').toString()
const codeTheme = readFileSync('./src/assets/code-theme.min.css').toString()
const styles = readFileSync('./src/assets/styles.css').toString()
const script = readFileSync('./src/assets/script.js').toString()

module.exports = (nav, defaultPartial = '') => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Documate</title>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/highlight.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/languages/javascript.min.js"></script>
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/github.min.css">
  <style type="text/css">
${resetStyles}
  </style>
  <style type="text/css">
${codeTheme}
  </style>
  <style type="text/css">
${styles}
  </style>
</head>
<body>
  <nav id="navbar">
    ${nav}
  </nav>
  <main id="main-content">
    <div class="content active">
      ${defaultPartial}
    </div>
  </main>

  <script type="text/javascript">
${script}
  </script>
</body>
</html>`
