// Source
import * as Interface from "./Interface";

export default class Pid {
    private mainList: Map<number, Interface.Iparameter>;
    private timeCheck: number;

    getMainList = () => {
        return this.mainList;
    };

    constructor(timeCheck = 25000) {
        this.mainList = new Map();
        this.timeCheck = timeCheck;

        this.checkInterval();
    }

    add = (tag: string, data: string, timeLimit: number, callback: Interface.IcallbackAction) => {
        const checkExists = this.checkExists(tag);
        let key = -1;

        if (!checkExists) {
            key = this.mainList.size + 1;

            this.mainList.set(key, { tag, data, timeLimit, timeCreated: Date.now() });
        }

        callback(checkExists, key);
    };

    update = (key: number, data: string) => {
        if (this.mainList.has(key)) {
            const oldParameter = this.mainList.get(key);

            if (oldParameter) {
                this.mainList.set(key, {
                    tag: oldParameter.tag,
                    data,
                    timeLimit: oldParameter.timeLimit,
                    timeCreated: oldParameter.timeCreated
                });
            }
        }
    };

    checkExists = (tagValue: string) => {
        for (const [, { tag }] of this.mainList) {
            if (tag === tagValue) {
                return true;
            }
        }

        return false;
    };

    remove = (key: number) => {
        if (this.mainList.has(key)) {
            this.mainList.delete(key);
        }
    };

    private checkInterval = () => {
        setInterval(() => {
            const now = Date.now();

            for (const [key, { timeCreated, timeLimit }] of this.mainList) {
                const difference = now - timeCreated;

                if (difference > timeLimit && timeLimit > 0) {
                    this.remove(key);

                    break;
                }
            }
        }, this.timeCheck);
    };
}
