/**
 * @file Controller for handling dislikes
 */
import DislikeControllerI from "../interfaces/dislikes/DislikeCotrollerI";
import LikeDao from "../daos/LikeDao";
import DislikeDao from "../daos/DislikeDao";
import TuitDao from "../daos/TuitDao";
import {Express, Request, Response} from "express";
import Tuit from "../models/tuits/Tuit";

/**
 * @class This class implements the RESTful web service api for handling dislikes related operations.
 * @property {DislikeDao} dislikeDao implementing the CRUD operations
 * @property {DislikeController} dislikeController implementing the CRUD APIs
 */
export default class DislikeController implements DislikeControllerI {

    private static dislikeController: DislikeController | null = null;
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static dislikeDao: DislikeDao = DislikeDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();

    /**
     * Creates a singleton controller instance
     * @param {Express} app An express instance to declare the Web service api
     * @returns dislikeController
     */
    public static getInstance = (app: Express): DislikeController => {
        if (DislikeController.dislikeController === null) {
            DislikeController.dislikeController = new DislikeController();
            app.get("/users/:uid/dislikes", DislikeController.dislikeController.findAllTuitsDislikedByUser);
            app.get("/users/:uid/dislikes/:tid", DislikeController.dislikeController.findUserDislikesTuit);
            app.put("/users/:uid/dislikes/:tid", DislikeController.dislikeController.userTogglesTuitDislikes);
        }
        return DislikeController.dislikeController;
    }

    private constructor() {
    }

    /**
     * Retrieves all the tuits disliked by a particular user
     * @param {Request} req is the request from clients with uid as the users primary key
     * @param {Response} res is the response to the client as JSON that contains tuits list
     */
    findAllTuitsDislikedByUser = (req: Request, res: Response) => {
        const uid = req.params.uid
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile._id : uid;

        DislikeController.dislikeDao.findAllTuitsDislikedByUser(userId)
            .then(async dislikes => {
                const dislikesNonNullTuits = dislikes.filter(dislike => dislike.tuit);

                const dislikedTuits = dislikesNonNullTuits.map(dislike => dislike.tuit);

                await this.linkDislikesWithTuits(dislikedTuits, userId);
                res.json(dislikedTuits)
            })
    }

    /**
     * Retrieves the dislike information for a particular user and tuit id
     * @param {Request} req is the request from clients, where uid is the primary key of the user
     * and tid is the tuit id of the tuit that is disliked
     * @param {Response} res is the response to client as JSON that contains tuit that was disliked
     */
    findUserDislikesTuit = (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;

        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile._id : uid

        DislikeController.dislikeDao.findUserDislikesTuit(userId, tid)
            .then(dislikes => res.json(dislikes))
    }

    /**
     * Update the tuit stats for a particular user
     * @param {Request} req is the request from client, where uid is the primary key of the user
     * and tid is the tuit id of the tuit that is disliked
     * @param {Response} res is the response to client, as JSON that contains the dislike that was inserted into the
     * database
     */
    userTogglesTuitDislikes = async (req: Request, res: Response) => {
        const dislikeDao = DislikeController.dislikeDao;
        const likeDao = DislikeController.likeDao;
        const tuitDao = DislikeController.tuitDao;

        const uid = req.params.uid;
        const tid = req.params.tid;

        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile._id : uid;

        try {
            const previouslyDisliked = await dislikeDao.findUserDislikesTuit(userId, tid);
            const noOfDislikes = await dislikeDao.countHowManyDislikedTuit(tid);

            let tuit = await tuitDao.findTuitById(tid);

            if (previouslyDisliked) {
                await dislikeDao.userUndislikesTuit(userId, tid);
                tuit.stats.dislikes = noOfDislikes - 1;
            } else {
                await dislikeDao.userDislikesTuit(userId, tid);
                tuit.stats.dislikes = noOfDislikes + 1

                const previouslyLiked = await likeDao.findUserLikesTuit(userId, tid);
                const noOfLikes = await likeDao.countHowManyLikedTuit(tid);
                if (previouslyLiked) {
                    await likeDao.userUnlikesATuit(userId, tid);
                    tuit.stats.likes = noOfLikes - 1;
                }
            }
            await tuitDao.updateLikes(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }

    /**
     * This method changes the links the likes and dislikes with the tuits
     * @param dislikedTuits a list of tuits that are disliked by a particular user
     * @param userId is the primary key of the user
     */
    private async linkDislikesWithTuits(dislikedTuits: Tuit[], userId: string) {
        for (let i = 0; i < dislikedTuits.length; i++) {
            const previouslyLiked = await DislikeController.likeDao.findUserLikesTuit(userId, dislikedTuits[i]._id);
            const previouslyDisliked = await DislikeController.dislikeDao.findUserDislikesTuit(userId, dislikedTuits[i]._id)
            dislikedTuits[i].isLiked = Boolean(previouslyLiked);
            dislikedTuits[i].isDisliked = Boolean(previouslyDisliked)
        }

    }


}