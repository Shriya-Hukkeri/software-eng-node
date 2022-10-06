import mongoose, {Schema} from "mongoose";
import Tuit from "../models/Tuit";

const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedon: {type: Date, default: Date.now},
    postedby: {type: String}
}, {collection: "tuits"});
export default TuitSchema;