/**
 * @file Controller for handling tuits
 */

import {Request, Response, Express} from "express";
import TuitControllerI from "../interfaces/tuits/TuitControllerI";
import TuitDao from "../daos/TuitDao";

/**
 * @class This class implements the RESTful web service api for handling tuits related operations.
 * @property {TuitDao} tuitDao implementing the CRUD operations
 * @property {TuitController} tuitController implementing the CRUD APIs
 */
export default class TuitController implements TuitControllerI {

    private tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;

    /**
     * Creates a singleton controller instance
     * @param {Express} app An express instance to declare the Web service api
     * @returns tuitController
     */

    public static getInstance = (app: Express): TuitController => {

        if(TuitController.tuitController === null) {
            TuitController.tuitController = new TuitController();
            app.get("/tuits", TuitController.tuitController.findAllTuits);
            app.get("/users/:uid/tuits", TuitController.tuitController.findTuitsByUser);
            app.get("/tuits/:tid", TuitController.tuitController.findTuitById);
            app.post("/users/:uid/tuits", TuitController.tuitController.createTuitByUser);
            app.put("/tuits/:tid", TuitController.tuitController.updateTuit);
            app.delete("/tuits/:tid", TuitController.tuitController.deleteTuit);
        }

        return TuitController.tuitController;
    }

    private constructor() {}

    /**
     * Retrieves all the tuits from the database
     * @param {Request} req is the request from clients
     * @param {Response} res is the response to the client as JSON
     */
    findAllTuits = (req: Request, res: Response) =>
        this.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));

    /**
     * Retrieves tuits by a particular user from the database
     * @param {Request} req from the client with userid as the primary key of the user whos tuits have to be retrieved
     * @param {Response} res is the response to the client as JSON
     */
    findTuitsByUser = (req: Request, res: Response) =>
        this.tuitDao.findTuitsByUser(req.params.uid)
            .then(tuits  => res.json(tuits));

    /**
     * Retrieves one particular tuit from the database
     * @param {Request} req from the client with tid as the primary key of the tuit to be retrieved
     * @param {Response} res is the response to the client as JSON
     */
    findTuitById = (req: Request, res: Response) =>
        this.tuitDao.findTuitById(req.params.tid)
            .then(tuit => res.json(tuit));

    /**
     * Creates a new tuit for a particular user in the database
     * @param {Request} req is the request from client, including body
     * containing the JSON object with new tuit contents
     * @param {Response} res Represents response to client as JSON
     */
    createTuitByUser = (req: Request, res: Response) =>
        this.tuitDao.createTuitByUser(req.params.uid, req.body)
            .then(tuit => res.json(tuit));

    /**
     * Updates an existing tuit in the database
     * @param {Request} req from the client with tid as the primary key of the tuit to be modified
     * @param {Response} res is the response to the client with the update status
     */
    updateTuit = (req: Request, res: Response) =>
        this.tuitDao.updateTuit(req.params.tid, req.body)
            .then((status) => res.send(status));

    /**
     * Deletes a tuit from the database
     * @param {Request}  req from the client with tid as the primary key of the tuit to be deleted
     * @param {Response} res is the response to the client with the delete status
     */
    deleteTuit = (req: Request, res: Response) =>
        this.tuitDao.deleteTuit(req.params.tid)
            .then((status) => res.send(status));

};

