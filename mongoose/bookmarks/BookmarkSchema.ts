/**
 * @file Implements the mongoose schema for bookmarks
 */
import Bookmark from "../../models/bookmarks/Bookmarks";
import * as mongoose from "mongoose";
import {Schema} from "mongoose";

/**
 * BookmarkSchema to represent bookmark relation documents stored in the MongoDB database.
 * @typedef Bookmark represents a bookmark instance between a user and a tuit
 * @property {ObjectId} tuit reference to a tuit that is bookmarked by a user
 * @property {ObjectId} bookmarkedBy reference to the user who bookmarked the tuit
 */
const BookmarkSchema = new mongoose.Schema<Bookmark>({
    tuit: {type: Schema.Types.ObjectId, ref: 'TuitModel'},
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: 'UserModel'},
}, {collection: "bookmarks"});

export default BookmarkSchema;