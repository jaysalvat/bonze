/* global describe, it */
/* jshint expr: true */

'use strict';

if (typeof window === 'undefined') {
    var $ = require('../dist/bonz.js');
    var chai = require('chai');
}

var expect = chai.expect;

describe("bonz tests", function () {
    it("should work", function () {
        expect($).to.be.a('function');
        expect($).to.not.throw(Error);
    });
});
