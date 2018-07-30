const chalk = require('chalk')
const fs = require('fs')
const inquirer = require('inquirer')
const exec = require('child_process').exec

let initfunction = (args) => {

  console.log(chalk.redBright('\n${ nem }   |_(..)_/'))
  console.log(chalk.green('\nPlease answer the following :-'))

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
    message: 'Which version? (1.0.0) :'
  }, {
    name: 'license',
    type: 'input',
    message: 'Kindly specify the license (MIT) :'
  }, {
    name: 'api',
    type: 'list',
    message: 'Which among the following architecture do you choose :-',
    choices: ['RESTful API', 'GraphQL']
  }, {
    name: 'database',
    type: 'list',
    message: 'Which type of database :-',
    choices: ['MongoDB', 'MySQL']
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
      name: 'ejs'
    }, {
      name: 'express-session'
    }, {
      name: 'cokkies'
    }]
  }, {
    name: 'confirmation',
    type: 'confirm',
    message: 'Do you wish to continue :'
  }]).then((answers) => {

    const command = 'mkdir ' + answers.name
    let erfun = (error, stdout, stderr) => {
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
    exec(command, erfun)

    // package.json creation

    const cdd = 'cd ' + answers.name
    let errfun = (error, stdout, stderr) => {
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
    exec(cdd, errfun)

    fs.writeFile('./' + answers.name + '/package.json', '{\n  "name": "' + answers.name + '",\n  "version": "' + answers.version + '",\n  "description": "' + answers.description + '",\n  "main":"index.js",\n  "scripts": {\n    "test":""\n  },\n  "repository": {\n    "type": "",\n    "url": ""\n  },\n  "keywords": {\n  },\n  "author": "' + answers.author + '",\n  "license": "' + answers.license + '",\n  "bugs": {\n    "url": ""\n  },\n  "homepage": "",\n"devDependencies": {\n  },\n  "dependencies": {\n  }\n}', function (err) {
      if (err) {
        throw err;
      }
    })


    // Adding dependencies 
    console.log(chalk.redBright('\n${ Loading }  |_(..)_|'))
    setTimeout(() => {

      for (var i = 0; answers.dependencies[i] + '' != 'undefined'; i++) {

        const cmd = 'cd ' + answers.name + ' ; npm install --save ' + answers.dependencies[i]
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
        exec(cmd, errrfun)
      }

      if (answers.api + '' == 'GraphQL') {

        const cmdd = 'cd ' + answers.name + ' ; npm install --save graphql express-graphql'
        let errf = (error, stdout, stderr) => {
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
        exec(cmdd, errf)
      }

      if (answers.database + '' == 'MongoDB') {

        const cmdd = 'cd ' + answers.name + ' ; npm install --save mongodb'
        let errf = (error, stdout, stderr) => {
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
        exec(cmdd, errf)

      } else {

        const cmd = 'cd ' + answers.name + ' ; npm install --save sequelize mysql'
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
        exec(cmd, errrfun)
      }

    }, 1000)

    // creating nem.json
    fs.writeFile('./nem.json', '{\n  "projectname": "' + answers.name + '",\n\n  "name": "nem",\n  "version": "' + answers.version + '",\n  "author": "Alan Mathew",\n\n  "prompt": "Thanks for using nem __(..)_/ "\n}', function (err) {
      if (err) {
        throw err;
      }
    })
    // creating all directories

    const cdm = 'mkdir ./' + answers.name + '/routes ./' + answers.name + '/models ./' + answers.name + '/controller ./' + answers.name + '/config  ./' + answers.name + '/utils ./' + answers.name + '/services'
    let errfunction = (error, stdout, stderr) => {
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
    exec(cdm, errfunction)

    // creating server.js

    const com = 'cd ' + answers.name
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

    fs.writeFile('./' + answers.name + '/server.js', 'const express = require(\'express\');\nconst bodyParser = require(\'body-parser\');\nconst cors = require(\'cors\');\nconst morgan = require(\'morgan\');\nconst mongoose = require(\'mongoose\');\nconst db = require(\'./config/db.js\');\n\nconst port = process.env.PORT || 8083;\n\nconst app = express();\n\napp.use(bodyParser.json());\napp.use(morgan(\'dev\'));\napp.use(cors());\n\n\napp.listen(port, () => {\n  console.log(`Server is up in port : ` + port);\n})', function (err) {
      if (err) {
        throw err;
      }
    })

  })


}


exports.initfunction = initfunction