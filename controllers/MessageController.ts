/**
 * @file Controller for handling messages
 */
import MessageControllerI from "../interfaces/messages/MessageControllerI";
import {Express, Request, Response} from "express";
import MessageDao from "../daos/MessageDao";

/**
 * @class This class implements the RESTful web service api for handling follows related operations.
 * @property {MessageDao} messageDao implementing the CRUD operations
 * @property {MessageController} followController implementing the CRUD APIs
 */
export default class MessageController implements MessageControllerI {

    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    /**
     * Creates a singleton controller instance
     * @param {Express} app An express instance to declare the Web service api
     * @returns messageController
     */
    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.get("/users/messages/:uid", MessageController.messageController.findMessagesReceived);
            app.get("/users/:uid/messages", MessageController.messageController.findMessagesSent);
            app.delete("/messages/:mid", MessageController.messageController.userDeletesAMessage);
            app.post("/users/:uid1/messages/:uid2", MessageController.messageController.userSendsAMessage);
        }
        return MessageController.messageController;
    }

    private constructor() {
    }


    /**
     * Retrieves all the messages received by a particular user
     * @param {Request} req is the request from clients with uid as the primary
     * key of the user who has received messages
     * @param {Response} res is the response to the client as JSON that contains messages list
     */
    findMessagesReceived(req: Request, res: Response): void {
        MessageController.messageDao.findMessagesReceived(req.params.uid)
            .then(messagesReceived => res.json(messagesReceived));
    }

    /**
     * Retrieves all the messages sent by a particular user
     * @param {Request} req is the request from clients with uid as the primary
     * key of the user who has sent messages
     * @param {Response} res is the response to the client as JSON that contains messages list
     */
    findMessagesSent(req: Request, res: Response): void {
        MessageController.messageDao.findMessagesSent(req.params.uid)
            .then(messagesSent => res.json(messagesSent));
    }

    /**
     * Deletes a message instance from the messages collection in the database
     * @param {Request} req is the request from clients with
     * mid as primary key of message that has to be deleted
     * @param {Response} res is the response to the client that contains the delete status
     */
    userDeletesAMessage(req: Request, res: Response): void {
        MessageController.messageDao.userDeletesAMessage(req.params.mid)
            .then(status => res.json(status));
    }

    /**
     * Inserts a message instance into messages collection in the database
     * @param {Request} req is the request from clients with
     * uid1 as primary key of user whos sends the message, uid2 as the primary key
     * of the user to whoom the message is sent and message to be sent
     * @param {Response} res is the response to the client as JSON that contains
     * the message instance that was added in the database
     */
    userSendsAMessage(req: Request, res: Response): void {
        MessageController.messageDao.userSendsAMessage(req.params.uid1, req.params.uid2, req.body)
            .then(message => res.json(message));
    }

}