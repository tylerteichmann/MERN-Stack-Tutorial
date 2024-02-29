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
    try {
        const db_connect = await dbo.getDb("employees");
        const result = await db_connect.collection("records").find({}).toArray();
        res.status(200).json(result);
    } catch (err) {
        throw res.status(400).json(err);
    }

    // The following code provided on the MongoDB website, however is incorrect and will not run.
    // let db_connect = dbo.getDb("employees");
    // db_connect
    //     .collection("records")
    //     .find({})
    //     .toArray(function (err, result) {
    //         if (err) throw err;
    //         res.json(result);
    //     });
    });

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get( async (req, res) => {    
    try {
        const db_connect = await dbo.getDb();
        const result = await db_connect.collection("records").find({}).toArray();
        res.status(200).json(result);
    } catch (err) {
        throw res.status(400).json(err);
    };

    // The following code provided on the MongoDB website, however is incorrect and will not run.
    // let db_connect = dbo.getDb();
    // let myquery = { _id: ObjectId(req.params.id) };
    // db_connect
    //     .collection("records")
    //     .findOne(myquery, function (err, result) {
    //         if (err) throw err;
    //         res.json(result);
    //   });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(async (req, res) => {
    try {
        const db_connect = await dbo.getDb();
        const my_obj = {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        };
        const result = await db_connect.collection("records").insertOne(my_obj);
        res.status(200).json(result);
    } catch (err) {
        throw res.status(400).json(err);
    };

    // The following code provided on the MongoDB website, however is incorrect and will not run.
    // let db_connect = dbo.getDb();
    // let myobj = {
    //     name: req.body.name,
    //     position: req.body.position,
    //     level: req.body.level,
    // };
    // db_connect.collection("records").insertOne(myobj, function (err, res) {
    //     if (err) throw err;
    //     response.json(res);
    // });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(async (req, res) => {
    try {
        const db_connect = await dbo.getDb();
        const myquery = {
            _id: new ObjectId(req.params.id)
        };
        const newvalues = {
            $set: {
                name: req.body.name,
                position: req.body.position,
                level: req.body.level,
            },            
        }
        const result = await db_connect.collection("records").updateOne(myquery, newvalues);
        res.status(200).json(result);
    } catch (err) {
        throw res.status(400).json(err);
    };

    // The following code provided on the MongoDB website, however is incorrect and will not run.
    // let db_connect = dbo.getDb();
    // let myquery = { _id: ObjectId(req.params.id) };
    // let newvalues = {
    //     $set: {
    //         name: req.body.name,
    //         position: req.body.position,
    //         level: req.body.level,
    //     },
    // };
    // db_connect
    //     .collection("records")
    //     .updateOne(myquery, newvalues, function (err, res) {
    //         if (err) throw err;
    //         console.log("1 document updated");
    //         response.json(res);
    //     });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete(async (req, res) => {
    try {
        const db_connect = await dbo.getDb();
        const myquery = {
            _id: new ObjectId(req.params.id)
        };
        const result = await db_connect.collection("records").deleteOne(myquery);
        console.log("1 document deleted");
        res.status(200).json(result);
    } catch (err) {
        throw res.status(400).json(err);
    };

    // The following code provided on the MongoDB website, however is incorrect and will not run.
    // let db_connect = dbo.getDb();
    // let myquery = { _id: ObjectId(req.params.id) };
    // db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    //     if (err) throw err;
    //     console.log("1 document deleted");
    //     response.json(obj);
    // });
});

module.exports = recordRoutes;