#!usr/bin/env node
'use strict'

const program = require('commander')
const exec = require('child_process').exec

let firstfun = () => {
  const cmd
  let firsterr = (err, stdout, stderr) => {
    if (err) {
      console.log(err)    
    }
    if (stdout) {
      console.log(stdout)    
    }    
    if(stderr) {
      console.log(stderr)    
    }
  }    
  exec(cmd, firsterr)
}



program
  .version('1.0.0')
  .description('Tool to automate structuring of  node, express and mongodb, to create a CRUD app.')

program
  .command()
  .option()
  .action(firstfun)


program.parse(process.argv)  