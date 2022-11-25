/**
 * @file Implements management and  data storage of dislikes.
 */
import DislikeDaoI from "../interfaces/dislikes/DislikeDaoI";
import DislikeModel from "../mongoose/dislikes/DislikeModel";
import Dislike from "../models/dislikes/Dislikes";

/**
 * @class DislikeDao Implements Data Access Object managing data storage of dislikes
 * @implements {DislikeDaoI} DislikeDaoI
 * @property {DislikeDao} dislikeDao Private single instance of DislikeDao
 */
export default class DislikeDao implements DislikeDaoI {

    private static dislikeDao: DislikeDao | null = null;

    /**
     * Creates a singleton DAO instance
     * @returns DislikeDao
     */
    public static getInstance = (): DislikeDao => {
        if (DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }

    private constructor() {}

    /**
     * Retrieves all the tuits disliked by a particular user
     * @param {string} uid User's primary key
     * @returns {Promise} To be notified when the tuits are retrieved from database
     */
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> => {
        return DislikeModel.find({dislikeBy: uid})
            .populate({
                path: "tuit",
                populate:{
                    path: "postedBy"
                }
            })
            .exec();
    }

    /**
     * Inserts a new dislike instance into the dislikes collection in the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns {Promise} To be notified when the dislike instance is inserted into the database
     */
    userDislikesTuit = async (uid: string, tid: string): Promise<any> => {
        return DislikeModel.create({tuit: tid, dislikedBy: uid});
    }

    /**
     * Deletes a dislike instance from the dislikes collection in the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns {Promise} To be notified when the dislike instance is deleted from the database
     */
    userUndislikesTuit = async (uid: string, tid: string): Promise<any> => {
        return DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});
    }

    /**
     * Check if the user has disliked a particular tuit
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns {Promise} To be notified when the data is retrieved from the database
     */
    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> => {
        return DislikeModel.findOne({tuit: tid, dislikedBy: uid});
    }

    /**
     * Counts the total number of dislikes for a particular tuit
     * @param {string} tid Tuit's primary key
     * @returns {Promise} To be notified when the number of dislikes is retrieved.
     */
    countHowManyDislikedTuit = async (tid: string): Promise<any> => {
        return DislikeModel.count({tuit: tid});
    }

}