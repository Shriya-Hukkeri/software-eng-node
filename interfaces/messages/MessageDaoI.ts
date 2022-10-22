/**
 * @file Represents the message DAO methods
 */
import Message from "../../models/messages/Messages";

export default interface MessageDaoI {
    userSendsAMessage(uid1: string, uid2: string, message: Message): Promise<Message>;
    userDeletesAMessage(mid: string): Promise<any>;
    findMessagesSent(uid: string): Promise<Message[]>;
    findMessagesReceived(uid: string): Promise<Message[]>;
}