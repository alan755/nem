const fs = require('fs')
const exec = require('child_process').exec

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

    fs.writeFile('./' + jsondata.projectname + '/server.js', 'const express = require(\'express\');\nconst bodyParser = require(\'body-parser\');\nconst cors = require(\'cors\');\nconst morgan = require(\'morgan\');\nconst mongoose = require(\'mongoose\');\nconst db = require(\'./config/db.js\');\n\nconst port = process.env.PORT || 8083;\n\nconst app = express();\n\napp.use(bodyParser.json());\napp.use(morgan(\'dev\'));\napp.use(cors());\n\nmongoose.connect(\'mongodb://localhost/persongo\')\nmongoose.Promsie = global.Promise\n\napp.use(\'/graphiql\', expressGraphQL({\n  schema,\n  graphiql: true\n}))\n\n\napp.listen(port, () => {\n  console.log(`Server is up in port : ` + port);\n})', function (err) {
      if (err) {
        throw err;
      }
    })

  } else {
    console.log('Error: File destination not found\nTry: nem graphql --create app_name/routes/graphapi.js')
  }

}

exports.graphqlfunction = graphqlfunction