/**
 * @file Implements management and  data storage of follows.
 */
import FollowDaoI from "../interfaces/follows/FollowDaoI";
import Follow from "../models/follows/Follows";
import FollowModel from "../mongoose/follows/FollowModel";


/**
 * @class FollowDao Implements Data Access Object managing data storage of follows
 * @implements {FollowDaoI} FollowDaoI
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    /**
     * Creates a singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null){
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {
    }

    /**
     * Retrieves all the followers of a particular user
     * @param {string} uid User's primary key
     * @returns {Promise} To be notified when the users are retrieved from database
     */
    findAllFollowersOfThisUser(uid: string): Promise<Follow[]> {
        return FollowModel
            .find({userBeingFollowed: uid})
            .populate("followerOfThisUser")
            .exec();

    }

    /**
     * Retrieves all the users that are followed by a particular user
     * @param {string} uid User's primary key
     * @returns {Promise} To be notified when the users are retrieved from database
     */
    findUsersFollowedByThisUser(uid: string): Promise<Follow[]> {
        return FollowModel
            .find({followerOfThisUser: uid})
            .populate("userBeingFollowed")
            .exec();
    }

    /**
     * Inserts a follow instance into follows collection in the database
     * @param {string} uid1 primary key of user who is following the user uid2
     * @param {string} uid2 primary key of the user who is being followed by uid1
     * @returns {Promise} To be notified when the follow instance is created in the database
     */
    followUser(uid1: string, uid2: string): Promise<Follow> {
        return  FollowModel.create({followerOfThisUser: uid1, userBeingFollowed: uid2});
    }


    /**
     * Deletes a follow instance from follows collection in the database
     * @param {string} uid1 primary key of user who is following the user uid2
     * @param {string} uid2 primary key of the user who is being followed by uid1
     * @returns {Promise} To be notified when the follow instance is removed from the database
     */
    unfollowUser(uid1: string, uid2: string): Promise<any> {
        return   FollowModel.deleteOne({followerOfThisUser: uid1, userBeingFollowed: uid2});
    }


}