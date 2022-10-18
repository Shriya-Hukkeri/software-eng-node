import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDaoI";

export default class UserDao implements UserDaoI {

    private static userDao: UserDao | null = null;
    public static getInstance = () =>{
        if(UserDao.userDao == null){
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }

    async findAllUsers(): Promise<User[]> {
        return UserModel.find();
    }
    async findUserById(uid: string): Promise<any> {
        return UserModel.findById(uid);
    }

    async createUser(user: User): Promise<User>{
        const newUser: any = await UserModel.create(user);
        return new User(newUser.username, newUser.password, newUser.firstname||'',
            newUser.lastname||'', newUser.email||'');
    }
    async deleteUser(uid: string): Promise<any> {
        return UserModel.deleteOne({_id: uid});
    }
    async updateUser(uid: string, user: any): Promise<any> {
        return UserModel.updateOne({_id: uid}, {$set: user});
    }
}