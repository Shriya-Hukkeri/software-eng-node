/**
 * @file Implements the mongoose Dislike model to documents in the dislikes collection
 */
import mongoose from "mongoose";
import DislikeSchema from "./DislikeSchema";

const DislikeModel = mongoose.model('DislikeModel', DislikeSchema);
export default DislikeModel;