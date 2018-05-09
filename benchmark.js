#!/usr/bin/env node

const Benchmark = require('benchmark');

const mw = require('./index.js');
const mqttMatch = require('mqtt-match');
const mqttPattern = require("mqtt-pattern").exec;

const wins = {
    'mqtt-wildcard': 0,
    'mqtt-match': 0,
    'mqtt-pattern': 0
};

function bench(desc, pattern, topic) {
    const suite = new Benchmark.Suite;
    suite.add('mqtt-wildcard - ' + desc, function () {
        mw(topic, pattern);
    }).add('mqtt-pattern  - ' + desc, function () {
        mqttPattern(pattern, topic);
    }).add('mqtt-match    - ' + desc, function () {
        mqttMatch(pattern, topic);
    }).on('cycle', function (event) {
        console.log(String(event.target));
    }).on('complete', function () {
        const id = this.filter('fastest').map('name')[0].split(' ')[0];
        console.log(' => Fastest is ' + id + '\n');
        wins[id] += 1;
    }).run({'async': false});
}

bench('match equal depth 4', 'test/test/test/test', 'test/test/test/test');
bench('match equal depth 8', 'test/test/test/test/test/test/test/test', 'test/test/test/test/test/test/test/test');
bench(
    'match equal depth 16',
    'test/test/test/test/test/test/test/test/test/test/test/test/test/test/test/test',
    'test/test/test/test/test/test/test/test/test/test/test/test/test/test/test/test'
);

bench('match + 4  1', 'test/test/test/+', 'test/test/test/test');
bench('match + 4  2', 'test/test/+/test', 'test/test/test/test');
bench('match + 4  3', 'test/test/+/+', 'test/test/test/test');
bench('match + 4  4', 'test/+/test/test', 'test/test/test/test');
bench('match + 4  5', 'test/+/test/+', 'test/test/test/test');
bench('match + 4  6', 'test/+/+/test', 'test/test/test/test');
bench('match + 4  7', 'test/+/+/+', 'test/test/test/test');
bench('match + 4  8', '+/test/test/test', 'test/test/test/test');
bench('match + 4  9', '+/test/test/+', 'test/test/test/test');
bench('match + 4 10', '+/test/+/test', 'test/test/test/test');
bench('match + 4 11', '+/test/+/+', 'test/test/test/test');
bench('match + 4 12', '+/+/test/test', 'test/test/test/test');
bench('match + 4 13', '+/+/test/+', 'test/test/test/test');
bench('match + 4 14', '+/+/+/test', 'test/test/test/test');
bench('match + 4 15', '+/+/+/+', 'test/test/test/test');

bench('match # 4  1', '#', 'test/test/test/test');
bench('match # 4  2', 'test/#', 'test/test/test/test');
bench('match # 4  3', 'test/test/#', 'test/test/test/test');
bench('match # 4  4', 'test/test/test/#', 'test/test/test/test');

bench('match +# 4  2', 'test/test/+/#', 'test/test/test/test');
bench('match +# 4  4', 'test/+/test/#', 'test/test/test/test');
bench('match +# 4  6', 'test/+/+/#', 'test/test/test/test');
bench('match +# 4  8', '+/test/test/#', 'test/test/test/test');
bench('match +# 4  10', '+/test/+/#', 'test/test/test/test');
bench('match +# 4  12', '+/+/test/#', 'test/test/test/test');
bench('match +# 4  14', '+/+/+/#', 'test/test/test/test');

bench('mismatch + 4  1', 'test/test/muh/+', 'test/test/test/test');
bench('mismatch + 4  4', 'test/+/test/muh', 'test/test/test/test');
bench('mismatch + 4  5', 'test/+/muh/+', 'test/test/test/test');
bench('mismatch + 4  6', 'test/+/+/muh', 'test/test/test/test');
bench('mismatch + 4  2', 'test/muh/+/test', 'test/test/test/test');
bench('mismatch + 4  3', 'test/muh/+/+', 'test/test/test/test');
bench('mismatch + 4  7', 'muh/+/+/+', 'test/test/test/test');

bench('mismatch +# 4  4', 'test/+/muh/#', 'test/test/test/test');
bench('mismatch +# 4  8', '+/test/muh/#', 'test/test/test/test');
bench('mismatch +# 4  12', '+/+/muh/#', 'test/test/test/test');
bench('mismatch +# 4  2', 'test/muh/+/#', 'test/test/test/test');
bench('mismatch +# 4  10', '+/muh/+/#', 'test/test/test/test');
bench('mismatch +# 4  6', 'muh/+/+/#', 'test/test/test/test');

console.dir(wins);
