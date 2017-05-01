const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

const mw = require('./index.js');

suite.add('mqtt-wildcard + # ', function() {
    mw('test/test/test/test', 'test/+/test/#');

}).add('mqtt-wildcard equal ', function() {
    mw('test/test/test/test', 'test/test/test/test');
})



// add listeners
.on('cycle', function(event) {
    console.log(String(event.target));
})
.on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });