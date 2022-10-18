import User from "./User";

export default class Tuit {

    private tuit: string = '';
    private postedOn: Date = new Date();
    private postedBy: string;

    constructor(tuit?: string, postedOn?: Date | undefined, postedBy?: string | undefined) {
        this.tuit = tuit || '';
        this.postedOn = postedOn || new Date();
        this.postedBy = postedBy || '';

    }

}
