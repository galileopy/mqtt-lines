const mqtt = require('async-mqtt')
const { forEach } = require('ramda')
module.exports = (host, options, log) => {

  const client = mqtt.connect(host, options)

  client.on('connect', function () {
    log("connected")
  })

  client.on('error', function (error) {
    log("Error")
    log(error)
  })
  client.on('offline', function () {
    log('Server offline')
  })

  client.on('reconnect', function () {
    log("Reconecting")
  })

  client.on('close', function () {
    log('Connection terminated by server')
    process.exit(0)
  })
  return client

}
