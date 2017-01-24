# double-delta-stream

Calculate double-delta for incoming data. Useful for compressing time-series data.

`npm i double-delta-stream`

## Usage

```js
var dd = require('double-delta-stream')
var collect = require('collect-stream')

var s = dd(
  function (x) { return parseInt(x, 10) }, // how to parse incoming data
  function (a, b) { return b - a } // how to calculate delta between data
)

// create a source stream
var source = new Readable()
source.push('0')
source.push('100')
source.push('201')
source.push('299')
source.push('400')
source.push(null)

// pipe into dd
source.pipe(s)

collect(s, function (err, data) {
  // data == [{header: 0}, {d0: 100}, {d1: 1}, {d1: -2}, {d1: 1}])
})
```

## License

The MIT License
