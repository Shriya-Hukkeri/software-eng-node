import {Express, Request, Response} from "express";
import UserDao from "../daos/UserDao";

const bcrypt = require('bcrypt');
const saltRounds = 10;

const AuthController = (app: Express) => {

    const userDao: UserDao = UserDao.getInstance();

    //User Signup
    const signup = async (req: Request, res: Response) => {
        const newUser = req.body;
        const password = newUser.password;
        const hash = await bcrypt.hash(password, saltRounds);
        newUser.password = hash;

        const existingUser = await userDao.findUserByUsername(req.body.username);
        if (existingUser) {
            res.sendStatus(403);
            return;
        } else {
            const insertedUser = await userDao.createUser(newUser);
            insertedUser.password = '';
            // @ts-ignore
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    }

    //Usr Login
    const login = async (req: Request, res: Response) => {
        const newUser = req.body;
        const username = newUser.username;
        const password = newUser.password;

        const existingUser = await userDao.findUserByUsername(username);

        const match = await bcrypt.compare(password, existingUser.password);

        if (match) {
            existingUser.password = '******';
            // @ts-ignore
            req.session['profile'] = existingUser;
            res.json(existingUser);
        } else {
            res.sendStatus(403);
        }
    }

    const profile = async (req: Request, res: Response) => {
        // @ts-ignore
        const profile = req.session['profile']
        if (profile) {
            res.json(profile)
        } else {
            res.sendStatus(403);
        }
    }

    const logout = async (req: Request, res: Response) => {
        // @ts-ignore
        req.session.destroy();
        res.sendStatus(200);
    }

    //paths
    app.post("/api/auth/signup", signup);
    app.post("/api/auth/login", login);
    app.post("/api/auth/profile", profile);
    app.post("/api/auth/logout", logout);
}

export default AuthController;
