/**
 * @file Declares the apis for Bookmark related operation management
 */
import {Request, Response} from "express";

export default interface BookmarkControllerI {
    userBookmarksATuit(req: Request, res: Response): void;
    userUnbookmarksATuit(req: Request, res: Response): void;
    findTuitsBookmarkedByUser(req: Request, res: Response): void;
}