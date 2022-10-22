/**
 * @file Declares the apis for Follow related operation management
 */
import {Request, Response} from "express";

export default interface FollowControllerI {
    findUsersFollowedByThisUser(req: Request, res: Response): void;
    findAllFollowersOfThisUser(req: Request, res: Response): void;
    followUser(req: Request, res: Response): void;
    unfollowUser(req: Request, res: Response): void;

}