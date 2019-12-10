import babel from 'rollup-plugin-babel';
import size from 'rollup-plugin-size';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const dist = './dist';
const entrypoint = './src/bonze.js';
const date = new Date();

const banner = `
/*!
 * ${pkg.name} — ${pkg.description}
 * @version ${pkg.version} built ${date.toISOString()}
 * @license MIT
 * @author Jay Salvat http://jaysalvat.com
 */`;

const watched = process.env.ROLLUP_WATCH;

const standard = {
  input: entrypoint,
  output: [
    {
      name: pkg.name,
      file: `${dist}/${pkg.name}.js`,
      format: 'umd',
      sourcemap: watched,
      banner: !watched && banner
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    size()
  ]
};

const minified = {
  input: entrypoint,
  output: [
    {
      name: pkg.name,
      file: `${dist}/${pkg.name}.min.js`,
      format: 'umd',
      sourcemap: watched,
      banner: !watched && banner
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    terser({
      mangle: {
        eval: true,
        toplevel: true
      },
      compress: {
        toplevel: true,
        reduce_funcs: true,
        keep_infinity: true,
        pure_getters: true,
        passes: 10
      }
    }),
    size()
  ]
};

const configs = [ standard, minified ];

module.exports = configs;
