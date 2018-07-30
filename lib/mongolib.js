const exec = require('child_process').exec
const fs = require('fs')
const inquirer = require('inquirer')

let mongofunction = (args) => {


  if (args.file + '' != 'undefined') {

    inquirer.prompt([{
      name: 'db',
      type: 'input',
      message: 'Enter the url of mongodb database :'
    }]).then((answer) => {
      // creating db.js inside config

      var data = fs.readFileSync('nem.json')
      var jsondata = JSON.parse(data)

      const com = 'echo ./' + jsondata.projectname + '/config/db.js'
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

      fs.writeFile('./' + jsondata.projectname + '/config/db.js', 'module.exports = {\n  \'url\': "' + answer.db + '"\n};', function (err) {
        if (err) {
          throw err;
        } else {
          console.log('File created...!')
        }
      })

    })

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

    fs.writeFile('./' + args.file, 'const mongoose = require(\'mongoose\')\nconst Schema = mongoose.Schema\nconst userschema = new Schema({\n  name: {\n    type: String,\n    required: [true, \'Name is reequiered\']\n  }\n})\n\nconst user = mongoose.model(\'usermodel\', userschema)\nmodule.exports = user', function (err) {
      if (err) {
        throw err;
      } else {
        //console.log('File created...!')
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

    fs.writeFile('./' + jsondata.projectname + '/server.js', 'const express = require(\'express\');\nconst bodyParser = require(\'body-parser\');\nconst cors = require(\'cors\');\nconst morgan = require(\'morgan\');\nconst mongoose = require(\'mongoose\');\nconst db = require(\'./config/db.js\');\n\nconst port = process.env.PORT || 8083;\n\nconst app = express();\n\napp.use(bodyParser.json());\napp.use(morgan(\'dev\'));\napp.use(cors());\n\nmongoose.connect(\'mongodb://localhost/persongo\')\nmongoose.Promsie = global.Promise\n\n\napp.listen(port, () => {\n  console.log(`Server is up in port : ` + port);\n})', function (err) {
      if (err) {
        throw err;
      }
    })

  } else {
    console.log('Error: File destination not found\nTry: nem mongodb --create app_name/models/user.js')
  }

}

exports.mongofunction = mongofunction