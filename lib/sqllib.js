let sqlfunction = () => {

  console.log('creating sql.js')

  /*const cdd = 'echo ' + args.file
  let errorfun = (error, stdout, stderr) => {
    if (error) {
      console.log('exec error: ' + error)
    }
    if (stdout) {
      //console.log(stdout)
    }
    if (stderr) {
      console.log('shell error: ' + stderr)
    }
  }
  exec(cdd, errorfun)

  fs.writeFile('./' + args.file, 'const express = require(\'haiexpress\')\nconst Person = require(\'../models/person\')\n\nvar app = express()\n\napp.get(\'/person\', (req, res, next) => {\n  res.send({name: \'GET\'})\n})\n\napp.post(\'/person\', (req, res,next) => {\n  res.send({name: \'POST\'})\n})\n\napp.put(\'/person/:id\', (req, res, next) => {\n  res.send({name: \'PUT\'})\n})\n\napp.delete(\'/person/:id\', (req, res, next) => {\n  res.send({name: \'DELETE\'})\n})\n\nmodule.exports = router', function (err) {
    if (err) {
      throw err;
    } else {
      console.log('File created...!')
    }

  })*/
}

exports.sqlfunction = sqlfunction