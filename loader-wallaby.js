// Inspired by: https://stackoverflow.com/questions/71571684/ts-node-with-tsconfig-paths-wont-work-when-using-esm/75318315#75318315

import * as fs from 'fs';
import * as path from 'path';
import { sync as glob } from 'glob';
import { pathToFileURL, fileURLToPath } from 'url';
import { resolve as resolveTs } from 'ts-node/esm';
import * as tsConfigPaths from 'tsconfig-paths';

const modulePaths = {};
const rootPath = process.env.wallabyProjectCacheDir || process.cwd();
const rootPackageJson = JSON.parse(fs.readFileSync(path.resolve(rootPath, 'package.json'), 'utf8'));
const distFolder = `dist${path.sep}`

for (const workspaceDef of rootPackageJson.workspaces) {
    const files = glob(workspaceDef, { cwd: process.cwd() });

    const packages = files
        .filter(_ => path.basename(_) === 'package.json' && _.indexOf(distFolder) < 0 && _.indexOf('node_modules') < 0)
        .sort((a, b) => a.length - b.length);

    packages.forEach(_ => {
        const packageJson = JSON.parse(fs.readFileSync(_).toString());
        modulePaths[packageJson.name] = path.dirname(_);
    });
}

const matchPerTsConfig = {};

glob('Source/**/tsconfig.json', { cwd: rootPath }).forEach(_ => {
    const { absoluteBaseUrl, paths } = tsConfigPaths.loadConfig(_);
    const packageDir = path.join(rootPath, path.dirname(_));
    const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths);
    matchPerTsConfig[packageDir] = matchPath;
});

function matchClosestTsConfig(specifier, ctx) {
    if (!ctx.parentURL) {
        return undefined;
    }

    const parentDirectory = path.dirname(fileURLToPath(ctx.parentURL));
    const match = Object.keys(matchPerTsConfig).find(_ => parentDirectory.indexOf(_) === 0);
    return match ? matchPerTsConfig[match](specifier) : undefined;
}

export function resolve(specifier, ctx, defaultResolve) {
    if (modulePaths.hasOwnProperty(specifier)) {
        return {
            url: pathToFileURL(path.join(rootPath, modulePaths[specifier], "index.ts")).toString(),
            shortCircuit: true
        };
    }

    const match = matchClosestTsConfig(specifier, ctx);
    return match
        ? resolveTs(pathToFileURL(`${match}`).href, ctx, defaultResolve)
        : resolveTs(specifier, ctx, defaultResolve);
}

export { load, transformSource } from 'ts-node/esm';
