/**
 * @file Controller for handling users
 */
import {Express, Request, Response} from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/users/UserControllerI";

/**
 * @class This class implements the RESTful web service api for handling user related operations.
 * @property {UserDao} userDao implementing the CRUD operations
 * @property {UserController} userController implementing the CRUD APIs
 */
export default class UserController implements UserControllerI {

    private static userDao: UserDao = UserDao.getInstance();
    private static userController: UserController | null = null;

    /**
     * Creates a singleton controller instance
     * @param {Express} app An express instance to declare the Web service api
     * @returns userController
     */
    public static getInstance = (app: Express): UserController => {
        if (UserController.userController === null) {
            UserController.userController = new UserController();
            app.get('/users', UserController.userController.findAllUsers);
            app.get('/users/:userid', UserController.userController.findUserById);
            app.post('/users', UserController.userController.createUser);
            app.delete('/users/:userid', UserController.userController.deleteUser);
            app.put('/users/:userid', UserController.userController.updateUser);

            //A3 - additional apis for testing front end
            app.delete("/users/username/:username/delete", UserController.userController.deleteUsersByUsername);
            app.post("/api/login", UserController.userController.login);
        }
        return UserController.userController;
    }

    private constructor() {
    }

    /**
     * Retrieves all the users from the database
     * @param {Request} req is the request from the client
     * @param {Response} res is the response to the client as JSON
     */
    findAllUsers = (req: Request, res: Response) =>
        UserController.userDao.findAllUsers()
            .then(users => res.json(users));

    /**
     * Retrieves one particular user from the database
     * @param {Request} req from the client with userid as the primary key of the user to be retrieved
     * @param {Response} res is the response to the client as JSON
     */
    findUserById = (req: Request, res: Response) =>
        UserController.userDao.findUserById(req.params.userid)
            .then(user => res.json(user));

    /**
     * Creates a new user in the database
     * @param {Request} req from the client which includes th JSON body with user details
     * @param {Response} res is the response to the client as JSON
     */
    createUser = (req: Request, res: Response) =>
        UserController.userDao.createUser(req.body)
            .then(user => res.json(user));

    /**
     * Deletes a user from the database
     * @param {Request}  req from the client with userid as the primary key of the user to be deleted
     * @param {Response} res is the response to the client with the delete status
     */
    deleteUser = (req: Request, res: Response) =>
        UserController.userDao.deleteUser(req.params.userid)
            .then(status => res.json(status));

    /**
     * Updates an existing user in the database
     * @param {Request} req from the client with userid as the primary key of the user to be modified
     * @param {Response} res is the response to the client with the update status
     */
    updateUser = (req: Request, res: Response) =>
        UserController.userDao.updateUser(req.params.userid, req.body)
            .then(status => res.json(status));


    //A3- additional method
    deleteUsersByUsername = (req: Request, res: Response) =>
        UserController.userDao.deleteUsersByUsername(req.params.username)
            .then(status => res.json(status));

    login = (req: Request, res: Response) =>
        UserController.userDao.findUserByCredentials(req.body.username, req.body.password)
            .then(user => res.json(user));
}