/**
 * @file Implements the mongoose schema for messages
 */
import * as mongoose from "mongoose";
import Message from "../../models/messages/Messages";
import {Schema} from "mongoose";

/**
 * MessageSchema to represent message relation documents stored in the MongoDB database.
 * @typedef Message represents a message instance between two users
 * @property {ObjectId} sender reference to a user who sends the message
 * @property {ObjectId} receiver reference to the user who receives the message
 * @property {String} messageBody reference to the content of the message that is sent
 * @property {Date} sentDate reference to the date on which the message is sent
 */
const MessageSchema = new mongoose.Schema<Message>({
    sender: {type: Schema.Types.ObjectId, ref: 'UserModel'},
    receiver: {type: Schema.Types.ObjectId, ref: 'UserModel'},
    messageBody: {type: String, required: true},
    sentDate: {type: Date, default: Date.now()},
},{collection: "messages"});

export default MessageSchema;
