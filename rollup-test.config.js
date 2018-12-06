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
  },
];
