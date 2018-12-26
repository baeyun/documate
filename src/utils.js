const { mkdirSync, existsSync } = require('fs')
const rimraf = require('rimraf')

module.exports = {
  createCleanDirectory: dir => {
    if (!existsSync(dir))
      mkdirSync(dir)
    else // clear
      rimraf.sync(
        dir + '/*'
      )
  }
}