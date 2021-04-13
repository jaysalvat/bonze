import bundleSize from 'rollup-plugin-bundle-size';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const dist = './dist';
const entrypoint = './src/bonze.js';
const date = new Date();

const bannerFull = `
/**!
 * ${pkg.name}
 * ${pkg.description}
 * https://github.com/jaysalvat/bonze
 * @version ${pkg.version} built ${date.toISOString().replace(/[TZ]/g, ' ')}
 * @license MIT
 * @author Jay Salvat http://jaysalvat.com
 */`;

const bannerLight = `
/*! ${pkg.name} v${pkg.version} - github.com/jaysalvat/bonze */`;

const watched = process.env.ROLLUP_WATCH;

const standard = {
  input: entrypoint,
  output: [
    {
      name: pkg.name,
      file: `${dist}/${pkg.name}.js`,
      format: 'umd',
      sourcemap: watched,
      banner: !watched && bannerFull
    },
    {
      name: pkg.name,
      file: `${dist}/${pkg.name}.esm.js`,
      format: 'esm',
      sourcemap: watched,
      banner: !watched && bannerFull
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    terser({
      mangle: false,
      compress: false,
      output: {
        beautify: true,
        indent_level: 2,
        braces: true
      }
    }),
    bundleSize()
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
      banner: !watched && bannerLight
    },
    {
      name: pkg.name,
      file: `${dist}/${pkg.name}.esm.min.js`,
      format: 'esm',
      sourcemap: watched,
      banner: !watched && bannerLight
    }
  ],
  plugins: [
    babel({
      babelHelpers: 'bundled'
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
    bundleSize()
  ]
};

const configs = [ standard, minified ];

module.exports = configs;
