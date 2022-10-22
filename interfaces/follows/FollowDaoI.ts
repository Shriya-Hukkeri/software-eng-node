/**
 * @file Represents the follow DAO methods
 */
import Follow from "../../models/follows/Follows";

export default interface FollowDaoI {
    findUsersFollowedByThisUser(uid: string): Promise<Follow[]>;
    findAllFollowersOfThisUser(uid: string): Promise<Follow[]>;
    followUser(uid1: string, uid2: string): Promise<Follow>;
    unfollowUser(uid1: string, uid2: string): Promise<any>;
}
