import {Express, Response,Request} from "express";
import BookmarkControllerI from "../interfaces/bookmarks/BookmarkControllerI";
import BookmarkDao from "../daos/BookmarkDao";

export default class BookmarkController implements BookmarkControllerI {

    private static bookmarkDao:BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController:BookmarkController | null = null;

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

    findTuitsBookmarkedByUser(req: Request, res: Response): void {
       BookmarkController.bookmarkDao.findTuitsBookmarkedByUser(req.params.uid)
           .then(tuits => res.json(tuits));
    }

    userBookmarksATuit(req: Request, res: Response): void {
        BookmarkController.bookmarkDao.userBookmarksATuit(req.params.uid, req.params.tid)
            .then(bookmarks => res.json(bookmarks))
    }

    userUnbookmarksATuit(req: Request, res: Response): void {
        BookmarkController.bookmarkDao.userUnbookmarksATuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));
    }
}