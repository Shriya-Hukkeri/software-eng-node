import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDaoI";
import UserModel from "../mongoose/UserModel";
import User from "../models/User";

export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}
    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find();

    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        const tuits: any = await TuitModel.find({postedBy: uid});
        const users = await UserModel.findById(uid);

        const tuitsByUsers : Tuit[] | PromiseLike<Tuit[]> = [];
        if(users != null){
            tuits.forEach((tuit: {tuit: any; postedOn: Date | undefined; postedBy: string| undefined;})=>{
                tuitsByUsers.push(new Tuit(tuit.tuit, tuit.postedOn, tuit.postedBy) )
            });
        }
        return tuitsByUsers;
    }

    findTuitById = async (tid: string): Promise<any> =>
        TuitModel.findById(tid);

    async createTuit(tuit: Tuit): Promise<User> {
        const createdTuit: any = await TuitModel.create(tuit);
        const user = await UserModel.findById(createdTuit.postedBy);

        if(user != null){
            return (new User(user.username, user.password, user.firstname||'', user.lastname||'',
                user.email||''));
        }
        return new User();
    }

    updateTuit = async (tid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne(
            {_id: tid},
            {$set: tuit});

    deleteTuit = async (tid: string): Promise<any> =>
        TuitModel.deleteOne({_id: tid});
}