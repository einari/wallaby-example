# Wallaby Example for reproduction of a specific problem

We are using TypeScript and ESM. Our packages are marked with:

```json
{
    "type": "module"
}
```

As testing framework we use Mocha. Our solutions are mono-repos using YARN and workspaces.
We have packages that we share within the mono-repo and depend on them as packages.
In addition to this we use aliases throughout.

For our tests we want to avoid having to import common things like sinon and chai, these should
just be there.

We have gotten Mocha to work for us with some tweaking (custom loader.js, mocha-setup ++),
but struggle getting Wallaby to work, but feel we're close - depends on whether or not we're
barking up the right tree :).

Our target is to get it working in VSCode.

## Install

Run `yarn` from the anywhere in the folder structure and you should get all dependencies installed.

## Verifying that Mocha works

From the terminal, navigate to the `./Source/Something` folder. It contains a package that has a script called `test`.
You can run this using `yarn test`, the result should be something like the following:

```shell
context a_unit_under_test {}


  when doing something
    ✔ should do something


  1 passing (1ms)
```

## Wallaby results

Selecting the `wallaby.cjs` as the configuration file and then do the `WallabyJS: Start` command, will yield the following
result in the output:

```shell
‍​[Info]​ /Users/einari/.vscode/extensions/wallabyjs.wallaby-vscode-1.0.382/projects/d6e55f167222e531/instrumented
​[Info]​ Started Wallaby.js Core v1.0.1474
​​[Error] --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("/Volumes/Code/einari/wallaby-example/loader.js", pathToFileURL("./"));'​​
​​[Error] --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("/Volumes/Code/einari/wallaby-example/loader.js", pathToFileURL("./"));'​​
​​[Error] --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("/Volumes/Code/einari/wallaby-example/loader.js", pathToFileURL("./"));'​​
​​[Error] --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("/Volumes/Code/einari/wallaby-example/loader.js", pathToFileURL("./"));'​​
​​[Error] --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("/Volumes/Code/einari/wallaby-example/loader.js", pathToFileURL("./"));'​​
​​[Error] --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("/Volumes/Code/einari/wallaby-example/loader.js", pathToFileURL("./"));'​​
​​[Error] --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("/Volumes/Code/einari/wallaby-example/loader.js", pathToFileURL("./"));'​​
​​[Error] --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("/Volumes/Code/einari/wallaby-example/loader.js", pathToFileURL("./"));'​​
​​[Error] --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("/Volumes/Code/einari/wallaby-example/loader.js", pathToFileURL("./"));'​​
​​[Error] --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("/Volumes/Code/einari/wallaby-example/loader.js", pathToFileURL("./"));'​​
​​[Error] --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("/Volumes/Code/einari/wallaby-example/loader.js", pathToFileURL("./"));'​​
​​[Error] --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("/Volumes/Code/einari/wallaby-example/loader.js", pathToFileURL("./"));'​​
​​[Error] --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("/Volumes/Code/einari/wallaby-example/loader.js", pathToFileURL("./"));'​​
​​[Error] --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("/Volumes/Code/einari/wallaby-example/loader.js", pathToFileURL("./"));'​​
​​[Error] Runtime error: Cannot find package '@shared/testing' imported from ./Source/Something/for_UnitUnderTest.ts/when_doing_something.js​​
​​[Error]     at packageResolve (./node_modules/ts-node/dist-raw/node-internal-modules-esm-resolve.js:757:9)​​
​​[Error]     at moduleResolve (./node_modules/ts-node/dist-raw/node-internal-modules-esm-resolve.js:798:18)​​
​​[Error]     at Object.defaultResolve (./node_modules/ts-node/dist-raw/node-internal-modules-esm-resolve.js:912:11)​​
​​[Error]     at ./node_modules/ts-node/src/esm.ts:218:35​​
​​[Error]     at entrypointFallback (./node_modules/ts-node/src/esm.ts:168:34)​​
​​[Error]     at ./node_modules/ts-node/src/esm.ts:217:14​​
​​[Error]     at addShortCircuitFlag (./node_modules/ts-node/src/esm.ts:409:21)​​
​​[Error]     at resolve (./node_modules/ts-node/src/esm.ts:197:12)​​
​​[Error]     at resolve (file://./loader.js:15:11)​​
​​[Error]     at nextResolve (node:internal/modules/esm/hooks:866:28)​​
​​[Error] --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("/Volumes/Code/einari/wallaby-example/loader.js", pathToFileURL("./"));'​​
```

It will fail on the `@shared/testing` package, alongside a bunch of other errors. But it is capable of importing the `LocalThing`.
