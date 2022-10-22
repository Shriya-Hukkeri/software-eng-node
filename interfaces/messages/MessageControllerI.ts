/**
 * @file Declares the apis for Message related operation management
 */
import {Request, Response} from "express";

export default interface MessageControllerI {
    userSendsAMessage(req: Request, res: Response): void;
    userDeletesAMessage(req: Request, res: Response): void;
    findMessagesSent(req: Request, res: Response): void;
    findMessagesReceived(req: Request, res: Response): void;
}