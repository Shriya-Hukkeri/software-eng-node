/**
 * @file Represents the bookmark DAO methods
 */
import Bookmark from "../../models/bookmarks/Bookmarks";

export default interface BookmarkDaoI {
    userBookmarksATuit(uid: string, tid: string): Promise<Bookmark>;
    userUnbookmarksATuit(uid: string, tid: string): Promise<any>;
    findTuitsBookmarkedByUser(uid: string): Promise<Bookmark[]>;
}