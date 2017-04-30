module.exports = (topic, wildcard) => {
    if (topic === wildcard) {
        return true;
    }

    const t = String(topic).split('/');
    const lt = t.length;
    const w = String(wildcard).split('/');
    const lw = w.length;

    let i = 0;

    for (; i < lt; i++) {
        if (t[i] !== w[i] && w[i] !== '+' && w[i] !== '#') {
            return false;
        } else if (w[i] === '#') {
            return true;
        }
    }
    return i === lw;
};
