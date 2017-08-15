module.exports = (topic, wildcard) => {
    const res = [];

    if (topic === wildcard) {
        return res;
    }

    const t = String(topic).split('/');
    const lt = t.length;
    const w = String(wildcard).split('/');
    const lw = w.length;

    let i = 0;
    for (; i < lt; i++) {
        if (w[i] === '+') {
            res.push(t[i]);
        } else if (w[i] === '#') {
            res.push(t.slice(i).join('/'));
            return res;
        } else if (w[i] !== t[i]) {
            return null;
        }
    }

    return i === lw ? res : null;
};
