#!/usr/bin/env node

'use strict'

const program = require('commander')
const inquirer = require('inquirer')
const fs = require('fs')

const exec = require('child_process').exec // to execute commands

let listfunction = () => {

  // questions
  console.log('\n-{ N E M }- Node-Express-MongoDb -')
  console.log('\nPlease answer the following :-\n')
  inquirer.prompt([{
    name: 'name',
    type: 'input',
    message: 'What is the name of your project? :'
  }, {
    name: 'description',
    type: 'input',
    message: 'A short description :'
  }, {
    name: 'author',
    type: 'input',
    message: 'Name the author :'
  }, {
    name: 'version',
    type: 'input',
    message: 'Which version? :'
  }, {
    name: 'license',
    type: 'input',
    message: 'Kindly specify the license (MIT) :'
  }, {
    name: 'dependencies',
    type: 'checkbox',
    message: 'Which all dependencies do you need :-',
    choices: [{
      name: 'express',
      checked: true
    }, {
      name: 'body-parser',
      checked: true
    }, {
      name: 'cors',
      checked: true
    }, {
      name: 'mongoose',
      checked: true
    }, {
      name: 'ejs'
    }, {
      name: 'express-session'
    }, {
      name: 'cokkies'
    }]
  }, {
    name: 'devdependencies',
    type: 'checkbox',
    message: 'Specify the dev dependencies :-',
    choices: [{
      name: 'nodemon'
    }]
  }, {
    name: 'confirmation',
    type: 'confirm',
    message: 'Do you wish to continue :'
  }]).then((answers) => {


    // package.json creation
    fs.writeFile('package.json', '{\n  "name": "' + answers.name + '",\n  "version": "' + answers.version + '",\n  "description": "' + answers.description + '",\n  "main":"index.js",\n  "scripts": {\n    "test":""\n  },\n  "repository": {\n    "type": "",\n    "url": ""\n  },\n  "keywords": {\n  },\n  "author": "' + answers.author + '",\n  "license": "' + answers.license + '",\n  "bugs": {\n    "url": ""\n  },\n  "homepage": "",\n  "dependencies": {\n  }\n}', function (err) {
      if (err) throw err;
    })

    // Adding dependencies
    console.log('\nEnter your password to install dependencies :-\n')

    for (var i = 0; answers.dependencies[i] + '' != 'undefined'; i++) {

      const cmd = 'sudo npm install --save ' + answers.dependencies[i]
      let errfun = (error, stdout, stderr) => {
        if (error) console.log('exec error: ' + error)
        if (stdout) console.log(stdout)
        //if (stderr) console.log('shell error: ' + stderr)
      }
      exec(cmd, errfun)
    }


    // creating all directories
    const cmd = 'mkdir routes models controller config utils services'
    let errfun = (error, stdout, stderr) => {
      if (error) console.log('exec error: ' + error)
      if (stdout) console.log(stdout)
      //if (stderr) console.log('shell error: ' + stderr)
    }
    exec(cmd, errfun)

    // creating server.js
    fs.writeFile('server.js', 'const express = require(\'express\');\nconst bodyParser = require(\'body-parser\');\nconst cors = require(\'cors\');\nconst morgan = require(\'morgan\');\nconst mongoose = require(\'mongoose\');\nconst db = require(\'./config/db.js\');\n\nconst port = process.env.PORT || 8083;\n\nconst app = express();\n\napp.use(bodyParser.json());\napp.use(morgan(\'dev\'));\napp.use(cors());\n\nmongoose.connect(db.url);\n\n\napp.listen(port, () => {\n  console.log(`Server is up in port : ` + port);\n})', function (err) {
      if (err) throw err;
    })


    // creating api.js in routes directory

    const cm = 'cd routes'
    let errorfun = (error, stdout, stderr) => {
      if (error) console.log('exec error: ' + error)
      if (stdout) console.log(stdout)
      //if (stderr) console.log('shell error: ' + stderr)
    }
    exec(cm, errorfun)

    fs.writeFile('./routes/api.js', 'const express = require(\'express\')\nconst Person = require(\'../models/person\')\n\nvar app = express()\n\napp.get(\'/person\', (req, res, next) => {\n  res.send({name: \'GET\'})\n})\n\napp.post(\'/person\', (req, res,next) => {\n  res.send({name: \'POST\'})\n})\n\napp.put(\'/person/:id\', (req, res, next) => {\n  res.send({name: \'PUT\'})\n})\n\napp.delete(\'/person/:id\', (req, res, next) => {\n  res.send({name: \'DELETE\'})\n})\n\nmodule.exports = router', (err) => {
      if (err) {
        throw err
      }
    })

    // creating schema in models directory
    const cmm = 'cd ..'
    let errrfunction = (error, stdout, stderr) => {
      if (error) console.log('exec error: ' + error)
      if (stdout) console.log(stdout)
      //if (stderr) console.log('shell error: ' + stderr)
    }
    exec(cmm, errrfunction)

    const cmdd = 'cd models'
    let errorfunction = (error, stdout, stderr) => {
      if (error) console.log('exec error: ' + error)
      if (stdout) console.log(stdout)
      //if (stderr) console.log('shell error: ' + stderr)
    }
    exec(cmdd, errorfunction)

    fs.writeFile('./models/user.js', 'const mongoose = require(\'mongoose\')\nconst Schema = mongoose.Schema\nconst userschema = new Schema({\n  name: {\n    type: String,\nrequired: [true, \'Name is reequiered\']\n  }\n})\n\nconst user = mongoose.model(\'usermodel\', userschema)\nmodule.exports = user', (err) => {
      if (err) {
        throw err
      }
    })

    // creating db.js in config
    const cdm = 'cd ..'
    let errorfn = (error, stdout, stderr) => {
      if (error) console.log('exec error: ' + error)
      if (stdout) console.log(stdout)
      //if (stderr) console.log('shell error: ' + stderr)
    }
    exec(cdm, errorfn)


    const cdd = 'cd config'
    let errorfunct = (error, stdout, stderr) => {
      if (error) console.log('exec error: ' + error)
      if (stdout) console.log(stdout)
      //if (stderr) console.log('shell error: ' + stderr)
    }
    exec(cdd, errorfunct)

    fs.writeFile('./config/db.js', 'module.exports = {\n  \'url\': "mongodb://ajojohn:ajojohn123@ds219641.mlab.com:19641/justblog"\n};', (err) => {
      if (err) {
        throw err
      }
    })


  })


}

program
  .version('1.0.0')
  .description('Tool to automate structuring node, express and mongodb to create a crud app')
  .alias('v')

// nem start  
program
  .command('start')
  .description('To initialize..')
  .action(listfunction)

program.parse(process.argv)