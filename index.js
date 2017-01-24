var through2 = require('through2')

module.exports = function (parseFunc, deltaFunc) {
  var v
  var d
  return through2.obj(function (value, enc, cb) {
    value = parseFunc(value)
    if (v === undefined) {
      this.push({header: value})
      v = value
      return cb()
    }

    if (d === undefined) {
      d = deltaFunc(v, value)
      v = value
      this.push({d0: d})
      return cb()
    }

    var d0 = deltaFunc(v, value)
    this.push({d1: deltaFunc(d, d0)})
    v = value
    return cb()
  })
}
