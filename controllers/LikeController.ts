/**
 * @file Controller for handling likes
 */

import LikeControllerI from "../interfaces/likes/LikeControllerI";
import LikeDao from "../daos/LikeDao";
import {Express, Response, Request} from "express";
import Tuit from "../models/tuits/Tuit";
import DislikeDao from "../daos/DislikeDao";
import TuitDao from "../daos/TuitDao";

/**
 * @class This class implements the RESTful web service api for handling likes related operations.
 * @property {LikeDao} likeDao implementing the CRUD operations
 * @property {LikeController} likeController implementing the CRUD APIs
 */
export default class LikeController implements LikeControllerI {

    private static likeDao: LikeDao = LikeDao.getInstance();
    private static likeController: LikeController | null = null;
    private static dislikeDao: DislikeDao = DislikeDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();

    /**
     * Creates a singleton controller instance
     * @param {Express} app An express instance to declare the Web service api
     * @returns likeController
     */
    public static getInstance = (app: Express): LikeController => {
        if (LikeController.likeController === null) {
            LikeController.likeController = new LikeController();
            app.get("/users/:uid/likes", LikeController.likeController.findTuitsLikedByUser);
            app.get("/likes/tuits/:tid", LikeController.likeController.findUsersThatLikedTuit);
            //app.post("/users/:uid/likes/:tid", LikeController.likeController.userLikesATuit);
            // app.delete("/users/:uid/likes/:tid", LikeController.likeController.userUnlikesATuit);
            app.get("/users/:uid/likes/:tid", LikeController.likeController.findUserLikesTuit);
            app.put("/users/:uid/likes/:tid", LikeController.likeController.userTogglesTuitLikes);

        }
        return LikeController.likeController;
    }

    private constructor() {
    }

    /**
     * Retrieves all the tuits liked by a particular user
     * @param {Request} req is the request from clients with uid as the users primary key
     * @param {Response} res is the response to the client as JSON that contains tuits list
     */
    findTuitsLikedByUser(req: Request, res: Response): void {
        const uid = req.params.uid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile._id : uid;

        LikeController.likeDao.findTuitsLikedByUser(userId)
            .then(async likes => {
                const likesNonNullTuits = likes.filter(like => like.tuit);

                const likedTuits = likesNonNullTuits.map(like => like.tuit);

                await this.linkLikesWithTuits(likedTuits, userId)
                res.json(likedTuits);
            });
    }

    /**
     * Retrieves all the users that liked by a particular tuit
     * @param {Request} req is the request from clients with tid as the tuit's primary key
     * @param {Response} res is the response to the client as JSON which contains users list
     */
    findUsersThatLikedTuit(req: Request, res: Response): void {
        LikeController.likeDao.findUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));
    }

    /**
     * Inserts a new like instance into the likes collection in the database
     * @param {Request} req is the request from clients with tid as the tuit's primary key
     * and uid as the user's primary key
     * @param {Response} res is the response to the client as JSON which contains the like
     * that was inserted in the databases
     */
    userLikesATuit(req: Request, res: Response): void {
        LikeController.likeDao.userLikesATuit(req.params.uid, req.params.tid)
            .then(likes => res.json(likes));
    }

    /**
     * Deletes a like instance from the likes collection in the database
     * @param {Request} req is the request from clients with tid as the tuit's primary key
     * and uid as the user's primary key
     * @param {Response} res is the response to the client with delete status
     */
    userUnlikesATuit(req: Request, res: Response): void {
        LikeController.likeDao.userUnlikesATuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));
    }


    findUserLikesTuit = (req: Request, res: Response) => {
        console.log("entered COntroller", req)
        const uid = req.params.uid;
        const tid = req.params.tid;
        //@ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile._id : uid;

        LikeController.likeDao.findUserLikesTuit(userId, tid)
            .then(likes => res.json(likes))


    }

    userTogglesTuitLikes = async (req: Request, res: Response) => {
        const likeDao = LikeController.likeDao;
        const dislikeDao = LikeController.dislikeDao;
        const tuitDao = LikeController.tuitDao;

        const uid = req.params.uid;
        const tid = req.params.tid;

        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile._id : uid;

        try {
            const previouslyLiked = await likeDao.findUserLikesTuit(userId, tid);
            const noOfLikes = await likeDao.countHowManyLikedTuit(tid);

            let tuit = await tuitDao.findTuitById(tid);

            if (previouslyLiked) {
                await likeDao.userUnlikesATuit(userId, tid);
                tuit.stats.likes = noOfLikes - 1;
            } else {
                await likeDao.userLikesATuit(userId, tid);
                tuit.stats.likes = noOfLikes + 1;
            }
            await tuitDao.updateLikes(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }


    }

    private async linkLikesWithTuits(likedTuits: Tuit[], userId: string) {
        for (let i = 0; i < likedTuits.length; i++) {
            const previouslyLiked = await LikeController.likeDao.findUserLikesTuit(userId, likedTuits[i]._id);
            const previouslyDisliked = await LikeController.dislikeDao.findUserDislikesTuit(userId, likedTuits[i]._id);

            likedTuits[i].isLiked = Boolean(previouslyLiked);
            likedTuits[i].isDisliked = Boolean(previouslyDisliked);
        }

    }
}