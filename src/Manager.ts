// Source
import * as model from "./Model.js";

export default class Manager {
    private mainObject: Record<number, model.Iparameter>;
    private timeCheck: number;

    private interval = (): void => {
        setInterval(() => {
            const dateNow = Date.now();
            const keyList = Object.keys(this.mainObject);

            for (let a = 0; a < keyList.length; a++) {
                const key = parseInt(keyList[a]);

                const { timeCreated, timeLimit } = this.mainObject[key];
                const difference = dateNow - timeCreated;

                if (difference > timeLimit && timeLimit > 0) {
                    this.delete(Number(key));

                    break;
                }
            }
        }, this.timeCheck);
    };

    constructor(timeCheckValue = 25000) {
        this.mainObject = {};
        this.timeCheck = timeCheckValue;

        this.interval();
    }

    getMainObject = (): Record<number, model.Iparameter> => {
        return this.mainObject;
    };

    checkRunning = (tagValue: string): boolean => {
        const keyList = Object.keys(this.mainObject);

        for (let a = 0; a < keyList.length; a++) {
            const key = parseInt(keyList[a]);

            if (this.mainObject[key].tag === tagValue) {
                return true;
            }
        }

        return false;
    };

    add = (tag: string, data: string, timeLimit: number, callback: model.IcallbackAction): void => {
        const isRunning = this.checkRunning(tag);
        let key = -1;

        if (!isRunning) {
            const keyList = Object.keys(this.mainObject);
            let keyMax = 0;

            for (let a = 0; a < keyList.length; a++) {
                const keyNumber = Number(keyList[a]);

                if (keyNumber > keyMax) {
                    keyMax = keyNumber;
                }
            }

            key = keyMax + 1;

            this.mainObject[key] = { tag, data, timeLimit, timeCreated: Date.now() };
        }

        callback(isRunning, key);
    };

    update = (key: number, data: string): void => {
        if (this.mainObject[key]) {
            const object = this.mainObject[key];

            this.mainObject[key] = {
                tag: object.tag,
                data,
                timeLimit: object.timeLimit,
                timeCreated: object.timeCreated
            };
        }
    };

    delete = (key: number): void => {
        if (this.mainObject[key]) {
            delete this.mainObject[key];
        }
    };
}
