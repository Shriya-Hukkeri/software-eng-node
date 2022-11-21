/**
 * @file Represents the way Tuit is stored in the database
 */
import mongoose, {Schema} from "mongoose";

/**
 * TuitSchema to represent tuit documents stored in the MongoDB database.
 * @typedef Tuit represents a tuit posted on tuiter
 * @property {String} tuit tuit's content
 * @property {Date} postedOn creation time of the tuit
 * @property {ObjectId} postedBy reference to the user who posted the tuit
 */
const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedOn: {type: Date, default: Date.now},
    postedBy: {type: Schema.Types.ObjectId, ref: 'UserModel'},
    stats: {
        replies: {type: Number, default: 0},
        retuits: {type: Number, default: 0},
        likes: {type: Number, default: 0},
        dislikes: {type: Number, default: 0}
    }

}, {collection: "tuits"});

export default TuitSchema;