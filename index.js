#!/usr/bin/env node

'use strict'

const program = require('commander')
const inquirer = require('inquirer')
const fs = require('fs')

const exec = require('child_process').exec // to execute

let initfunction = () => {


  console.log('\n${nem}  \\_(. .)_/')
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
    console.log('\n${Loading} |_(..)_|\n\n')
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
    fs.writeFile('./nem.json', '{\n  "name": "' + answers.name + '"\n}', function (err) {
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

// RESTful API

let apifunction = (args) => {


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

    const com = 'cd ' + jsondata.name
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

    fs.writeFile('./' + jsondata.name + '/server.js', 'const express = require(\'express\');\nconst bodyParser = require(\'body-parser\');\nconst cors = require(\'cors\');\nconst morgan = require(\'morgan\');\nconst mongoose = require(\'mongoose\');\n\nconst port = process.env.PORT || 8083;\n\nconst app = express();\n\napp.use(bodyParser.json());\napp.use(morgan());\napp.use(cors());\napp.use(\'/api\', require(\'./routes/api\'))\n\n\napp.listen(port, () => {\n  console.log(`Server is up in port : ` + port);\n})', function (err) {
      if (err) {
        throw err;
      }
    })

  } else {
    console.log('Error: File destination not found!\nTry: nem restapi --create app_name/routes/api.js')
  }

}

// MongoDB

let mongodbfunction = (args) => {

  if (args.file + '' != 'undefined') {

    inquirer.prompt([{
      name: 'db',
      type: 'input',
      message: 'Enter the url of mongodb database :'
    }]).then((answer) => {
      // creating db.js inside config

      var data = fs.readFileSync('nem.json')
      var jsondata = JSON.parse(data)

      const com = 'echo ./' + jsondata.name + '/config/db.js'
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

      fs.writeFile('./' + jsondata.name + '/config/db.js', 'module.exports = {\n  \'url\': "' + answer.db + '"\n};', function (err) {
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

    const com = 'cd ' + jsondata.name
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

    fs.writeFile('./' + jsondata.name + '/server.js', 'const express = require(\'express\');\nconst bodyParser = require(\'body-parser\');\nconst cors = require(\'cors\');\nconst morgan = require(\'morgan\');\nconst mongoose = require(\'mongoose\');\nconst db = require(\'./config/db.js\');\n\nconst port = process.env.PORT || 8083;\n\nconst app = express();\n\napp.use(bodyParser.json());\napp.use(morgan(\'dev\'));\napp.use(cors());\n\nmongoose.connect(\'mongodb://localhost/persongo\')\nmongoose.Promsie = global.Promise\n\n\napp.listen(port, () => {\n  console.log(`Server is up in port : ` + port);\n})', function (err) {
      if (err) {
        throw err;
      }
    })

  } else {
    console.log('Error: File destination not found\nTry: nem mongodb --create app_name/models/user.js')
  }

}

// GraphQL

let graphqlfunction = (args) => {

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

    fs.writeFile('./' + args.file, 'const {\n  GraphQLObjectType,\n  GraphQLString,\n  GraphQLInt,\n  GraphQLSchema,\n  GraphQLList,\n  GraphQLNonNull\n  GraphQLID\n} = require(\'graphql\')\n\nconst userType = new GraphQLObjectType({\n  name: \'user\',\n  fields: () => ({\n    id: {\n      type: GraphQLString\n    },\n    name: {\n      type: GraphQLString\n    },\n  })\n});\n\nconst RootQuery = new GraphQLObjectType({\n  name: \'RootQueryType\',\n  fields: {\n    user: {\n      type: userType,\n      args: {\n        id: {\n          type: GraphQLString\n        }\n      },\n      resolve(parentValue, args) {\n\n      }\n    }\n});\n\nconst mutation = new GraphQLObjectType({\n  name: \'mutation\',\n  fields: {\n    adduser: {\n      type: userType,\n      args: {\n        id: {\n          type: new GraphQLNonNull(GraphQLID)\n        }\n        name: {\n          type: new GraphQLNonNull(GraphQLString)\n        }\n        },\n      resolve(parentValue, args) {\n\n      }\n    },\n    deleteuser: {\n      type: userType,\n      args: {\n        id: {\n          type: new GraphQLNonNull(GraphQLID)\n        }\n      },\n      resolve(parentValue, args) {\n      }\n    },\n    updateuser: {\n      type: userType,\n    args: {\n        id: {\n          type: GraphQLString\n        },\n        name: {\n          type: GraphQLString\n        }\n      },\n      resolve(parentValue, args) {\n\n      }\n    }\n  }\n});\n\nmodule.exports = new GraphQLSchema({\n  query: RootQuery,\n  mutation\n})', function (err) {
      if (err) {
        throw err;
      } else {
        console.log('File created...!')
      }

    })

    // updating server.js
    var data = fs.readFileSync('nem.json')
    var jsondata = JSON.parse(data)

    const com = 'cd ' + jsondata.name
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

    fs.writeFile('./' + jsondata.name + '/server.js', 'const express = require(\'express\');\nconst bodyParser = require(\'body-parser\');\nconst cors = require(\'cors\');\nconst morgan = require(\'morgan\');\nconst mongoose = require(\'mongoose\');\nconst db = require(\'./config/db.js\');\n\nconst port = process.env.PORT || 8083;\n\nconst app = express();\n\napp.use(bodyParser.json());\napp.use(morgan(\'dev\'));\napp.use(cors());\n\nmongoose.connect(\'mongodb://localhost/persongo\')\nmongoose.Promsie = global.Promise\n\napp.use(\'/graphiql\', expressGraphQL({\n  schema,\n  graphiql: true\n}))\n\n\napp.listen(port, () => {\n  console.log(`Server is up in port : ` + port);\n})', function (err) {
      if (err) {
        throw err;
      }
    })

  } else {
    console.log('Error: File destination not found\nTry: nem graphql --create app_name/routes/graphapi.js')
  }

}

// MySQL

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

program
  .version('1.0.0', '-v, --version')
  .description('Tool to automate structuring node, express and mongodb to create a crud app')

program
  .command('init')
  .description('To initialize the app.')
  .action(initfunction)

program
  .command('restapi ')
  .option('-f, --file <file>', 'file name')
  .description('To add RESTful API functionlity.')
  .action(apifunction)

program
  .command('mongodb')
  .option('-f, --file <file>', 'file name')
  .description('To add MogoDB,database functionality.')
  .action(mongodbfunction)

program
  .command('graphql')
  .option('-f, --file <file>', 'file name')
  .description('To add GraphQL functionality.')
  .action(graphqlfunction)

program
  .command('sql')
  .option('-f, --file <file>', 'file name')
  .description('To add mySQL, database functionality.')
  .action(sqlfunction)

program.parse(process.argv)