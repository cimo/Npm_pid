// Source
import * as Interface from "./Interface";

export default class Pid {
    private timeLimit: number;
    private list: Map<number, { tag: string; timeCreated: number }>;

    constructor(timeLimit: number) {
        this.timeLimit = timeLimit * 60 * 1000;
        this.list = new Map();

        this.checkInterval();
    }

    add = (tag: string, callback: Interface.IcallbackAction) => {
        const checkResult = this.check(tag);

        if (checkResult === 0) {
            const index = this.list.size + 1;

            this.list.set(index, { tag, timeCreated: Date.now() });

            callback(index);

            return;
        }

        callback(0);

        return;
    };

    check = (tagValue: string) => {
        for (const [id, { tag }] of this.list) {
            if (tag === tagValue) {
                return id;
            }
        }

        return 0;
    };

    remove = (id: number) => {
        this.list.delete(id);
    };

    private checkInterval = () => {
        setInterval(() => {
            const now = Date.now();

            for (const [id, { timeCreated }] of this.list) {
                const difference = now - timeCreated;

                if (difference > this.timeLimit) {
                    this.remove(id);

                    break;
                }
            }
        }, 60000);
    };
}
