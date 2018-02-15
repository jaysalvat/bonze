/* global describe, it */
/* jshint expr: true */

'use strict';

var html = `
    <body>
        <div class="bonz">
            <div id="one">
                <p></p>
                <p></p>
            </div>
            <div id="two">
                <p></p>
                <p></p>
            </div>
        </div>
    </body>`;

if (typeof window === 'undefined') {
    var $ = require('../dist/bonze.js');
    var chai = require('chai');
    var jsdom = require("jsdom");

    var { JSDOM } = jsdom;
    var dom = new JSDOM(html);
    var { window } = dom;
    var { document } = (dom).window;

    global.window = window;
    global.document = document;
} else {
    document.querySelector('#test').innerHTML = html;
}

var expect = chai.expect;

describe("bonze tests", function () {
    it("should work", function () {
        expect($).to.be.a('function');
        expect($).to.not.throw(Error);
    });

    it("should find all p", function () {
        var ps = $('p')();
        expect(ps.length).to.be.equal(4);
    });

    it("should find p in #one", function () {
        var ps = $('p', '#one')();
        expect(ps.length).to.be.equal(2);
    });

    it("should find p in #two", function () {
        var ps = $('p', '#two')();
        expect(ps.length).to.be.equal(2);
    });

    it("should change p content", function () {
        var ps = $('p')(function (elmt, i) {
            elmt.innerHTML = 'it works ' + i;
        });

        expect(ps(0).innerHTML).to.contains('it works');
    });

    it("should target first/last p", function () {
        var first = $('p')('first', function (elmt) {
            elmt.innerHTML = 'is first';
        });

        var last = $('p')('last', function (elmt) {
            elmt.innerHTML = 'is last';
        });

        expect(first(0).innerHTML).to.contains('is first');
        expect(last(0).innerHTML).to.contains('is last');
    });

    it("should add a H1 element", function () {
        $('<h1>a new element</h1>')(function (elmt) {
            $('#one')(0).prepend(elmt);
        });

        var h1 = $('h1', '.bonz')();

        expect(h1.length).to.be.equal(1);
    });
});
