/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
import tuitController from "./controllers/TuitController";
import userController from "./controllers/UserController";
import likeController from "./controllers/LikeController";
import followController from "./controllers/FollowController";
import bookmarkController from "./controllers/BookmarkController";
import mongoose from "mongoose";

const CONNECTION_STRING = process.env.MONGODB_URI || "mongodb+srv://Shriya:Password123@cluster0.brny7ia.mongodb.net/tuiter?retryWrites=true&w=majority"
mongoose.connect(CONNECTION_STRING);


const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

tuitController.getInstance(app)
userController.getInstance(app);
likeController.getInstance(app);
followController.getInstance(app);
bookmarkController.getInstance(app);


/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
