/**
 * @file Implements an Express Node HTTP server.
 */
import express from 'express';
import tuitController from "./controllers/TuitController";
import userController from "./controllers/UserController";
import likeController from "./controllers/LikeController";
import followController from "./controllers/FollowController";
import bookmarkController from "./controllers/BookmarkController";
import messageController from "./controllers/MessageController";
import mongoose from "mongoose";
import authController from "./controllers/AuthController";

const cors = require('cors')
const session = require('express-session');


const CONNECTION_STRING = process.env.MONGODB_URI || "mongodb+srv://Shriya:Password123@cluster0.brny7ia.mongodb.net/tuiter?retryWrites=true&w=majority"
mongoose.connect(CONNECTION_STRING);
mongoose.connection.once("open", function(){
    console.log("Database connected successfully");
})


const app = express();
app.use(
    cors({
       credentials: true,
       origin: process.env.CORS_ORIGIN
           ? process.env.CORS_ORIGIN
           : "http://localhost:3000",
    })
);



let sess = {
    secret: "C[Ps9E%q6woaip",
    saveUninitialized: true,
    resave: true,
    cookie: {
        sameSite: (process.env.ENV ? process.env.ENV : "dev") === "production" ? "none" : "lax",
        secure: process.env.ENV === "production",
    },
};

if (process.env.ENV === 'production') {
   app.set('trust proxy', 1) // trust first proxy
   sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))
app.use(express.json());

//instantiate the controllers
tuitController.getInstance(app)
userController.getInstance(app);
likeController.getInstance(app);
followController.getInstance(app);
bookmarkController.getInstance(app);
messageController.getInstance(app);
authController(app);
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);