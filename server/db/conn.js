const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "../config.env" });
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db)

var _db;

module.exports = {
    connectToServer: (callback) => {
        client.connect()
        .then((db)=> {
            _db = db.db("employees");
            console.log("DB connection successful.");
            console.log("Successfully connected to MongoDB");
        })
        .catch((err) => {
            console.log(`DB conncetion error ${err}`);
            return callback(err);
        });
    },
    
    
    getDb: () => {
        return _db;
    },
};