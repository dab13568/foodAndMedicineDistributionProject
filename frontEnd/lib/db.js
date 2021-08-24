const MongoClient = require("mongodb").MongoClient;

const dbConnectionUrl =
  "mongodb+srv://shlomichi1351:1q2w3e4r5t@cluster0.87d1e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

function initialize(
  dbName="myFirstDatabase",
  dbCollectionName,
  successCallback,
  failureCallback
) {
  MongoClient.connect(
    dbConnectionUrl,
    {useNewUrlParser: true, useUnifiedTopology: true},
    function(err, dbInstance) {
      if (err) {
        console.log(`[MongoDB connection] ERROR: ${err}`);
        failureCallback(err); // this should be "caught" by the calling function
      } else {
        const dbObject = dbInstance.db(dbName);
        const dbCollection = dbObject.collection(dbCollectionName);
        console.log("[MongoDB connection] SUCCESS");

        successCallback(dbCollection);
      }
    }
  );
}

module.exports = {
  initialize
};
