/* global describe, it */
/* jshint expr: true */

'use strict';

const html = `
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

let $, chai;

if (typeof window === 'undefined') {
  $ = require('../dist/bonze.js');
  chai = require('chai');

  const jsdom = require('jsdom');
  const { JSDOM } = jsdom;
  const dom = new JSDOM(html);
  const { window } = dom;
  const { document } = (dom).window;

  global.window = window;
  global.document = document;
} else {
  $ = window.$;
  chai = window.chai;

  document.querySelector('#test').innerHTML = html;
}

const expect = chai.expect;

describe('bonze tests', () => {
  it('should work', () => {
    expect($).to.be.a('function');
    expect($).to.not.throw(Error);
  });

  it('should find all p', () => {
    const ps = $('p')();

    expect(ps.length).to.be.equal(4);
  });

  it('should find p in #one', () => {
    const ps = $('p', '#one')();

    expect(ps.length).to.be.equal(2);
  });

  it('should find p in #two', () => {
    const ps = $('p', '#two')();

    expect(ps.length).to.be.equal(2);
  });

  it('should change p content', () => {
    const ps = $('p')((elmt, i) => {
      elmt.innerHTML = 'it works ' + i;
    });

    expect(ps(0).innerHTML).to.contains('it works');
  });

  it('should target first/last p', () => {
    const first = $('p')('first', (elmt) => {
      elmt.innerHTML = 'is first p';
    });

    const last = $('p')('last', (elmt) => {
      elmt.innerHTML = 'is last p';
    });

    expect(first(0).innerHTML).to.equal('is first p');
    expect(last(0).innerHTML).to.equal('is last p');
  });

  it('should filter p', () => {
    let ps;

    ps = $('p')((elmt) => {
      return elmt.innerHTML.match(/it works/g);
    }, 'filter')((elmt) => {
      elmt.innerHTML = 'is a middle p';
    });

    ps = $('p');

    expect(ps(0).innerHTML).to.equal('is first p');
    expect(ps(1).innerHTML).to.equal('is a middle p');
    expect(ps(2).innerHTML).to.equal('is a middle p');
    expect(ps(3).innerHTML).to.equal('is last p');
  });

  it('should add a H1 element', () => {
    $('<h1>a new element</h1>')((elmt) => {
      $('#one')(0).prepend(elmt);
    });

    const h1 = $('h1', '.bonz')();

    expect(h1.length).to.be.equal(1);
  });
});
