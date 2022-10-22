/**
 * @file Controller for handling likes
 */

import LikeControllerI from "../interfaces/likes/LikeControllerI";
import LikeDao from "../daos/LikeDao";
import {Express, Response,Request} from "express";

/**
 * @class This class implements the RESTful web service api for handling likes related operations.
 * @property {LikeDao} likeDao implementing the CRUD operations
 * @property {LikeController} likeController implementing the CRUD APIs
 */
export default class LikeController implements LikeControllerI {

    private static likeDao:LikeDao = LikeDao.getInstance();
    private static likeController: LikeController | null = null;

    /**
     * Creates a singleton controller instance
     * @param {Express} app An express instance to declare the Web service api
     * @returns likeController
     */
    public static getInstance = (app: Express): LikeController => {
        if(LikeController.likeController === null){
            LikeController.likeController = new LikeController();
            app.get("/users/:uid/likes", LikeController.likeController.findTuitsLikedByUser);
            app.get("/likes/tuits/:tid", LikeController.likeController.findUsersThatLikedTuit);
            app.post("/users/:uid/likes/:tid", LikeController.likeController.userLikesATuit);
            app.delete("/users/:uid/likes/:tid", LikeController.likeController.userUnlikesATuit);

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
        LikeController.likeDao.findTuitsLikedByUser(req.params.uid)
            .then(likes => res.json(likes));
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


}