const mw = require('./index.js');

require('should');

describe('argument validation', () => {
    it('should throw an error if argument topic is not of type string', () => {
        (() => {
            mw(null);
        }).should.throw();
    });
    it('should throw an error if argument wildcard is not of type string', () => {
        (() => {
            mw('test', null);
        }).should.throw();
    });
    it('should throw an error for invalid # usage', () => {
        (() => {
            mw('test', 'test/#/test');
        }).should.throw();
    });
    it('should throw an error for invalid # usage', () => {
        (() => {
            mw('test', 'test#');
        }).should.throw();
    });
    it('should throw an error for invalid + usage', () => {
        (() => {
            mw('test', '+test');
        }).should.throw();
    });
    it('should throw an error for invalid + usage', () => {
        (() => {
            mw('test', 'test+');
        }).should.throw();
    });
    it('should throw an error for invalid + usage', () => {
        (() => {
            mw('test', 'test+test');
        }).should.throw();
    });
    it('should throw an error for invalid + usage', () => {
        (() => {
            mw('test', 'test/+test');
        }).should.throw();
    });
    it('should throw an error for invalid + usage', () => {
        (() => {
            mw('test', 'test+/test');
        }).should.throw();
    });
    it('should throw an error if # appears in topic', () => {
        (() => {
            mw('test/#', 'test/123');
        }).should.throw();
    });
    it('should throw an error if + appears in topic', () => {
        (() => {
            mw('test/+', 'test/123');
        }).should.throw();
    });
});

describe('trivial matching', () => {
    it('should return true when topic equals wildcard', () => {
        mw('test/123', 'test/123').should.equal(true);
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
