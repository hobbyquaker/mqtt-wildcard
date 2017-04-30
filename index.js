module.exports = (topic, wildcard) => {
    if (typeof topic !== 'string') {
        throw new TypeError('argument topic has to be of type string');
    }
    if (typeof wildcard !== 'string') {
        throw new TypeError('argument wildcard has to be of type string');
    }
    if (topic.indexOf('#') !== -1) {
        throw new Error('wildcard # not allowed in topic');
    }
    if (topic.indexOf('+') !== -1) {
        throw new Error('wildcard + not allowed in topic');
    }

    if (topic === wildcard) {
        return true;
    }

    let regex = wildcard;

    if (wildcard.indexOf('#') !== -1) {
        if (!wildcard.match(/\/#$/) && wildcard !== '#') {
            throw new Error('wildcard # is only allowed as last character');
        }
        if (wildcard === '#') {
            return true;
        }
        regex = regex.replace(/#/, '.*');
    }

    if (wildcard.indexOf('+') !== -1) {
        regex.split('').forEach((char, index) => {
            if (char === '+') {
                if (index !== 0) {
                    if (regex[index - 1] !== '/') {
                        throw new Error('wildcard + is only allowed at the beginning or after a slash');
                    }
                }
                if (index !== (regex.length - 1)) {
                    if (regex[index + 1] !== '/') {
                        throw new Error('wildcard + is only allowed at the end or before a slash');
                    }
                }
            }
        });
        regex = regex.replace(/\+/g, '[^/]*');
    }

    return (new RegExp(regex)).test(topic);
};
