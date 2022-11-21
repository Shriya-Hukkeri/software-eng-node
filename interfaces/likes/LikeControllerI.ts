/**
 * @file Declares the apis for Like related operation management
 */
import {Request, Response} from "express";

export default interface LikeControllerI {
    findUsersThatLikedTuit(req: Request, res: Response): void;
    findTuitsLikedByUser(req: Request, res: Response): void;
    userLikesATuit(req: Request, res: Response): void;
    userUnlikesATuit(req: Request, res: Response): void;
    userTogglesTuitLikes (req: Request, res: Response): void;
}