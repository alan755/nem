#!/usr/bin/env node

'use strict'
const program = require('commander')

const init = require('./lib/initlib.js')
const api = require('./lib/apilib.js')
const graph = require('./lib/graphlib.js')
const mongo = require('./lib/mongolib.js')
const sql = require('./lib/sqllib.js')


// init 
let initcommand = init.initfunction
// api 
let apicommand = api.apifunction
// graphql
let graphqlcommand = graph.graphqlfunction
// mongodb
let mongocommand = mongo.mongofunction
// mysql
let sqlcommand = sql.sqlfunction

program
  .version('1.0.0', '-v, --version')
  .description('Tool to automate structuring node, express and mongodb to create a crud app')

program
  .command('init')
  .description('To initialize the app.')
  .action(initcommand)

program
  .command('restapi ')
  .option('-f, --file <file>', 'file name')
  .description('To add RESTful API functionlity.')
  .action(apicommand)

program
  .command('mongodb')
  .option('-f, --file <file>', 'file name')
  .description('To add MogoDB,database functionality.')
  .action(mongocommand)

program
  .command('graphql')
  .option('-f, --file <file>', 'file name')
  .description('To add GraphQL functionality.')
  .action(graphqlcommand)

program
  .command('sql')
  .option('-f, --file <file>', 'file name')
  .description('To add mySQL, database functionality.')
  .action(sqlcommand)

program.parse(process.argv)