# Pid

PID management. Light, fast and secure.

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

import { Cp } from "@cimo/pid";

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

import { Cp } from "@cimo/cp";

...

export const execute = (cp: Cp) => {
    cp.add("api", "", 0, (isExists, pidKey) => {
        if (!isExists) {
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
