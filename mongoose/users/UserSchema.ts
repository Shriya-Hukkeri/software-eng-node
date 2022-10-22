/**
 * @file represents the way a user in stored in the database
 */

import mongoose from "mongoose";

/**
 * UserSchema to represent user documents stored in the MongoDB database.
 * @typedef User represents a user on tuiter
 * @property {String} username user's account name
 * @property {String} password user's account password
 * @property {String} firstName user's first name
 * @property {String} lastName user's last name
 * @property {String} email user's email
 * @property {String} profilePhoto user's profile photo
 * @property {String} headerImage user's header image
 * @property {String} accountType user's account type
 * @property {String} maritalStatus user's marital status
 * @property {String} biography user's biography
 * @property {Date} dateOfBirth user's birthday
 * @property {Date} joined creation time of user's account
 * @property {Number} latitude user's latitude location
 * @property {Number} longitude user's longitude location
 */
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstname: String,
    lastname: String,
    email: String,
    profilePhoto: String,
    headerImage: String,
    accountType: {type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL']},
    maritalStatus: {type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED']},
    biography: String,
    dateOfBirth: Date,
    joined: {type: Date, default: Date.now},
    location: {
        latitude: {type: Number, default: 0.0},
        longitude: {type: Number, default: 0.0},
    }
}, {collection: 'users'});
export default UserSchema;