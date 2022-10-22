/**
 * @file Implements management and  data storage of bookmarks.
 */
import BookmarkDaoI from "../interfaces/bookmarks/BookmarkDaoI";
import Bookmark from "../models/bookmarks/Bookmarks";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage of bookmarks
 * @implements {BookmarkDaoI} BookmarkDaoI
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {

    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Creates a singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null){
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {
    }

    /**
     * Retrieves all the tuits bookmarked by a particular user
     * @param {string} uid User's primary key
     * @returns {Promise} To be notified when the bookmarked tuits are retrieved from database
     */
    findTuitsBookmarkedByUser(uid: string): Promise<Bookmark[]> {
        return BookmarkModel.find({bookmarkedBy: uid})
            .populate("tuit")
            .exec();
    }

    /**
     * Inserts a bookmark instance into bookmarks collection in the database
     * @param {string} uid primary key of user who bookmarked a tuit
     * @param {string} tid primary key of the tuit that is bookmarked by the user
     * @returns {Promise} To be notified when the bookmark instance is created in the database
     */
    userBookmarksATuit(uid: string, tid: string): Promise<Bookmark> {
        return BookmarkModel.create({bookmarkedBy: uid, tuit: tid});
    }

    /**
     * Deletes a bookmark instance from bookmarks collection in the database
     * @param {string} uid primary key of user who wants to unbookmark a tuit
     * @param {string} tid primary key of the tuit that is unbookmarked by the user
     * @returns {Promise} To be notified when the bookmark instance is removed from the database
     */
    userUnbookmarksATuit(uid: string, tid: string): Promise<any> {
        return BookmarkModel.deleteOne({bookmarkedBy: uid, tuit: tid});
    }
}