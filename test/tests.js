/* global describe, it, beforeEach, after */
/* jshint expr: true */

const html = `
    <body>
      <div id="one">
          <p>one-1</p>
          <p>one-2</p>
          <p>one-3</p>
          <p>one-4</p>
      </div>
      <div id="two">
          <p>two-1</p>
          <p>two-2</p>
          <p>two-3</p>
          <p>two-4</p>
      </div>
    </body>`;

const helper = {
  isCli: () => typeof process !== 'undefined',
  isOdd: (n) => (n % 2),
  isEven: (n) => !(n % 2)
};

let bonze, chai;

if (helper.isCli()) {
  bonze = require('../dist/bonze.js');
  chai = require('chai');
} else {
  bonze = window.bonze;
  chai = window.chai;
}

const expect = chai.expect;

describe('bonze tests', () => {
  beforeEach(() => {
    if (helper.isCli()) {
      const jsdom = require('jsdom');
      const dom = new jsdom.JSDOM(html);
      const { window } = dom;
      const { document } = dom.window;

      global.window = window;
      global.document = document;
    } else {
      document.querySelector('#test').innerHTML = html;
    }
  });

  it('should work', () => {
    expect(bonze).to.be.a('function');
    expect(bonze).to.not.throw(Error);
  });

  it('should find all p', () => {
    const ps = bonze('p')();

    expect(ps.length).to.be.equal(8);
  });

  it('should find p in #one', () => {
    const ps = bonze('p', '#one')();

    expect(ps.length).to.be.equal(4);
  });

  it('should find p in #two', () => {
    const ps = bonze('p', '#two')();

    expect(ps.length).to.be.equal(4);
  });

  it('should change p content', () => {
    const ps = bonze('p')(($elmt, i) => {
      $elmt.innerHTML = 'p #' + i;
    });

    bonze(ps)((element) => {
      expect(element.innerHTML).to.match(/p #\d/);
    });
  });

  it('should target first p', () => {
    const first = bonze('p').first()(($elmt) => {
      $elmt.innerHTML = 'is first p';
    });
    expect(first(0).innerHTML).to.equal('is first p');
  });

  it('should target last p', () => {
    const last = bonze('p').last()(($elmt) => {
      $elmt.innerHTML = 'is last p';
    });
    expect(last(0).innerHTML).to.equal('is last p');
  });

  it('should target specific p', () => {
    bonze('p').nth(2)(($elmt) => {
      $elmt.innerHTML = 'p #2';
    });

    bonze('p')(($elmt, i) => {
      if (i === 2) {
        expect($elmt.innerHTML).to.equal('p #2');
      } else {
        expect($elmt.innerHTML).to.not.be.equal('p #2');
      }
    });
  });

  it('should target odd p', () => {
    bonze('p').odd()(($elmt, i) => {
      $elmt.innerHTML = 'odd';
    });

    bonze('p')(($elmt, i) => {
      if (helper.isOdd(i + 1)) {
        expect($elmt.innerHTML).to.equal('odd');
      } else {
        expect($elmt.innerHTML).to.not.be.equal('odd');
      }
    });
  });

  it('should filter p', () => {
    const ps1 = bonze('p').filter(($elmt) => {
      return $elmt.innerHTML.indexOf('one') > -1;
    });

    expect(ps1().length).to.be.equal(4);

    const ps2 = bonze('p').filter(($elmt) => {
      return $elmt.innerHTML.indexOf('-2') > -1;
    });

    expect(ps2().length).to.be.equal(2);
  });

  it('should change p content using the each alias', () => {
    const ps = bonze('p').each(($elmt, i) => {
      $elmt.innerHTML = 'p #' + i;
    });

    bonze(ps)((element) => {
      expect(element.innerHTML).to.match(/p #\d/);
    });
  });

  it('should target even p', () => {
    bonze('p').even()(($elmt, i) => {
      $elmt.innerHTML = 'even';
    });

    bonze('p')(($elmt, i) => {
      if (helper.isEven(i + 1)) {
        expect($elmt.innerHTML).to.be.equal('even');
      } else {
        expect($elmt.innerHTML).to.not.be.equal('even');
      }
    });
  });

  it('should accept array of selector and elements', () => {
    const $body = bonze('body')();
    const $one = bonze('#one')();
    const $two = bonze('#two')();
    const p = bonze('#one p:last-child');

    bonze([
      p,
      $body,
      [ $one, $two ],
      '#one p:nth-child(1), #one p:nth-child(2)',
      [ '#two p:nth-child(1)', '#two p:nth-child(2)' ]
    ])(($elmt) => {
      $elmt.classList.add('target');
    });

    bonze('body, #one, #two, #one p:nth-child(1), #one p:nth-child(2), #two p:nth-child(1), #two p:nth-child(2), #one p:last-child')(($elmt) => {
      expect($elmt.classList.contains('target')).to.equal(true);
    });

  });

  it('should accept plugins', () => {
    bonze.plugin('addClass', ($el, i, elmts, name) => $el.classList.add(name));

    expect(bonze('p.red')().length).to.be.equal(0);
    bonze('p').addClass('red');
    expect(bonze('p.red')().length).to.be.equal(8);
  });
});

after(() => {
  if (!helper.isCli()) {
    document.querySelector('#test').remove();
  }
});
