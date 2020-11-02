import mongoose from "mongoose";
import TutorialModel from "./tutorial.model";
const dbConfig = require("../config/db.config.js");

mongoose.Promise = global.Promise;

export function GetDB() {
    const db = {};
    db.mongoose = mongoose;
    db.url = dbConfig.url;
    db.tutorials = TutorialModel(mongoose);

    return db;
}