/* global describe, it */
/* jshint expr: true */

'use strict';

if (typeof window === 'undefined') {
    var bonz = require('../dist/bonz.js');
    var chai = require('chai');
}

var expect = chai.expect;

describe("bonz tests", function () {
    it("should work", function () {
        expect(bonz).to.be.a('function');
        expect(bonz).to.not.throw(Error);
    });
});
