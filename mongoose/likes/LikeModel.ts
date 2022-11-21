/**
 * @file Implements the mongoose Like model to documents in the likes collection
 */
import mongoose from "mongoose";
import LikeSchema from "./LikeSchema";

const LikeModel = mongoose.model('LikeModel', LikeSchema)

export default LikeModel;