/**
 * @file Implements the mongoose schema for dislikes
 */
import mongoose, {Schema} from "mongoose";

/**
 * DislikeSchema to represent dislike relation documents stored in the MongoDB database.
 * @property {ObjectId} tuit reference to tuit that is disliked
 * @property {ObjectId} dislikedBy reference to the user who disliked the tuit
 */
const DislikeSchema = new mongoose.Schema({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    dislikedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "dislikes"});
export default DislikeSchema;