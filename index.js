/* global define, window */
(function () {
    'use strict';
    function mqttWildcard(topic, wildcard) {
        if (topic === wildcard) {
            return [];
        } else if (wildcard === '#') {
            return [topic];
        }

        var res = [];

        var t = String(topic).split('/');
        var w = String(wildcard).split('/');

        var i = 0;
        for (var lt = t.length; i < lt; i++) {
            if (w[i] === '+') {
                res.push(t[i]);
            } else if (w[i] === '#') {
                res.push(t.slice(i).join('/'));
                return res;
            } else if (w[i] !== t[i]) {
                return null;
            }
        }

        if (w[i] === '#') {
            i += 1;
        }

        return (i === w.length) ? res : null;
    }

    /* istanbul ignore next */
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = mqttWildcard;
    } else if (typeof define === 'function' && define.amd) {
        define([], function () {
            return mqttWildcard();
        });
    } else {
        window.mqttWildcard = mqttWildcard;
    }
})();
