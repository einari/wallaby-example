// Inspired by: https://stackoverflow.com/questions/71571684/ts-node-with-tsconfig-paths-wont-work-when-using-esm/75318315#75318315

import { pathToFileURL } from 'url';
import { resolve as resolveTs } from 'ts-node/esm';
import * as tsConfigPaths from 'tsconfig-paths';

const { absoluteBaseUrl, paths } = tsConfigPaths.loadConfig();

const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths);

export function resolve(specifier, ctx, defaultResolve) {
    const match = matchPath(specifier);
    return match
        ? resolveTs(pathToFileURL(`${match}`).href, ctx, defaultResolve)
        : resolveTs(specifier, ctx, defaultResolve);
}

export { load, transformSource } from 'ts-node/esm';
