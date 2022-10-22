import User from "../users/User";

/**
 * @class Message Represents a message sent by one user to another user
 * @property {User} sender this is the user who sends the message
 * @property {User} receiver is the user to whom the message is sent
 * @property {string} messageBody is the actual message sent (content of the message)
 * @property {Date} sentDate is the date on which the message was sent
 */
export default class Message {
    private sender: User | null = null;
    private receiver: User | null = null;
    private messageBody: string = '';
    private sentDate: Date = new Date();
}
