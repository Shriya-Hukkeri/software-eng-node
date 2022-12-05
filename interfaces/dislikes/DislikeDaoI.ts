/**
 * @file Represents the dislike DAO methods
 */
import Dislike from "../../models/dislikes/Dislikes";

export default interface DislikeDaoI {
    findAllTuitsDislikedByUser (uid: string): Promise<Dislike[]>;
    userDislikesTuit (uid: string, tid: string): Promise<Dislike>;
    userUndislikesTuit (uid: string, tid: string): Promise<any>;
    countHowManyDislikedTuit (tid: string): Promise<any>;
    findUserDislikesTuit (uid: string, tid: string): Promise<Dislike>;
};