/**
 * @file Implements management and  data storage of likes.
 */

import LikeDaoI from "../interfaces/likes/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";

/**
 * @class LikeDao Implements Data Access Object managing data storage of likes
 * @implements {LikeDaoI} LikeDaoI
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    /**
     * Creates a singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): LikeDao => {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    private constructor() {
    }


    /**
     * Retrieves all the tuits liked by a particular user
     * @param {string} uid User's primary key
     * @returns {Promise} To be notified when the tuits are retrieved from database
     */
    public findTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        // @ts-ignore
        LikeModel
            .find({likedBy: uid})
            .populate({
                path: "tuit", populate: {
                    path: "postedBy"
                }
            })
            .exec();


    /**
     * Retrieves all the users that liked by a particular tuit
     * @param {string} tid Tuit's primary key
     * @returns {Promise} To be notified when the users are retrieved from database
     */
    public findUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();

    /**
     * Inserts a new like instance into the likes collection in the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns {Promise} To be notified when the like instance is inserted into the database
     */
    public userLikesATuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});

    /**
     * Deletes a like instance from the likes collection in the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns {Promise} To be notified when the like instance is deleted from the database
     */
    public userUnlikesATuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});

    public findUserLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.findOne({tuit: tid, likedBy: uid});

    public countHowManyLikedTuit = async (tid: string): Promise<any> =>
        LikeModel.count({tuit: tid});
}