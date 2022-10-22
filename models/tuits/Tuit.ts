import User from "../users/User";

/**
 * @class Tuit Represents a tuit that is posted by the user
 * @property {string} id the primary key of the tuit
 * @property {string} tuit content of the tuit posted
 * @property {Date} postedOn creation time of tuit
 * @property {User} postedBy reference to the user who posted the tuit
 */
export default class Tuit {

    private id: string;
    private tuit: string = '';
    private postedOn: Date = new Date();
    private postedBy: User | null;

    constructor(id: string, tuit: string, postedOn: Date) {
        this.id = id;
        this.tuit = tuit;
        this.postedOn = postedOn;
        this.postedBy = null;
    }

}
