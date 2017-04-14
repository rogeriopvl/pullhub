const test = require('tape')
const path = require('path')
const concat = require('concat-stream')
const spawn = require('child_process').spawn
const meta = require('../package.json')

const binPath = path.join(__dirname, '..', 'bin', 'pullhub')

function runBin (params, cb) {
  const proc = spawn(binPath, params)
  proc.stdout.pipe(concat((output) => {
    const o = output.toString('utf8')

    proc.on('close', (code) => {
      return cb(null, o, code)
    })
  }))
}

test('calling with --help returns usage and 0 status code', (t) => {
  t.plan(3)
  runBin(['--help'], (err, output, code) => {
    t.notOk(err)
    t.ok(output.indexOf('pullhub <repos>') !== -1)
    t.equals(code, 0)
  })
})

test('calling with --version returns version info and 0 status code', (t) => {
  t.plan(3)
  runBin(['--version'], (err, output, code) => {
    t.notOk(err)
    t.equals(output, meta.name + ' version ' + meta.version + '\n')
    t.equals(code, 0)
  })
})

test('calling without args should return usage and error status code', (t) => {
  t.plan(3)
  runBin([], (err, output, code) => {
    t.notOk(err)
    t.ok(output.indexOf('pullhub <repos>') !== -1)
    t.ok(code !== 0)
  })
})
