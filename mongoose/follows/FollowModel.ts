/**
 * @file Implements the mongoose Follow model to documents in the follows collection
 */
import * as mongoose from "mongoose";
import FollowSchema from "./FollowSchema";

const FollowModel = mongoose.model('FollowModel', FollowSchema)

export default FollowModel;