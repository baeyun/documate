const {
  readFileSync
} = require('fs')

const styles = readFileSync('./src/assets/styles.css').toString()
const script = readFileSync('./src/assets/script.js').toString()

module.exports = (nav, defaultPartial = '') => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Documate</title>
  <style>
${styles}
  </style>
</head>
<body>
  <nav id="navbar">
    ${nav}
  </nav>
  <main id="main-content">
    ${defaultPartial}
  </main>

  <script type="text/javascript">
${script}
  </script>
</body>
</html>`
