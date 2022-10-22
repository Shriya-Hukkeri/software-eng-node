/**
 * @file Implements the mongoose schema for follows
 */
import Follow from "../../models/follows/Follows";
import * as mongoose from "mongoose";
import {Schema} from "mongoose";

/**
 * FollowSchema to represent follow relation documents stored in the MongoDB database.
 * @typedef Follow represents a follow instance between two users
 * @property {ObjectId} userBeingFollowed reference toa user that is being followed by another user
 * @property {ObjectId} followerOfThisUser reference to the user who follows this particular user
 */
const FollowSchema = new mongoose.Schema<Follow>({
    userBeingFollowed : {type: Schema.Types.ObjectId, ref: 'UserModel'},
    followerOfThisUser : {type: Schema.Types.ObjectId, ref: 'UserModel'},
}, {collection: "follows"});

export default FollowSchema;

