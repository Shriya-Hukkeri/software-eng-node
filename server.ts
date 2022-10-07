/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
import tuitController from "./controllers/TuitController";
import userController from "./controllers/UserController";
import mongoose from "mongoose";

const CONNECTION_STRING = "mongodb://localhost:27017/tuiter"
mongoose.connect(CONNECTION_STRING);


const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

tuitController.getInstance(app);
userController.getInstance(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
