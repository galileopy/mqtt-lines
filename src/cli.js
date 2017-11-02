const commandLineArgs = require('command-line-args')

const optionList = [ {
    name: 'topic',
    alias: 't',
    type: String,
    multiple: true,
    description: 'MQTT topics, [bold]{mandatory}, --topic ONE TWO or --topic=ONE --topic=TWO'
  },{
    name: 'file',
    alias: 'f',
    type: String,
    description: 'Message file, [bold]{mandatory}, each message must be delimited by a new line'
  },{
    name: 'host',
    alias: 'h',
    type: String,
    description: 'MQTT host, defaults to mqtt://127.0.0.1',
    defaultValue: 'mqtt://127.0.0.1'
  },{
    name: 'username',
    alias: 'u',
    type: String,
    description: 'MQTT username, optional',
  },{
    name: 'password',
    alias: 'P',
    type: String,
    description: 'MQTT password, optional',
  },{
    name: 'port',
    alias: 'p',
    type: Number,
    description: 'MQTT port, defaults to 1883',
    defaultValue: 1883
  },{
    name: 'interval',
    alias: 'i',
    type: Number,
    description: 'Wait i milliseconds between publishing, defaults to 500ms',
    defaultValue: 500
  },{
    name: 'qos',
    alias: 'q',
    type: Number,
    description: 'MQTT QoS value for each message, defaults to 0',
    defaultValue: 0
  },{
    name: 'retain',
    alias: 'r',
    type: Boolean,
    description: 'If set, will send messages with the retain flag "on"',
  },{
    name: 'verbose',
    alias: 'v',
    type: Boolean,
    description: 'Shows verbose output'
 }
]

const getUsage = require('command-line-usage')

const sections = [
  {
    header: 'MQTT-line, v0.0.1',
    content: 'Publishes a file line by line to one or more mqtt topics -t, making sure just one line is sent every -i milliseconds'
  },
  {
    header: 'Options',
    optionList
  },{
    content: 'Project home: [underline]{https://github.com/galileopy/mqtt-lines}'
  }]

module.exports = {
  usage: getUsage(sections),
  options: commandLineArgs(optionList)
}
