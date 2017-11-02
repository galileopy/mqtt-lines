const chalk = require('chalk');
const { map, mergeAll, pick } = require('ramda')
const Bacon = require('baconjs')
const { usage, options } = require('./cli')
const lineStream  = require('./lineStream')
const mqtt = require('./mqtt')



const error = chalk.bold.red;
const warning = chalk.bold;

module.exports = () => {
  const log = (text) => {
    if (options.verbose) console.log(text)
    return
  }

  if(!options.topic){
    console.log(error('Topic was not defined, terminating'))
    console.log(usage)
    process.exit(1)
    return 1
  }

  if(!options.file){
    console.log(usage)
    console.log(error('File was not defined, terminating'))
    process.exit(1)
    return 1
  }

  if(!!options.username && !options.password){
    console.log(usage)
    console.log(error('Username was defined but password was not, terminating'))
    process.exit(1)
    return 1
  }

  if(!!options.password && !options.username){
    console.log(usage)
    console.log(error('Password was defined but username was not, terminating'))
    process.exit(1)
    return 1
  }

  if(!options.username){
    log(warning('No username defined, attempting anonymous connections'))
  }

  const credentials = pick(['username', 'password'], options)

  const host = options.host +":"+options.port
  const client = mqtt(host, credentials, log)

  const {noFile, lines } = lineStream(options.file, options.interval)

  noFile.onValue(function () {
    console.log(error('File does not exists'))
    process.exit(1)
  })

  lines.map((line)=>{
    return map((topic)=>{
      log(`${topic}:  ${line}` )
      return client.publish(topic, line, pick(['retain', 'qos'], options))
    }, options.topic)
  })
  .map((arr) => Promise.all(arr)) // wait for all the publications
  .flatMap(Bacon.fromPromise) // wait for the last one to resolve
  .onEnd(()=> {
    log('All lines sent succesfully')
    log('Bye!!!')
    process.exit(0)
  })

}
