import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const dist = './dist';
const entrypoint = './src/bonze.js';
const date = new Date();

const banner = `
/*! -----------------------------------------------------------------------------
* ${pkg.name} — ${pkg.description}
* ${pkg.version} - built ${date.toISOString()}
* Licensed under the MIT License.
* ----------------------------------------------------------------------------
* Copyright (C) ${date.getFullYear()} Jay Salvat
* http://jaysalvat.com/
* --------------------------------------------------------------------------*/`;

const watched = process.env.ROLLUP_WATCH;

const configDev = {
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
    })
  ]
};

const configProd = {
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
    terser()
  ]
};

const configs = [];

if (!watched) {
  configs.push(configProd);
}
configs.push(configDev);

module.exports = configs;
