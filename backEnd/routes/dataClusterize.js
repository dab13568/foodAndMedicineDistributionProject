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
  //console.log("temp",data.distAddresses)
  let userMatch
  for (let item in data.distAddresses) {
    userMatch=undefined

    //console.log("addressesDays", data.distAddresses[item][2])
    let dist=10000
    for(let key in data.users) {

      let userAddress = data.users[key].cordinate
      let usersDays= data.users[key].daysInWeek
     // console.log("userDays",usersDays)

      data.distAddresses[item][2]=data.distAddresses[item][2].map(x=>parseFloat(x))
      if( data.distAddresses[item][2].every(function(value, index) { return usersDays.includes(value)}) ){
        //console.log("item", data.distAddresses[item])
        let temp = haversineDistance(userAddress, data.distAddresses[item][0])

        if (dist > temp) {
          dist = temp
          userMatch = data.users[key]
          //console.log("match", data.distAddresses[item][1])

        }
      }
    }
    if(userMatch!==undefined) {
      console.log("user-match",userMatch)
      arr.push({userId: userMatch, match: data.distAddresses[item][1]})
    }
  }
   console.log("arr",arr)
  res.send(arr)
});

module.exports = router;

