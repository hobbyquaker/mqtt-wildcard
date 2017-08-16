const mw = require('./index.js');

const should = require('should');

should.Assertion.add('arrayEqual', function (other) {
    this.params = { operator: 'to be have same items' };

    this.obj.forEach(function (item, index) {
        //both arrays should at least contain the same items
        other[index].should.equal(item);
    });
    // both arrays need to have the same number of items
    this.obj.length.should.be.equal(other.length);
});


describe('trivial matching', function () {
    it('should return the correct array when topic equals wildcard', function () {
        mw('test/123', 'test/123').should.arrayEqual([]);
    });
});

describe('mismatching', function () {
    it('should return null', function () {
        should(mw('test/test/test', 'test/test')).equal(null);
    });
    it('should return null', function () {
        should(mw('test/test/test/test', 'test/test')).equal(null);
    });
    it('should return null', function () {
        should(mw('test/test', 'test/test/test')).equal(null);
    });
    it('should return null', function () {
        should(mw('test/test', 'test/test/test/test')).equal(null);
    });
});

describe('wildcard # matching', function () {
    it('should return the correct array when wildcard is #', function () {
        mw('test', '#').should.arrayEqual(['test']);
    });
    it('should return the correct array when wildcard is #', function () {
        mw('test/test', '#').should.arrayEqual(['test/test']);
    });
    it('should return the correct array when wildcard is #', function () {
        mw('test/test/test', '#').should.arrayEqual(['test/test/test']);
    });
    it('should return the correct array', function () {
        mw('test/test', 'test/#').should.arrayEqual(['test']);
    });
    it('should return the correct array', function () {
        mw('test/test/test', 'test/#').should.arrayEqual(['test/test']);
    });
    it('should return the correct array', function () {
        mw('test/test/test', 'test/test/#').should.arrayEqual(['test']);
    });
    it('should return the correct array', function () {
        mw('/', '/#').should.arrayEqual(['']);
    });
    it('should return the correct array', function () {
        mw('/test', '/#').should.arrayEqual(['test']);
    });
    it('should return the correct array', function () {
        mw('/test/', '/#').should.arrayEqual(['test/']);
    });
    it('should return the correct array', function () {
        mw('/test/test', '/#').should.arrayEqual(['test/test']);
    });
    it('should return the correct array', function () {
        mw('test/', 'test/#').should.arrayEqual(['']);
    });
    it('should return correct array', function () {
        mw('test', 'test/#').should.arrayEqual([]);
    });
    it('should return correct array', function () {
        mw('test/test', 'test/test/#').should.arrayEqual([]);
    });
});

describe('wildcard # mismatching', function () {
    it('should return null', function () {
        should(mw('test', '/#')).equal(null);
    });
    it('should return null', function () {
        should(mw('test/test', 'muh/#')).equal(null);
    });
    it('should return null', function () {
        should(mw('', 'muh/#')).equal(null);
    });
});

describe('wildcard + matching', function () {
    it('should return the correct array', function () {
        mw('test', '+').should.arrayEqual(['test']);
    });
    it('should return the correct array', function () {
        mw('test/', 'test/+').should.arrayEqual(['']);
    });
    it('should return the correct array', function () {
        mw('test/test', 'test/+').should.arrayEqual(['test']);
    });
    it('should return the correct array', function () {
        mw('test/test/test', 'test/+/+').should.arrayEqual(['test', 'test']);
    });
    it('should return the correct array', function () {
        mw('test/test/test', 'test/+/test').should.arrayEqual(['test']);
    });
});

describe('wildcard + mismatching', function () {
    it('should return null', function () {
        should(mw('test', '/+')).equal(null);
    });
    it('should return null', function () {
        should(mw('test', 'test/+')).equal(null);
    });
    it('should return null', function () {
        should(mw('test/test', 'test/test/+')).equal(null);
    });
});

describe('wildcard +/# matching', function () {
    it('should return the correct array', function () {
        mw('test/test', '+/#').should.arrayEqual(['test', 'test']);
    });
    it('should return the correct array', function () {
        mw('test/test/', '+/test/#').should.arrayEqual(['test', '']);
    });
    it('should return the correct array', function () {
        mw('test/test/', 'test/+/#').should.arrayEqual(['test', '']);
    });
    it('should return the correct array', function () {
        mw('test/test/test', '+/test/#').should.arrayEqual(['test', 'test']);
    });
    it('should return the correct array', function () {
        mw('test/test/test', 'test/+/#').should.arrayEqual(['test', 'test']);
    });
    it('should return the correct array', function () {
        mw('test/test/test', '+/+/#').should.arrayEqual(['test', 'test', 'test']);
    });
    it('should return the correct array', function () {
        mw('test/test/test/test', 'test/+/+/#').should.arrayEqual(['test', 'test', 'test']);
    });
    it('should return the correct array', function () {
        mw('test', '+/#').should.arrayEqual(['test']);
    });
    it('should return the correct array', function () {
        mw('test/test', 'test/+/#').should.arrayEqual(['test']);
    });
    it('should return the correct array', function () {
        mw('test/test/test', 'test/+/test/#').should.arrayEqual(['test']);
    });
});

describe('wildcard +/# mismatching', function () {
    it('should return null', function () {
        should(mw('test/foo/test', '+/test/#')).equal(null);
    });
    it('should return null', function () {
        should(mw('foo/test/test', 'test/+/#')).equal(null);
    });
    it('should return null', function () {
        should(mw('foo/test/test/test', 'test/+/+/#')).equal(null);
    });
});

describe('examples', function () {
    it('should return the correct array', function () {
        should(mw('test/foo/bar', 'test/+/bar')).arrayEqual(['foo']);
    });
    it('should return the correct array', function () {
        should(mw('test/foo/bar', 'test/#')).arrayEqual(['foo/bar']);
    });
    it('should return the correct array', function () {
        should(mw('test/foo/bar/baz', 'test/+/#')).arrayEqual(['foo', 'bar/baz']);
    });
    it('should return the correct array', function () {
        should(mw('test/foo/bar/baz', 'test/+/+/baz')).arrayEqual(['foo', 'bar']);
    });
    it('should return the correct array', function () {
        should(mw('test', 'test/#')).arrayEqual([]);
    });
    it('should return the correct array', function () {
        should(mw('test/', 'test/#')).arrayEqual(['']);
    });
    it('should return the correct array', function () {
        should(mw('test/foo/bar/baz', 'test/+/+/baz/#')).arrayEqual(['foo', 'bar']);
    });
    it('should return null', function () {
        should(mw('test/foo/bar', 'test/+')).equal(null);
    });
    it('should return null', function () {
        should(mw('test/foo/bar', 'test/nope/bar')).equal(null);
    });
});
