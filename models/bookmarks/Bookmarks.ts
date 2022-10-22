import Tuit from "../tuits/Tuit";
import User from "../users/User";

/**
 * @class Bookmark Represents a connection between a user and a tuit in where a User bookmarks a Tuit
 * @property {Tuit} tuit this is the tuit that has been bookmarked by the user
 * @property {User} bookmarkedBy the user who bookmarks the tuit
 */
export default class Bookmark {
    private tuit: Tuit | null = null;
    private bookmarkedBy: User | null = null;
}