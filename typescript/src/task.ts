
export interface TaskProps {[index: string]: Task[]}

export interface TaskModelProps{
    id : string,
    description: string,
    done: boolean,
    deadline: Date| null
}

export class Task implements TaskModelProps
{
    private _id: string;
    private _description: string;
    private _done: boolean;
    private _deadline: Date | null;

    constructor(_id: string, _description: string, _done: boolean, _deadline: Date | null) {}

    get id() {
        return this._id;
    }

    get description() {
        return this._description;
    }

    get done() {
        return this._done;
    }

    get deadline() {
        return this._deadline;
    }

    set done(val: boolean) {
        this._done = val;
    }

    set deadline(val : Date | null) {
        this._deadline = val;
    }
}

