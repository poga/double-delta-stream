var tape = require('tape')
var dd = require('.')
var Readable = require('stream').Readable
var collect = require('collect-stream')

tape('test', function (t) {
  var s = dd(
    function (x) { return parseInt(x, 10) },
    function (a, b) { return b - a }
  )

  var source = new Readable()
  source.push('0')
  source.push('100')
  source.push('201')
  source.push('299')
  source.push('400')
  source.push(null)
  source.pipe(s)

  collect(s, function (err, data) {
    t.error(err)
    t.deepEqual(data, [{header: 0}, {d0: 100}, {d1: 1}, {d1: -2}, {d1: 1}])
    t.end()
  })
})
