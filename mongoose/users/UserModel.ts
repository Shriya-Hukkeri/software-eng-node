/**
 * @file Implements the mongoose User model to documents in the users collection
 */
import mongoose from "mongoose";
import UserSchema from "./UserSchema";

const UserModel = mongoose.model('UserModel', UserSchema);

export default UserModel;