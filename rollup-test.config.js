import { glob } from 'glob';

export default [
  {
    input: glob.sync('test/*.test.js'),
    external: ['assert'],
    experimentalCodeSplitting: true,
    output: {
      dir: 'test/build/',
      format: 'cjs',
      sourcemap: 'inline',
    },
  },
];
