import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import nodeJson from 'rollup-plugin-json';

import { glob } from 'glob';

export default [
  {
    input: glob.sync('test/*.test.js'),
    external: ['assert'],
    output: {
      dir: 'build/test/',
      format: 'cjs',
      sourcemap: 'inline',
    },
    plugins: [
      nodeResolve(),
      commonjs({
        include: 'node_modules/**',
        sourceMap: false,
      }),
      nodeJson(),
    ],
  },
];
