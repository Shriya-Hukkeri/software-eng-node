/**
 * @file Represents the like DAO methods
 */
import Like from "../../models/likes/Like";

export default interface LikeDaoI{
    findUsersThatLikedTuit(tid: string): Promise<Like[]>;
    findTuitsLikedByUser(uid: string): Promise<Like[]>;
    userLikesATuit(uid: string, tid: string): Promise<Like>;
    userUnlikesATuit(uid: string, tid: string):  Promise<any>
};