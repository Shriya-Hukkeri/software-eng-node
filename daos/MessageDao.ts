/**
 * @file Implements management and  data storage of messages.
 */
import MessageDaoI from "../interfaces/messages/MessageDaoI";
import Message from "../models/messages/Messages";
import MessageModel from "../mongoose/messages/MessageModel";

/**
 * @class MessageDao Implements Data Access Object managing data storage of messages
 * @implements {MessageDaoI} MessageDaoI
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {

    private static messageDao:MessageDao | null = null;

    /**
     * Creates a singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null){
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {
    }

    /**
     * Retrieves all the messages received by a particular user
     * @param {string} uid User's primary key
     * @returns {Promise} To be notified when the messages are retrieved from database
     */
    findMessagesReceived(uid: string): Promise<Message[]> {
        return MessageModel.find({receiver: uid});
    }

    /**
     * Retrieves all the messages sent by a particular user
     * @param {string} uid User's primary key
     * @returns {Promise} To be notified when the messages are retrieved from database
     */
    findMessagesSent(uid: string): Promise<Message[]> {
        return MessageModel.find({sender: uid});
    }

    /**
     * Deletes a message instance from messages collection in the database
     * @param {string} mid primary key of message to be deleted
     * @returns {Promise} To be notified when the message instance is removed from the database
     */
    userDeletesAMessage(mid: string): Promise<any> {
        return MessageModel.deleteOne({_id: mid});
    }

    /**
     * Creates a message instance into messages collection in the database
     * @param {string} uid1 primary key of the user who sends the message
     * @param {string} uid2 primary key of the user who receives the message
     * @param {Message} message the content(instance) to be inserted into the database
     * @returns {Promise} To be notified when the message instance is created in the database
     */
    userSendsAMessage(uid1: string, uid2: string, message: Message): Promise<Message> {
        return MessageModel.create({...message, sender: uid1, receiver: uid2});
    }
}