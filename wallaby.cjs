const path = require('path');

module.exports = function (wallaby) {
    console.log(wallaby.projectCacheDir);

    return {
        files: [
            { pattern: 'package.json', instrument: false },
            { pattern: 'tsconfig.json', instrument: false },
            { pattern: 'Source/**/package.json', instrument: false },
            { pattern: 'Source/**/tsconfig.json', instrument: false },
            '!Source/**/*.d.ts*',
            '!Source/**/for_*/**/when_*.ts*',
            '!Source/**/for_*/**/and_*.ts*',
            'Source/**/*.ts*',
            'Source/**/*.js*',
        ],

        tests: [
            '!Source/**/*.d.ts*',
            'Source/**/for_*/**/when_*.ts*',
            'Source/**/for_*/**/and_*.ts*'
        ],

        testFramework: 'mocha',

        compilers: {
            '**/*.ts?(x)': wallaby.compilers.typeScript({
                module: 'ESNext',
                target: 'ESNext',
                jsx: 'React',
                esModuleInterop: true,
                allowSyntheticDefaultImports: true
            })
        },

        preprocessors: {
            '**/*.ts': file => file.content.replace(/\.ts/g, '.js')
        },

        setup: function () {
            const mocha = wallaby.testFramework;

            const chai = require('chai');
            const sinon = require('sinon');

            // setup sinon hooks
            mocha.suite.beforeEach('sinon before', function () {
                if (null == this.sinon) {
                    this.sinon = sinon.createSandbox();
                }
            });
            mocha.suite.afterEach('sinon after', function () {
                if (this.sinon && 'function' === typeof this.sinon.restore) {
                    this.sinon.restore();
                }
            });

            mocha.ui('bdd');

            global.expect = chai.expect;
            var should = chai.should();
        },

        env: {
            type: 'node',
            runner: 'node',
            params: {
                runner: '--experimental-specifier-resolution=node --loader=' + path.join(__dirname, 'loader-wallaby.js')
            }
        },

        symlinkNodeModules: true,

        workers: {
            restart: true
        }
    }
}
