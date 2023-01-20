import fs from 'node:fs';
import path from 'node:path';
import plugin_commonjs from '@rollup/plugin-commonjs';
import plugin_nodeResolve from '@rollup/plugin-node-resolve';
import plugin_delete from 'rollup-plugin-delete';
import plugin_typescript from '@rollup/plugin-typescript';
import plugin_generatePackageJson from 'rollup-plugin-generate-package-json';

const packageJson = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url)));
const externalDependencies = Object.keys(packageJson.dependencies).concat(Object.keys(packageJson.peerDependencies));

const config = [
  // ESM Build
  {
    input: ['src/client/index.ts', 'src/server/index.ts', 'src/utils/index.ts'],
    plugins: [
      plugin_delete({
        targets: ['dist/esm']
      }),
      plugin_nodeResolve(),
      plugin_commonjs(),
      // Emit .js, .js.map
      plugin_typescript({
        tsconfig: path.resolve('./tsconfig.json'),
        compilerOptions: {
          outDir: 'dist/esm',
          sourceMap: true,
          sourceRoot: '../src'
        },
      }),
      // Emit .d.ts, .d.ts.map
      plugin_typescript({
        tsconfig: path.resolve('./tsconfig.json'),
        compilerOptions: {
          outDir: 'dist/esm',
          declaration: true,
          declarationMap: true,
          emitDeclarationOnly: true,
        },
      }),
      // Generate package.json
      plugin_generatePackageJson({
        baseContents: (base) => ({
          name: base.name,
          version: base.version,
          private: true,
          type: 'module',
        }),
      }),
    ],
    external: externalDependencies.map((packageName) => new RegExp(`^${packageName}(/.*)?`)),
    output: {
      dir: 'dist/esm',
      format: 'es',
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: './src',
      sourcemap: true,
    },
  },
  // CJS Build
  {
    input: ['src/client/index.ts', 'src/server/index.ts', 'src/utils/index.ts'],
    plugins: [
      plugin_delete({
        targets: ['dist/cjs']
      }),
      plugin_nodeResolve(),
      plugin_commonjs(),
      // Emit .js, .js.map
      plugin_typescript({
        tsconfig: path.resolve('./tsconfig.json'),
        compilerOptions: {
          outDir: 'dist/cjs',
          sourceMap: true,
          sourceRoot: '../src'
        },
      }),
      // Emit .d.ts, .d.ts.map
      plugin_typescript({
        tsconfig: path.resolve('./tsconfig.json'),
        compilerOptions: {
          outDir: 'dist/cjs',
          declaration: true,
          declarationMap: true,
          emitDeclarationOnly: true,
        },
      }),
      // Generate package.json
      plugin_generatePackageJson({
        baseContents: (base) => ({
          name: base.name,
          version: base.version,
          private: true,
          type: 'commonjs',
        }),
      }),
    ],
    external: externalDependencies.map((packageName) => new RegExp(`^${packageName}(/.*)?`)),
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: './src',
      sourcemap: true,
    },
  },
];

export default config;
