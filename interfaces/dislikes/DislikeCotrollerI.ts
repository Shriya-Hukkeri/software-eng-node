/**
 * @file Declares the apis for Dislike related operation management
 */
import {Request, Response} from "express";

export default interface DislikeControllerI {
    findAllTuitsDislikedByUser(req: Request, res: Response): void;
    findUserDislikesTuit(req: Request, res: Response): void;
    userTogglesTuitDislikes(req: Request, res: Response): void;
}
