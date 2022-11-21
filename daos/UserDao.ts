/**
 * @file Implements management and  data storage of users.
 */
import User from "../models/users/User";
import UserModel from "../mongoose/users/UserModel";
import UserDaoI from "../interfaces/users/UserDaoI";

/**
 * @class UserDao Implements Data Access Object managing data storage of users
 * @implements {UserDaoI} UserDaoI
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class UserDao implements UserDaoI {
    private static userDao: UserDao | null = null;

    /**
     * Creates a singleton DAO instance
     * @returns UserDao
     */
    public static getInstance = (): UserDao => {
        if (UserDao.userDao === null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }

    private constructor() {
    }

    /**
     * Retrieves all the users from users collection
     * @returns {Promise} To be notified when the users are retrieved from database
     */
    async findAllUsers(): Promise<User[]> {
        return UserModel.find().exec();
    }

    /**
     * Retrieves a single user from users collection
     * @param {string} uid user's primary key
     * @returns {Promise} To be notified when user is retrieved from the database
     */
    async findUserById(uid: string): Promise<User> {
        return UserModel.findById(uid).exec();
    }

    /**
     * Inserts a new user into the database
     * @param {User} user to be inserted into the database
     * @returns {Promise} To be notified when user is inserted into the database
     */
    async createUser(user: User): Promise<User> {
        // @ts-ignore
        return UserModel.create(user);
    }

    /**
     * Deletes a user from the database
     * @param {string} uid Primary key of the user
     * @returns {Promise} To be notified when user is deleted from the database
     */
    async deleteUser(uid: string): Promise<any> {
        return UserModel.deleteOne({_id: uid});
    }

    /**
     * Updates a particular user in database with new values provided
     * @param {string} uid Primary key of user
     * @param {User} user User object with new values
     * @returns {Promise} To be notified when user is updated in the database
     */
    async updateUser(uid: string, user: any): Promise<any> {
        return  UserModel.updateOne({_id: uid},{$set: user});
    }


    //A3 - additional methods
    async findUserByCredentials(username: string, password: string) {
        return UserModel.findOne({username: username, password: password})

    }

    async deleteUsersByUsername(username: string) {
        return UserModel.deleteMany({username})
    }

    findUserByUsername = async (username: string): Promise<any> =>
        UserModel.findOne({username});

}
