const { MongoClient,ObjectId } = require('mongodb');
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


async function getType(address) {
    // search the user name in th DB and return his type
    let a = await db.collection("addresses").findOne({"address":address});

    if (a !== null && a.address === address) {
        return a;
    }
    return undefined;
}
module.exports.getType = getType

module.exports.addAddress = async function(addressRecord)
{

    // check if the address name already exist
    if (await getType(addressRecord) !== undefined)
        return { massage: "address already exist!", succeeded: false };

    // if address not exist add the address into the DB
    await db.collection("addresses").insertOne({
        "address":addressRecord,
        "type":2,
        "daysInWeek":[0,1,2,3,4,5]
    });

    return { massage: "address added successfully!", succeeded: true };

}
module.exports.getAllAddresses = async function() {
    return db.collection("addresses").find().toArray();
}

module.exports.getAllAddressesWithId = async function(userAddresses) {
    let arr=[]
    for(let index in userAddresses)
    arr.push(await db.collection("addresses").find({"_id":ObjectId(userAddresses[index])}).toArray());
    console.log("arr",arr)

    return arr
}
module.exports.deleteAddress = async function(id) {
    let a = await db.collection("addresses").findOne({"_id":id});
    if (a===undefined)
    {

        console.log("a undefined")
        return { succeeded: false };

    }
    await db.collection("addresses").deleteOne({ "_id": ObjectId(id) })
    return { succeeded: true };


}
module.exports.updateAddressType = async function(id,val) {
    //let oldType = await getType(username);

    let succeeded = true,
        message = "User updated successfully!"

    /*db.collection.updateOne({ Id: sub }, { $set: "daysInWeek": daysInWeek }, (error, result) => {
        if (error) throw error;
        // send back entire updated list, to make sure frontend data is up-to-date
        db.collection.find().toArray(function (_error, _result) {
            if (_error) throw _error;
            response.json(_result);
        });
    });*/


    //let user = await this.getUser(username);
    await db.collection("addresses").findOneAndUpdate({ "_id": ObjectId(id) }, {
        $set: {
            "type": val.value,

        }
    }).catch(reason => {
        succeeded = false;
        message = reason;
    });
    return { message: message, succeeded: succeeded };
}

module.exports.updateAddress = async function(id,value) {
    //let oldType = await getType(username);

    let succeeded = true,
        message = "User updated successfully!"

    /*db.collection.updateOne({ Id: sub }, { $set: "daysInWeek": daysInWeek }, (error, result) => {
        if (error) throw error;
        // send back entire updated list, to make sure frontend data is up-to-date
        db.collection.find().toArray(function (_error, _result) {
            if (_error) throw _error;
            response.json(_result);
        });
    });*/


    //let user = await this.getUser(username);
    await db.collection("addresses").findOneAndUpdate({ "_id": ObjectId(id) }, {
        $set: {
            "daysInWeek": value,

        }
    }).catch(reason => {
        succeeded = false;
        message = reason;
    });
    return { message: message, succeeded: succeeded };
}



