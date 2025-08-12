# Npm_pid

Npm package, process id. Light, fast and secure.
Writed with native Typescript code and no dependencies are used.

## Pack

1. npm run build
2. Copy the file "/build/package_name-x.x.x.tgz" in the project root folder.
3. In the "package.json" file insert: "@cimo/package_name": "file:package_name-x.x.x.tgz"

## Publish

1. npm run build
2. npm login --auth-type=legacy
3. npm publish --auth-type=legacy --access public

## Installation

1. Link for npm package -> https://www.npmjs.com/package/@cimo/pid

## Server - Example with "NodeJs Express"

-   Server.ts

```
...

import { Cp } from "@cimo/pid/dist/src/Main";

// Source
import * as ControllerTest from "../controller/Test";

...

const cp = new Cp();

ControllerTest.execute(cp);

...
```

-   ControllerTest.ts

```
...

import { Cp } from "@cimo/pid/dist/src/Main";

...

export const execute = (cp: Cp) => {
    cp.add("api", "", 0, (pidIsRunning, pidKey) => {
        if (!pidIsRunning) {
            cp.update(pidKey, "");

            ...

            cp.remove(pidKey);

            // Action completed.
        } else {
            // Another action still running.
        }
    });
};

...
```
