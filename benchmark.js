#!/usr/bin/env node

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

const mw = require('./index.js');
const mw2 = require('./index-old.js');

suite.add('new wildcard match', function () {
    mw('test/test/test/test', 'test/test/test/test');
}).add('old wildcard match', function () {
    mw2('test/test/test/test', 'test/test/test/test');
}).add('new wildcard match +', function () {
    mw('test/test/test/test', 'test/+/test/+');
    mw('test/test/test/test', 'test/+/+/+');
    mw('test/test/test/test', 'test/+/+/test');
    mw('test/test/test/test', 'test/test/test/+');
}).add('old wildcard match +', function () {
    mw2('test/test/test/test', 'test/+/test/+');
    mw2('test/test/test/test', 'test/+/+/+');
    mw2('test/test/test/test', 'test/+/+/test');
    mw2('test/test/test/test', 'test/test/test/+');
}).add('new wildcard mismatch +', function () {
    mw('test/test/test/test', 'test/+/muh/+');
    mw('test/test/test/test', 'test/+/+');
    mw('test/test/test/test', 'test/+/+/muh');
    mw('test/test/test/test', 'test/test/+');
}).add('old wildcard mismatch +', function () {
    mw2('test/test/test/test', 'test/+/muh/+');
    mw2('test/test/test/test', 'test/+/+');
    mw2('test/test/test/test', 'test/+/+/muh');
    mw2('test/test/test/test', 'test/test/+');
}).add('new wildcard match #', function () {
    mw('test/test/test/test', 'test/test/test/#');
    mw('test/test/test/test', 'test/test/#');
    mw('test/test/test/test', 'test/#');
    mw('test/test/test/test', '#');
}).add('old wildcard match #', function () {
    mw2('test/test/test/test', 'test/test/test/#');
    mw2('test/test/test/test', 'test/test/#');
    mw2('test/test/test/test', 'test/#');
    mw2('test/test/test/test', '#');
}).add('new wildcard mismatch #', function () {
    mw('test/test/test/test', 'test/test/muh/#');
    mw('test/test/test/test', 'test/muh/#');
    mw('test/test/test/test', 'muh/#');
    mw('test/test/test/test', 'muh/#');
}).add('old wildcard mismatch #', function () {
    mw2('test/test/test/test', 'test/test/muh/#');
    mw2('test/test/test/test', 'test/muh/#');
    mw2('test/test/test/test', 'muh/#');
    mw2('test/test/test/test', 'muh/#');
}).add('new wildcard match + #', function () {
    mw('test/test/test/test', 'test/+/test/#');
    mw('test/test/test/test', 'test/+/#');
    mw('test/test/test/test', 'test/+/+/#');
    mw('test/test/test/test', 'test/test/+/#');
}).add('old wildcard match + #', function () {
    mw2('test/test/test/test', 'test/+/test/#');
    mw2('test/test/test/test', 'test/+/#');
    mw2('test/test/test/test', 'test/+/+/#');
    mw2('test/test/test/test', 'test/test/+/#');
}).add('new wildcard mismatch + #', function () {
    mw('test/test/test/test', 'test/+/muh/#');
    mw('test/test/test/test', 'test/muh/+/#');
    mw('test/test/test/test', 'muh/+/#');
    mw('test/test/test/test', 'muh/+/#');
}).add('old wildcard mismatch + #', function () {
    mw2('test/test/test/test', 'test/+/muh/#');
    mw2('test/test/test/test', 'test/muh/+/#');
    mw2('test/test/test/test', 'muh/+/#');
    mw2('test/test/test/test', 'muh/+/#');
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