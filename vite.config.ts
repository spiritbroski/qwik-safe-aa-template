import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { qwikReact } from "@builder.io/qwik-react/vite";
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
import builtins from "rollup-plugin-node-builtins";
export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths(), qwikReact()],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
      resolve: {
        alias: {
            "node:stream":"stream-browserify",
            "node:util": "util",
            sys: "util",
            events: "rollup-plugin-node-polyfills/polyfills/events",
            stream: "rollup-plugin-node-polyfills/polyfills/stream",
            "node:path": "rollup-plugin-node-polyfills/polyfills/path",
            querystring: "rollup-plugin-node-polyfills/polyfills/qs",
            punycode: "rollup-plugin-node-polyfills/polyfills/punycode",
            "node:url": "rollup-plugin-node-polyfills/polyfills/url",
            "node:http": "rollup-plugin-node-polyfills/polyfills/http",
            "node:net":"net-websocket-polyfill",
            "node:fs":"memfs",
            https: "rollup-plugin-node-polyfills/polyfills/http",
            os: "rollup-plugin-node-polyfills/polyfills/os",
            assert: "rollup-plugin-node-polyfills/polyfills/assert",
            constants: "rollup-plugin-node-polyfills/polyfills/constants",
            _stream_duplex: "rollup-plugin-node-polyfills/polyfills/readable-stream/duplex",
            _stream_passthrough: "rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough",
            _stream_readable: "rollup-plugin-node-polyfills/polyfills/readable-stream/readable",
            _stream_writable: "rollup-plugin-node-polyfills/polyfills/readable-stream/writable",
            _stream_transform: "rollup-plugin-node-polyfills/polyfills/readable-stream/transform",
            timers: "rollup-plugin-node-polyfills/polyfills/timers",
            console: "rollup-plugin-node-polyfills/polyfills/console",
            vm: "rollup-plugin-node-polyfills/polyfills/vm",
            zlib: "rollup-plugin-node-polyfills/polyfills/zlib",
            tty: "rollup-plugin-node-polyfills/polyfills/tty",
            domain: "rollup-plugin-node-polyfills/polyfills/domain",
            "node:buffer": "rollup-plugin-node-polyfills/polyfills/buffer-es6",
            process: "rollup-plugin-node-polyfills/polyfills/process-es6",
            buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
        },
      },
      optimizeDeps: {
        include:['node-domexception'],

          esbuildOptions: {
            target: "es2020",
              supported: { bigint: true },
            define: {
                global: 'globalThis'
            },
              plugins: [
                NodeGlobalsPolyfillPlugin({
                    buffer: true,
                    process: true
                }),
                NodeModulesPolyfillPlugin()
            ]
        }
      },
      build: {
        target: "es2020",
          rollupOptions: {
            plugins: [
                // Enable rollup polyfills plugin
                // used during production bundling
                builtins(),
                rollupNodePolyFill(),
                ],
          },
      },
  };
});
