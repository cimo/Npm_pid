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

import { Pid } from "@cimo/pid";

// Source
import * as ControllerTest from "../controller/Test";

...

const pid = new Pid(5); // Time limit in minutes.

ControllerTest.execute(pid);

...
```

-   ControllerTest.ts

```
...

import { Pid } from "@cimo/pid";

...

export const execute = (pid: Pid) => {
    pid.add("api", (pidIndex) => {
        if (pidIndex > 0) {
            pid.remove(pidIndex);

            // Action completed.
        } else {
            // Another action still running.
        }
    });
};

...
```
