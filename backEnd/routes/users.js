var express = require('express');
var router = express.Router();
const usersModel = require('../models/users')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/add-user", async function(req, res) {
  console.log("הגעתיייייי");
  let { massage, succeeded } = await usersModel.addUser(req.body.sub,req.body.type,req.body.address,req.body.phone);
  res.status(succeeded ? 200 : 400);
  res.send(succeeded);
});

router.post("/get-user", async function(req, res) {
  console.log("gfdfgjfdekjrtghnfmjrtghbnfmjrthgbn")
  let user = await usersModel.getUser(req.body.sub);
  console.log(req.body.sub);
  res.send(user);
});
module.exports = router;





