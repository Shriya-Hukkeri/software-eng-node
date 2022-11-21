import DislikeControllerI from "../interfaces/dislikes/DislikeCotrollerI";
import LikeDao from "../daos/LikeDao";
import DislikeDao from "../daos/DislikeDao";
import TuitDao from "../daos/TuitDao";
import {Express, Request, Response} from "express";
import Tuit from "../models/tuits/Tuit";

export default class DislikeController implements DislikeControllerI {

    private static dislikeController: DislikeController | null = null;
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static dislikeDao: DislikeDao = DislikeDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();

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

    findUserDislikesTuit = (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;

        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile._id : uid

        DislikeController.dislikeDao.findUserDislikesTuit(userId, tid)
            .then(dislikes => res.json(dislikes))
    }

    userTogglesTuitDislikes = async (req: Request, res: Response) => {
        const dislikeDao = DislikeController.dislikeDao;
        const likeDao = DislikeController.likeDao;
        const tuitDao = DislikeController.tuitDao;

        const uid = req.params.uid;
        const tid = req.params.tid;

        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile._id : uid;

        try{
            const previouslyDisliked = await dislikeDao.findUserDislikesTuit(userId, tid);
            const noOfDislikes = await dislikeDao.countHowManyDislikedTuit(tid);

            let tuit = await tuitDao.findTuitById(tid);

            if(previouslyDisliked){
                await dislikeDao.userUndislikesTuit(userId, tid);
                tuit.stats.dislikes = noOfDislikes - 1;
            } else{
                await dislikeDao.userDislikesTuit(userId, tid);
                tuit.stats.dislikes = noOfDislikes + 1;
            }
            await tuitDao.updateLikes(tid, tuit.stats);
            res.sendStatus(200);
        } catch(e){
            res.sendStatus(404);
        }
    }


    private async linkDislikesWithTuits(dislikedTuits: Tuit[], userId: any) {
        for (let i = 0; i < dislikedTuits.length; i++) {
            const previouslyLiked = await DislikeController.likeDao.findUserLikesTuit(userId, dislikedTuits[i]._id);
            const previouslyDisliked = await DislikeController.dislikeDao.findUserDislikesTuit(userId, dislikedTuits[i]._id)
            dislikedTuits[i].isLiked = Boolean(previouslyLiked);
            dislikedTuits[i].isDisliked = Boolean(previouslyDisliked)
        }

    }


}