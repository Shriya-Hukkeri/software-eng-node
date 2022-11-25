/**
 * @file Implements the mongoose schema for likes
 */
import mongoose, {Schema} from "mongoose";

/**
 * LikeSchema to represent like relation documents stored in the MongoDB database.
 * @property {ObjectId} tuit reference to tuit that is liked
 * @property {ObjectId} likedBy reference to the user who liked the tuit
 */
const LikeSchema = new mongoose.Schema({
    tuit: {type: Schema.Types.ObjectId, ref: 'TuitModel'},
    likedBy: {type: Schema.Types.ObjectId, ref: 'UserModel'},
}, {collection: "likes"});
export default LikeSchema;