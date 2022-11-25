import Tuit from "../tuits/Tuit";
import User from "../users/User";

/**
 * @interface Dislike Represents a connection between User and a Tuit in terms of a dislike relation
 * @property {Tuit} tuit the tuit that is disliked
 * @property {User} likedBy user who disliked the tuit
 */

export default interface Dislike {
    tuit: Tuit;
    dislikedBy: User;
};