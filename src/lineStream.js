const readline = require('readline');
const Bacon = require('baconjs')
const fs = require('fs-extra')
const { identity, complement } = require('ramda')

const lineReaderToBacon = (readable) => {

  return Bacon.fromBinder(function(sink) {
    readable.on('line', sink)
    readable.on('error', (err)=> sink(new Bacon.Error(err)))
    readable.on('close', ()=> sink(new Bacon.End()))
    return function() {

    }
  })
}

module.exports = (filename, interval) => {

  const exists  = Bacon.fromPromise(fs.pathExists(filename))
  const noFile = exists.filter(complement(identity))
  const yesFile = exists.filter(identity).delay(100)


  const lineStream = yesFile
    .map(()=> fs.createReadStream(filename))
    .map(input=> readline.createInterface({ input }))

  const lines = lineStream
    .flatMap(lineReaderToBacon)
    .bufferingThrottle(interval)


  return {
    noFile,
    lines
  }
}
