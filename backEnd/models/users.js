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
app.post("/AddUser", (request, response) => {
    const item = request.body;
    db.collection("users").insertOne(item, (error, result) => { // callback of insertOne
        if (error) throw error;
        // return updated list

    });
});

/**
 * Function that receives a username and permission and checks whether the user has the appropriate permission
 */




module.exports.checkPermission = async function checkPermission(username, permission) {
    let type = await getType(username);
    let permissions = { manager: 3, employee: 2, customer: 1 };

    // returns if the user permission is great or equal to the excepted permission
    if (type !== undefined)
        return permissions[type] >= permissions[permission];
    return false;
}

/** 
 * Function that check if user exist in the DB
 * else return undefined
 */
module.exports.login = async function(username, password) {
    let user = await db.collection("users").findOne({ "username": username });


    if (user.username === username && user.password === password && user.active) {


        return user;
    }
    return undefined;
}
 function login_connected(username) {
    let user =   db.collection("users").findOne({ "username": username });

    if (user.username === username) {

        return user;
    }
    return undefined;
}
 module.exports.login_connected=login_connected;
/**
 * Function that returns the type of user
 */
async function getType(username) {
    // search the user name in th DB and return his type
    let user = await db.collection("users").findOne({ "username": username });

    if (user !== null && user.username === username && user.active) {
        return user.type;
    }
    return undefined;
}
module.exports.getType = getType

/**
 * Function that receives user data and adds it to DB
 */
module.exports.addUser = async function(id,type,city,street) {
    let username = id;
    console.log(username);
    // check if the user name already exist
    if (await getType(username) !== undefined)
        return { massage: "Username already exist!", succeeded: false };

    // if username not exist add the user into the DB
    await db.collection("users").insertOne({
        "Id": username,
        "type": type,
        "city": city,
        "street": street,
        "phone": ""
    });

    return { massage: "User added successfully!", succeeded: true };
}



module.exports.updateUser = async function(username, newType) {
    let oldType = await getType(username);

    let succeeded = true,
        message = "User updated successfully!"
    // if the user dont in the DB return false
    if (oldType === undefined)
        return false;

    let user = await this.getUser(username);
    await db.collection("users").findOneAndUpdate({ "username": user.username }, {
        $set: {
            "firstName": user.firstName,
            "lastName": user.lastName,
            "username": user.username,
            "password": user.password,
            "type": newType,
            "image": user.image,
            "active": true
        }
    }).catch(reason => {
        succeeded = false;
        message = reason;
    });
    return { message: message, succeeded: succeeded };;
}

module.exports.getAllUsers = async function() {
    return db.collection("users").find().toArray();
}

module.exports.getUser = async function(username) {
    let user = await db.collection("users").findOne({ username: username })
    return user

}

module.exports.removeUser = async function(username) {
    return await db.collection("users").deleteOne({ username: username })


}