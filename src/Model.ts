export interface Iparameter {
    tag: string;
    data: string;
    timeLimit: number;
    timeCreated: number;
}

export interface IcallbackAction {
    (isExists: boolean, pidKey: number);
}
