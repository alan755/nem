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
      name: 'nodemon',
      checked: true
    }]
  }, {
    name: 'confirmation',
    type: 'confirm',
    message: 'Do you wish to continue :'
  }]).then((answers) => {

    const command = 'mkdir ' + answers.name
    let erfun = (error, stdout, stderr) => {
      if (error) console.log('exec error: ' + error)
      if (stdout) console.log(stdout)
      //if (stderr) console.log('shell error: ' + stderr)
    }
    exec(command, erfun)

    const cdd = 'cd ' + answers.name
    let errfun = (error, stdout, stderr) => {
      if (error) console.log('exec error: ' + error)
      if (stdout) console.log(stdout)
      //if (stderr) console.log('shell error: ' + stderr)
    }
    exec(cdd, errfun)


    // package.json creation
    fs.writeFile('./' + answers.name + '/package.json', '{\n  "name": "' + answers.name + '",\n  "version": "' + answers.version + '",\n  "description": "' + answers.description + '",\n  "main":"index.js",\n  "scripts": {\n    "test":""\n  },\n  "repository": {\n    "type": "",\n    "url": ""\n  },\n  "keywords": {\n  },\n  "author": "' + answers.author + '",\n  "license": "' + answers.license + '",\n  "bugs": {\n    "url": ""\n  },\n  "homepage": "",\n"devDependencies": {\n  },\n  "dependencies": {\n  }\n}', function (err) {
      if (err) throw err;
    })


    // Adding dependencies
    setTimeout(() => {

      for (var i = 0; answers.dependencies[i] + '' != 'undefined'; i++) {

        const cmd = 'cd ' + answers.name + ' ; npm install --save ' + answers.dependencies[i]
        let errrfun = (error, stdout, stderr) => {
          if (error) console.log('exec error: ' + error)
          if (stdout) console.log(stdout)
          //if (stderr) console.log('shell error: ' + stderr)
        }
        exec(cmd, errrfun)
      }
    }, 1000)

    //console.log('\nEnter your password :-\n')
    // Adding dev dependencies

    const cmdd = 'cd ' + answers.name + ' ; sudo npm install -g nodemon'
    let errf = (error, stdout, stderr) => {
      if (error) console.log('exec error: ' + error)
      if (stdout) console.log(stdout)
      //if (stderr) console.log('shell error: ' + stderr)
    }
    exec(cmdd, errf)




    // creating all directories
    const cdm = 'mkdir ./' + answers.name + '/routes ./' + answers.name + '/models ./' + answers.name + '/controller ./' + answers.name + '/config  ./' + answers.name + '/utils ./' + answers.name + '/services'
    let errfunction = (error, stdout, stderr) => {
      if (error) console.log('exec error: ' + error)
      if (stdout) console.log(stdout)
      //if (stderr) console.log('shell error: ' + stderr)
    }
    exec(cdm, errfunction)

    // creating server.js

    const com = 'cd ' + answers.name
    let errrfun = (error, stdout, stderr) => {
      if (error) console.log('exec error: ' + error)
      if (stdout) console.log(stdout)
      //if (stderr) console.log('shell error: ' + stderr)
    }
    exec(com, errrfun)

    fs.writeFile('./' + answers.name + '/server.js', 'const express = require(\'express\');\nconst bodyParser = require(\'body-parser\');\nconst cors = require(\'cors\');\nconst morgan = require(\'morgan\');\nconst mongoose = require(\'mongoose\');\nconst db = require(\'./config/db.js\');\n\nconst port = process.env.PORT || 8083;\n\nconst app = express();\n\napp.use(bodyParser.json());\napp.use(morgan(\'dev\'));\napp.use(cors());\n\nmongoose.connect(db.url);\n\n\napp.listen(port, () => {\n  console.log(`Server is up in port : ` + port);\n})', function (err) {
      if (err) throw err;
    })





  })


}

program
  .version('1.0.0')
  .description('Tool to automate structuring node, express and mongodb to create a crud app')
  .alias('v')

// nem start  
program
  .command('init')
  .description('To initialize..')
  .action(listfunction)

program.parse(process.argv)