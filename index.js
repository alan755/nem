#!/usr/bin/env node

'use strict'

const program = require('commander')
const inquirer = require('inquirer')

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
  }]).then((answers) => {
    console.log(answers.author)
    /*
        const cmd
        let errfun = (error, stdout, stderr) => {
          if (error) console.log('exec error: ' + error)
          if (stdout) console.log(stdout)
          if (stderr) console.log('shell error: ' + stderr)
        }
        exec(cmd, errfun)*/

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