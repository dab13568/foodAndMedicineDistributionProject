const { MongoClient,ObjectId } = require('mongodb');
let express = require('express');


const uri = "mongodb+srv://shlomichi1351:1q2w3e4r5t@cluster0.87d1e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let client = new MongoClient(uri);

// Connect to the MongoDB cluster
let db;
client.connect().then(() => {
    console.log("connected to mongoDB cloud")
    // Make the appropriate DB calls
    db = client.db("FoodAndMedicineDistribution");

});


module.exports.addBlogs = async function(date,subject,message)
{



    // if address not exist add the address into the DB
    await db.collection("Blogs").insertOne({
        "date":date,
        "subject":subject,
        "message":message
    });

    return { massage: "the blog added successfully!", succeeded: true };

}

module.exports.getAllBlogs = async function() {
    return db.collection("Blogs").find().toArray();
}