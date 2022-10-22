import User from "../users/User";
import Tuit from "../tuits/Tuit";

/**
 * @class Like Represents a connection between User and a Tuit in terms of a like relation
 * @property {Tuit} tuit the tuit that is liked
 * @property {User} likedBy user who liked the tuit
 */
export default class Like{
	 private tuit: Tuit | null = null;
	 private likedBy: User | null = null;

	}