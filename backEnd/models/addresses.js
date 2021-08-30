const { MongoClient } = require('mongodb');
let express = require('express');

var app = express.Router();
/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */






const uri = "mongodb+srv://shlomichi1351:1q2w3e4r5t@cluster0.87d1e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let client = new MongoClient(uri);

// Connect to the MongoDB cluster
let db;
client.connect().then(() => {
    console.log("connected to mongoDB cloud")
    // Make the appropriate DB calls
    db = client.db("FoodAndMedicineDistribution");

});
module.exports.addAddress = async function(addressRecord)
{
    // check if the user name already exist
    // if username not exist add the user into the DB
    await db.collection.insertOne(addressRecord, (error, result) => { // callback of insertOne
        if (error) throw error;
        // return updated list
        db.collection.find().toArray((_error, _result) => { // callback of find
            if (_error) throw _error;
            return { massage: "User added successfully!", succeeded: true,updatedList:_result };

        });
    });
}
