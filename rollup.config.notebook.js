import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: "src/index.js",
  output: {
    file: "notebook-widget/visual-auditor/visualauditor.js",
    format: "iife",
    sourcemap: true,
  },
    plugins: [
        image(),
        postcss({
            extensions: [".css"],
        }),
        nodeResolve({
        extensions: [".js"],
        }),
        replace({
        'process.env.NODE_ENV': JSON.stringify( 'development' )
        }),
        babel({
        presets: ["@babel/preset-react"],
        }),
        commonjs(),
        serve({
        open: true,
        verbose: true,
        contentBase: ["", "public"],
        host: "localhost",
        port: 3000,
        }),
        livereload({ watch: "dist" }),
  ]
};