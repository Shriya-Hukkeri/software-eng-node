import User from "../users/User";

/**
 * @class Follow Represents a connection betweentwo users in terms of a Follow relation
 * @property {User} userBeingFollowed this user who is being followed
 * @property {User} followerOfThisUser the user who is following this user
 */
export default  class Follow {
    private userBeingFollowed: User | null = null;
    private followerOfThisUser: User | null = null;
}