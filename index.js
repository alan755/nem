#!/usr/bin/env node

'use strict'

const program = require('commander')
const inquirer = require('inquirer')
const fs = require('fs')

const exec = require('child_process').exec // to execute commands

let listfunction = () => {

  // questions
  console.log('\n---------------{ nem }---------------\n')
  inquirer.prompt([{
    name: 'name',
    type: 'input',
    message: 'Tell me the name of your project :'
  }, {
    name: 'description',
    type: 'input',
    message: 'A short description :'
  }, {
    name: 'author',
    type: 'input',
    message: 'So who is the author? :'
  }, {
    name: 'version',
    type: 'input',
    message: 'Which version? :'
  }, {
    name: 'license',
    type: 'input',
    message: 'Can you please specify the license :'
  }, {
    name: 'dependencies',
    type: 'checkbox',
    message: 'Which all dependencies do you need : ',
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
    message: 'Specify the dev dependencies',
    choices: [{
      name: 'nodemon'
    }]
  }, {
    name: 'confirmation',
    type: 'confirm',
    message: 'Do you wish to continue'
  }]).then((answers) => {


    // package.json creation
    fs.writeFile('package.json', '{\n  "name": "' + answers.name + '",\n  "version": "' + answers.version + '",\n  "description": "' + answers.description + '",\n  "main":"index.js",\n  "scripts": {\n    "test":""\n  },\n  "repository": {\n    "type": "",\n    "url": ""\n  },\n  "keywords": {\n  },\n  "author": "' + answers.author + '",\n  "license": "' + answers.license + '",\n  "bugs": {\n    "url": ""\n  },\n  "homepage": "",\n  "dependencies": {\n  }\n}', function (err) {
      if (err) throw err;
    })

    // Adding dependencies
    console.log('\n---------------{ nem }---------------\n')
    for (var i = 0; answers.dependencies[i] + '' != 'undefined'; i++) {

      const cmd = 'sudo npm install --save ' + answers.dependencies[i]
      let errfun = (error, stdout, stderr) => {
        if (error) console.log('exec error: ' + error)
        if (stdout) console.log(stdout)
        //if (stderr) console.log('shell error: ' + stderr)
      }
      exec(cmd, errfun)
    }
    const cmd = 'mkdir routes models controller config utils services'
    let errfun = (error, stdout, stderr) => {
      if (error) console.log('exec error: ' + error)
      if (stdout) console.log(stdout)
      //if (stderr) console.log('shell error: ' + stderr)
    }
    exec(cmd, errfun)

    // creating server.js
    fs.writeFile('server.js', 'const express = require(\'express\');\nconst bodyParser = require(\'body-parser\');\nconst cors = require(\'cors\');\nconst morgan = require(\'morgan\');\nconst mongoose = require(\'mongoose\');\nconst db = require(\'./config/db.js\');\n\nconst port = process.env.PORT || 8083;\n\nconst app = express();\n\napp.use(bodyParser.json());\napp.use(morgan(\'dev\'));\napp.use(cors());\n\nmongoose.connect(db.url);\n\nrequire(\'./routes/index.js\')(app);\n\napp.listen(port);\nconsole.log(`Server Running on Port: ${port}`);', function (err) {
      if (err) throw err;
    })

    /*
    // creating api.js in routes directory
    const cmd = 'cd routes'
    let errfun = (error, stdout, stderr) => {
      if (error) console.log('exec error: ' + error)
      if (stdout) console.log(stdout)
    }
    exec(cmd, errfun)

    // creating schema in models directory
    const cmd = 'cd ..'
    let errfun = (error, stdout, stderr) => {
      if (error) console.log('exec error: ' + error)
      if (stdout) console.log(stdout)
    }
    exec(cmd, errfun)
    */

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