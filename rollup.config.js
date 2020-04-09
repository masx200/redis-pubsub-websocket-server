import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
const beautifyterserplugin = terser({
    compress: false,
    mangle: false,
    output: {
        comments: !1,
        beautify: true,
    },
});
export default [
    {
        external: [
            "ws",
            "socket.io",
            "ioredis",
            "morgan",
            "http",
            "https",
            "http-proxy-middleware",
            "cors",
            "cookie-parser",
            "crypto",
            "compression",
            "helmet",
            "zlib",
            "buffer",
            "tty",
            "net",
            "spdy",
            "fs-extra",
            "check-types",
            "process",
            "path",
            "url",
            "assert",
            "express-async-errors",
            "body-parser",
            "express",
            "method-override",
            "mongodb",
            "mongoose",
            "fs",
            "os",
            "util",
            "stream",
            "constants",
        ],
        input: "./src/index.ts",
        output: [
            {
                format: "cjs",

                file: "./dist/index.cjs",

                sourcemap: false,
            },
        ],
        plugins: [
            beautifyterserplugin,
            json(),
            resolve({ preferBuiltins: true }),
            commonjs(),
            typescript({ sourceMap: false }),
        ],
    },
];
