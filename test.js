const mw = require('./index.js');

require('should');

describe('trivial matching', () => {
    it('should return true when topic equals wildcard', () => {
        mw('test/123', 'test/123').should.equal(true);
    });
});

describe('mismatching', () => {
    it('should return false', () => {
        mw('test/test/test', 'test/test').should.equal(false);
    });
    it('should return false', () => {
        mw('test/test/test/test', 'test/test').should.equal(false);
    });
    it('should return false', () => {
        mw('test/test', 'test/test/test').should.equal(false);
    });
    it('should return false', () => {
        mw('test/test', 'test/test/test/test').should.equal(false);
    });
});

describe('wildcard # matching', () => {
    it('should return true when wildcard is #', () => {
        mw('test', '#').should.equal(true);
    });
    it('should return true when wildcard is #', () => {
        mw('test/test', '#').should.equal(true);
    });
    it('should return true when wildcard is #', () => {
        mw('test/test/test', '#').should.equal(true);
    });
    it('should return true', () => {
        mw('test/', 'test/#').should.equal(true);
    });
    it('should return true', () => {
        mw('test/test', 'test/#').should.equal(true);
    });
    it('should return true', () => {
        mw('test/test/test', 'test/#').should.equal(true);
    });
    it('should return true', () => {
        mw('test/test/test', 'test/test/#').should.equal(true);
    });
});

describe('wildcard # mismatching', () => {
    it('should return false', () => {
        mw('test', '/#').should.equal(false);
    });
    it('should return false', () => {
        mw('test', 'test/#').should.equal(false);
    });
    it('should return false', () => {
        mw('test/test', 'test/test/#').should.equal(false);
    });
});

describe('wildcard + matching', () => {
    it('should return true', () => {
        mw('test', '+').should.equal(true);
    });
    it('should return true', () => {
        mw('test/', 'test/+').should.equal(true);
    });
    it('should return true', () => {
        mw('test/test', 'test/+').should.equal(true);
    });
    it('should return true', () => {
        mw('test/test/test', 'test/+/+').should.equal(true);
    });
    it('should return true', () => {
        mw('test/test/test', 'test/+/test').should.equal(true);
    });
});

describe('wildcard + mismatching', () => {
    it('should return false', () => {
        mw('test', '/+').should.equal(false);
    });
    it('should return false', () => {
        mw('test', 'test/+').should.equal(false);
    });
    it('should return false', () => {
        mw('test/test', 'test/test/+').should.equal(false);
    });
});

describe('wildcard +/# matching', () => {
    it('should return true', () => {
        mw('test/test', '+/#').should.equal(true);
    });
    it('should return true', () => {
        mw('test/test/', '+/test/#').should.equal(true);
    });
    it('should return true', () => {
        mw('test/test/', 'test/+/#').should.equal(true);
    });
    it('should return true', () => {
        mw('test/test/test', '+/test/#').should.equal(true);
    });
    it('should return true', () => {
        mw('test/test/test', 'test/+/#').should.equal(true);
    });
    it('should return true', () => {
        mw('test/test/test', '+/+/#').should.equal(true);
    });
    it('should return true', () => {
        mw('test/test/test/test', 'test/+/+/#').should.equal(true);
    });
});

describe('wildcard +/# mismatching', () => {
    it('should return false', () => {
        mw('test', '+/#').should.equal(false);
    });
    it('should return false', () => {
        mw('test/test', '+/test/#').should.equal(false);
    });
    it('should return false', () => {
        mw('test/test', 'test/+/#').should.equal(false);
    });
    it('should return false', () => {
        mw('test/foo/test', '+/test/#').should.equal(false);
    });
    it('should return false', () => {
        mw('foo/test/test', 'test/+/#').should.equal(false);
    });
    it('should return false', () => {
        mw('test/test/test', 'test/+/test/#').should.equal(false);
    });
    it('should return false', () => {
        mw('foo/test/test/test', 'test/+/+/#').should.equal(false);
    });
});
