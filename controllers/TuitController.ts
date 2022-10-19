import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitControllerI";
import Tuit from "../models/Tuit";

export default class TuitController implements TuitControllerI {
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;
    public static getInstance = (app: Express): TuitController => {
        if(TuitController.tuitController === null) {
            TuitController.tuitController = new TuitController();
            app.get("/tuits", TuitController.tuitController.findAllTuits);
            app.get("/users/:uid/tuits", TuitController.tuitController.findTuitsByUser);
            app.get("/tuits/:tid", TuitController.tuitController.findTuitById);
            app.post("/tuits", TuitController.tuitController.createTuit);
            app.put("/tuits/:tid", TuitController.tuitController.updateTuit);
            app.delete("/tuits/:tid", TuitController.tuitController.deleteTuit);
        }
        return TuitController.tuitController;
    }

    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));

    findTuitsByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitsByUser(req.params.uid)
            .then(tuits  => res.json(tuits));

       findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitById(req.params.tid)
            .then(tuit => res.json(tuit));

    createTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.createTuit(req.body)
            .then(tuit => res.json(tuit));

    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.updateTuit(req.params.tid, req.body)
            .then((status) => res.send(status));

    deleteTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuit(req.params.tid)
            .then((status) => res.send(status));

};

