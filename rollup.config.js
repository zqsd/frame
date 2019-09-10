import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.js',
    output: {
        format: 'es',
        file: 'lib/frame.es.min.js'
    },
    plugins: [
        commonjs(),
        resolve(),
        babel(),
        terser()
    ]
};
