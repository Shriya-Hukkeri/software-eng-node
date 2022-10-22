/**
 * @file Controller for handling bookmarks
 */

import {Express, Response,Request} from "express";
import BookmarkControllerI from "../interfaces/bookmarks/BookmarkControllerI";
import BookmarkDao from "../daos/BookmarkDao";

/**
 * @class This class implements the RESTful web service api for handling bookmarks related operations.
 * @property {BookmarkDao} bookmarkDao implementing the CRUD operations
 * @property {BookmarkController} bookmarkController implementing the CRUD APIs
 */
export default class BookmarkController implements BookmarkControllerI {

    private static bookmarkDao:BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController:BookmarkController | null = null;

    /**
     * Creates a singleton controller instance
     * @param {Express} app An express instance to declare the Web service api
     * @returns bookmarkController
     */
    public static getInstance = (app:Express): BookmarkController => {
        if(BookmarkController.bookmarkController === null){
            BookmarkController.bookmarkController = new BookmarkController();
            app.get("/users/:uid/bookmarks", BookmarkController.bookmarkController.findTuitsBookmarkedByUser);
            app.post("/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksATuit);
            app.delete("/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userUnbookmarksATuit);
        }
        return BookmarkController.bookmarkController;
    }

    private constructor() {
    }

    /**
     * Retrieves all the tuits bookmarked by a particular user
     * @param {Request} req is the request from clients
     * @param {Response} res is the response to the client as JSON containing all tuits that are bookmarked
     */
    findTuitsBookmarkedByUser(req: Request, res: Response): void {
       BookmarkController.bookmarkDao.findTuitsBookmarkedByUser(req.params.uid)
           .then(tuits => res.json(tuits));
    }

    /**
     * Inserts a bookmark instance into bookmarks collection in the database
     * @param {Request} req is the request from client, with uid as the primary key of the user who
     * bookmarks a tuit and tid being the primary key of the tuit that is bookmarked
     * @param {Response} res Represents response to client as JSON that contains the bookmark instance that is added in
     * the database
     */
    userBookmarksATuit(req: Request, res: Response): void {
        BookmarkController.bookmarkDao.userBookmarksATuit(req.params.uid, req.params.tid)
            .then(bookmarks => res.json(bookmarks))
    }

    /**
     * Deletes a bookmark instance from bookmarks collection in the database
     * @param {Request} req is the request from client, with uid as the primary key of the user who
     * bookmarks a tuit and tid being the primary key of the tuit that is bookmarked
     * @param {Response} res is the response to the client that contains the delete status
     */
    userUnbookmarksATuit(req: Request, res: Response): void {
        BookmarkController.bookmarkDao.userUnbookmarksATuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));
    }
}