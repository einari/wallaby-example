module.exports = {
    require: [
        'ts-node/register',
        'tsconfig-paths/register',
        __dirname + '/mocha-setup.js'],
    diff: true,
    "node-option": [
        "experimental-specifier-resolution=node",
        `loader=${__dirname}/loader.js`
    ],
    extensions: ['ts', 'tsx'],
    spec: ['**/for_*/**/*.ts'],
    ignore: ['**/node_modules/**/*', '**/*.d.ts']
}
