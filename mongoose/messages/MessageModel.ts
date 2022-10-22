/**
 * @file Implements the mongoose Message model to documents in the messages collection
 */
import * as mongoose from "mongoose";
import MessageSchema from "./MessageSchema";

const MessageModel = mongoose.model('MessageModel', MessageSchema);

export default MessageModel;