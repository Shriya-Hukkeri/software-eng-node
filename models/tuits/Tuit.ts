import User from "../users/User";
import Stats from "./Stats";

/**
 * @class Tuit Represents a tuit that is posted by the user
 * @property {string} id the primary key of the tuit
 * @property {string} tuit content of the tuit posted
 * @property {Date} postedOn creation time of tuit
 * @property {User} postedBy reference to the user who posted the tuit
 */
export default interface Tuit {
    _id: string;
    tuit: string;
    postedOn: Date;
    postedBy: User;
    stats: Stats;
    isLiked?: boolean;
    isDisliked?: boolean;
}