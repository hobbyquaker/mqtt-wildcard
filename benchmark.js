#!/usr/bin/env node

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

const mw = require('./index.js');

suite.add('wildcard match +', function () {
    mw('test/test/test/test', 'test/+/test/+');
    mw('test/test/test/test', 'test/+/+/+');
    mw('test/test/test/test', 'test/+/+/test');
    mw('test/test/test/test', 'test/test/test/+');
}).add('wildcard mismatch +', function () {
    mw('test/test/test/test', 'test/+/muh/+');
    mw('test/test/test/test', 'test/+/+');
    mw('test/test/test/test', 'test/+/+/muh');
    mw('test/test/test/test', 'test/test/+');
}).add('wildcard match #', function () {
    mw('test/test/test/test', 'test/test/test/#');
    mw('test/test/test/test', 'test/test/#');
    mw('test/test/test/test', 'test/#');
    mw('test/test/test/test', '#');
}).add('wildcard mismatch #', function () {
    mw('test/test/test/test', 'test/test/muh/#');
    mw('test/test/test/test', 'test/muh/#');
    mw('test/test/test/test', 'muh/#');
    mw('test/test/test/test', 'muh/#');
}).add('wildcard match + #', function () {
    mw('test/test/test/test', 'test/+/test/#');
    mw('test/test/test/test', 'test/+/#');
    mw('test/test/test/test', 'test/+/+/#');
    mw('test/test/test/test', 'test/test/+/#');
}).add('wildcard mismatch + #', function () {
    mw('test/test/test/test', 'test/+/muh/#');
    mw('test/test/test/test', 'test/muh/+/#');
    mw('test/test/test/test', 'muh/+/#');
    mw('test/test/test/test', 'muh/+/#');
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