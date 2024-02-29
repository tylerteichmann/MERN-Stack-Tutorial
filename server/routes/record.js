const express = require("express");

// recordRoutes is an instance of the express router.
// we use it to define our routes.
// The router will be added as a middleware and will take control of requests startign with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This will help convert the id from string to ObjectId for the _id
const ObjectId = require ("mongodb").ObjectId;

// This section will help you get a list of all the records.
recordRoutes.route("/record").get( async (req, res) => {
    let db_connect = dbo.getDb("employees");

    const records = await db_connect.collection("records").find({}).toArray();
    // await db_connect.collection("records").find({}).toArray((err, result) => {
    //         if (err) throw res.json(err);
    //         res.status(200).json(result);
    //     });
    res.status(200).json(records);
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get((req, res) => {
    let db_connect = dbo.getDb();
    let myquery = { 
        _id: ObjectId(req.params.id)
    }
    db_connect
        .db_connect("records")
        .findOne(myquery, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post((req, res) => {
    let db_connect = dbo.getDb();
    let myobj = { 
        name: req.body.name,
        position: req.body.position,
        level: req.body.level
    };
    db_connect
        .collection("records")
        .insertOne(myobj, (err, response) => {
            if (err) throw err;
            res.json(response);
        });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post((req, res) => {
    let db_connect = dbo.getDb();
    let myquery = { 
        _is: ObjectId(req.params.id) 
    };
    let newvalues = {
        $set: {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level
        }
    };
    db_connect
        .collection("records")
        .updateOne(myquery, newvalues, (err, response) => {
            if (err) throw err;
            console.log("1 document updated");
            res.json(response);
        });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, res) => {
    let db_connect = dbo.getDb();
    let myquery = {
        _id: ObjectId(req.params.id)
    };
    db_connect
        .collection("records")
        .deleteOne(myquery, (req, obj) => {
            if (err) throw err;
            console.log("1 document deleted");
            res.json(obj)
        });
});

module.exports = recordRoutes;