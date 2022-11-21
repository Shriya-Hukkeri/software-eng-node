import DislikeDaoI from "../interfaces/dislikes/DislikeDaoI";
import DislikeModel from "../mongoose/dislikes/DislikeModel";
import Dislike from "../models/dislikes/Dislikes";

export default class DislikeDao implements DislikeDaoI {

    private static dislikeDao: DislikeDao | null = null;

    public static getInstance = (): DislikeDao => {
        if (DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }

    private constructor() {}

    countHowManyDislikedTuit = async (tid: string): Promise<any> => {
        return DislikeModel.count({tuit: tid});
    }

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

    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> => {
        return DislikeModel.findOne({tuit: tid, dislikedBy: uid});
    }

    userDislikesTuit = async (uid: string, tid: string): Promise<any> => {
        return DislikeModel.create({tuit: tid, dislikedBy: uid});
    }

    userUndislikesTuit = async (uid: string, tid: string): Promise<any> => {
        return DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});
    }

}