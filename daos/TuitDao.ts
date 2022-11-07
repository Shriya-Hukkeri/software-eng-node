/**
 * @file Implements management and  data storage of tuits.
 */
import Tuit from "../models/tuits/Tuit";
import tuitModel from "../mongoose/tuits/TuitModel";
import TuitDaoI from "../interfaces/tuits/TuitDaoI";

/**
 * @class TuitDoa Implements Data Access Object managing data storage of tuits
 * @implements {TuitDaoI} TuitDaoI
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;

    /**
     * Creates a singleton DAO instance
     * @returns TuitDao
     */
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}


    /**
     * Retrieves all the tuits from tuits collection
     * @returns {Promise} To be notified when the tuits are retrieved from database
     */
    public findAllTuits = async (): Promise<Tuit[]> =>
        tuitModel.find().exec();

    /**
     * Retrieves a single tuit from tuits collection
     * @param {string} tid tuit's primary key
     * @returns {Promise} To be notified when tuit is retrieved from the database
     */
    public findTuitById = async (tid: string): Promise<Tuit> =>
        tuitModel
            .findById(tid)
            .populate("postedBy")
            .exec();

    /**
     * Retrieve all the tuit documents by one user
     * @param {string} uid user's primary key
     * @returns {Promise} To be notified when tuits are retrieved from the database
     */
    public findTuitsByUser=async(uid: string): Promise<Tuit[]> =>
        tuitModel
            .find({postedBy: uid})
            .exec();


    /**
     * Inserts a new tuit into the database
     * @param {string} uid user's primary key
     * @param {Tuit} tuit the tuit to be inserted
     * @returns {Promise} To be notified when tuit is inserted into the database
     */
    public createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        await tuitModel.create({...tuit, postedBy: uid});

    /**
     * Updates a particular tuit in database with new values provided
     * @param {string} tid Primary key of tuit
     * @param {Tuit} tuit Tuit object with new values
     * @returns {Promise} To be notified when tuit is updated in the database
     */
    public updateTuit = async (tid: string, tuit: Tuit): Promise<any> =>
        tuitModel.updateOne(
            {_id: tid},
            {$set: tuit});

    /**
     * Deletes a tuit from the database
     * @param {string} tid Primary key of the tuit
     * @returns {Promise} To be notified when tuit is deleted from the database
     */
    public deleteTuit = async (tid: string): Promise<any> =>
        tuitModel.deleteOne({_id: tid});

    //A3 - additional method
    public deleteTuitByContent = async (tuit: string): Promise<any> =>
        tuitModel.deleteMany({tuit});
}