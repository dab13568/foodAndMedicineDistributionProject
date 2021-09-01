var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const haversine = require("haversine");
var nodeKmeans = require("node-kmeans");
const haversineDistance = require('haversine-distance')

router.post("/", function(req, res, next) {

  console.log(req.body);
  var data =req.body.data;
  let vectors = new Array();
  for (let i = 0; i < data.length; i++) {
    vectors[i] = [data[i][0], data[i][1]];
  }

  const kmeans = require("node-kmeans");
  kmeans.clusterize(vectors, {k: req.body.k,distance: (a,b)=>haversine({latitude:a[0],longitude:a[1]}, {latitude:b[0],longitude:b[1]})}, (err, result) => {
    if (err) {
      console.error(err);
      res.status(400);
      res.json(err);
    }
    else {
      console.log("%o", result);
      res.json(result);
    }
  });
});
router.post("/matchUsers", function(req, res, next) {
  var data=req.body;
  let arr=[]
  console.log("temp",data.distAddresses)

  for(let key in data.users) {
    let userAddress = data.users[key].cordinate

    let dist=100000000000
    let match
    for (let item in data.distAddresses) {
      console.log("item",data.distAddresses[item])
      let temp=haversineDistance(userAddress,data.distAddresses[item][0])

      if(dist> temp) {
        dist = temp
        match = data.distAddresses[item][1]
        console.log("match",data.distAddresses[item][1])

      }
    }
    arr.push({userId:data.users[key].Id,match:match})
  }
  res.send(arr)
});

module.exports = router;
