/**
 * @file Controller for handling follows
 */
import FollowControllerI from "../interfaces/follows/FollowControllerI";
import FollowDao from "../daos/FollowDao";
import {Express, Response,Request} from "express";


/**
 * @class This class implements the RESTful web service api for handling follows related operations.
 * @property {FollowDao} followDao implementing the CRUD operations
 * @property {FollowController} followController implementing the CRUD APIs
 */
export default class FollowController implements FollowControllerI {

    private static followDao:FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
     * Creates a singleton controller instance
     * @param {Express} app An express instance to declare the Web service api
     * @returns followController
     */
    public static getInstance = (app:Express): FollowController => {
        if(FollowController.followController === null){
            FollowController.followController = new FollowController();
            app.get("/users/:uid/followedBy", FollowController.followController.findUsersFollowedByThisUser);
            app.get("/users/:uid/followers", FollowController.followController.findAllFollowersOfThisUser);
            app.post("/users/:uid1/follows/:uid2", FollowController.followController.followUser);
            app.delete("/users/:uid1/follows/:uid2", FollowController.followController.unfollowUser);
        }
        return FollowController.followController;
    }

    private constructor() {
    }

    /**
     * Retrieves all the followers of a particular user
     * @param {Request} req is the request from clients with uid as the primary
     * key of the user being followed
     * @param {Response} res is the response to the client as JSON that contains users list
     */
    findAllFollowersOfThisUser(req: Request, res: Response): void {
        FollowController.followDao.findAllFollowersOfThisUser(req.params.uid)
            .then(followers => res.json(followers));

    }

    /**
     * Retrieves all the users that are followed by a particular user
     * @param {Request} req is the request from clients with uid as the primary
     * key of the user who follows other users
     * @param {Response} res is the response to the client as JSON that contains users list
     */
    findUsersFollowedByThisUser(req: Request, res: Response): void {
        FollowController.followDao.findUsersFollowedByThisUser(req.params.uid)
            .then(followedBy => res.json(followedBy));
    }

    /**
     * Inserts a follow instance into follows collection in the database
     * @param {Request} req is the request from clients with
     * uid1 as primary key of user who is following the user uid2
     * @param {Response} res is the response to the client as JSON that contains
     * the follow instance that was added in the database
     */
    followUser(req: Request, res: Response): void {
        FollowController.followDao.followUser(req.params.uid1, req.params.uid2)
            .then(follows => res.json(follows));
    }

    /**
     * Deletes a like instance from the likes collection in the database
     * @param {Request} req is the request from clients with
     * uid1 as primary key of user who is following the user uid2
     * @param {Response} res is the response to the client that conatins the delete status
     */
    unfollowUser(req: Request, res: Response): void {
        FollowController.followDao.unfollowUser(req.params.uid1, req.params.uid2)
            .then(status => res.send(status));
    }
}