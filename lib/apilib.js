const fs = require('fs')
const exec = require('child_process').exec

let apifunction = (args) => {

  const exec = require('child_process').exec
  const fs = require('fs')
  if (args.file + '' != 'undefined') {

    const cdd = 'echo ' + args.file
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

    })

    // updating server.js

    var data = fs.readFileSync('nem.json')
    var jsondata = JSON.parse(data)

    const com = 'cd ' + jsondata.projectname
    let errrfun = (error, stdout, stderr) => {
      if (error) {
        console.log('exec error: ' + error)
      }
      if (stdout) {
        console.log(stdout)
      }
      if (stderr) {
        console.log('shell error: ' + stderr)
      }
    }
    exec(com, errrfun)

    fs.writeFile('./' + jsondata.projectname + '/server.js', 'const express = require(\'express\');\nconst bodyParser = require(\'body-parser\');\nconst cors = require(\'cors\');\nconst morgan = require(\'morgan\');\nconst mongoose = require(\'mongoose\');\n\nconst port = process.env.PORT || 8083;\n\nconst app = express();\n\napp.use(bodyParser.json());\napp.use(morgan());\napp.use(cors());\napp.use(\'/api\', require(\'./routes/api\'))\n\n\napp.listen(port, () => {\n  console.log(`Server is up in port : ` + port);\n})', function (err) {
      if (err) {
        throw err;
      }
    })

  } else {
    console.log('Error: File destination not found!\nTry: nem restapi --create app_name/routes/api.js')
  }

}

exports.apifunction = apifunction