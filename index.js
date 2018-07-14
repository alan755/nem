#!/usr/bin/env node

'use strict'

const program = require('commander')
const inquirer = require('inquirer')
const fs = require('fs')

const exec = require('child_process').exec





let listfunction = () => {

  console.log('Welcome to nem!')
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
      name: 'body-parser'
    }, {
      name: 'cors'
    }, {
      name: 'mongoose'
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



    fs.writeFile('package.json', '{\n  "name": "' + answers.name + '",\n  "version": "' + answers.version + '",\n  "description": "' + answers.description + '",\n  "main":"index.js",\n  "scripts": {\n    "test":""\n  },\n  "repository": {\n    "type": "",\n    "url": ""\n  },\n  "keywords": {\n  },\n  "author": "' + answers.author + '",\n  "license": "' + answers.license + '",\n  "bugs": {\n    "url": ""\n  },\n  "homepage": "",\n  "dependencies": {\n  }\n}', function (err) {
      if (err) throw err;
      console.log('done!');
    })


    for (var i = 0; answers.dependencies[i] + '' != 'undefined'; i++) {
      console.log('yep')

      const cmd = 'npm install --save ' + answers.dependencies[i]
      let errfun = (error, stdout, stderr) => {
        if (error) console.log('exec error: ' + error)
        if (stdout) console.log(stdout)
        if (stderr) console.log('shell error: ' + stderr)
      }
      exec(cmd, errfun)
    }


  })




}

program
  .version('1.0.0')
  .description('Tool to automate structuring node, express and mongodb to create a crud app')
  .alias('v')

program
  .command('start')
  .description('To initialize..')
  .action(listfunction)

program.parse(process.argv)