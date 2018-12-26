import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import nodeJson from 'rollup-plugin-json';

import { glob } from 'glob';

export default [
  {
    input: glob.sync('test/*.test.js'),
    external: ['assert'],
    experimentalCodeSplitting: true,
    output: {
      dir: 'build/test/',
      format: 'cjs',
      sourcemap: 'inline',
    },
    plugins: [
      nodeResolve({
        jsnext: true,
        main: true,
      }),
      commonjs({
        include: 'node_modules/**',
        sourceMap: false,
      }),
      nodeJson(),
    ],
  },
];
