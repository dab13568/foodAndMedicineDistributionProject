var express = require('express');
var router = express.Router();
const usersModel = require('../models/users')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/add-user", async function(req, res) {
  console.log("הגעתיייייי");
  let { massage, succeeded } = await usersModel.addUser(req.body.sub,req.body.type,req.body.address);
  res.status(succeeded ? 200 : 400);
  res.send(massage);
});
router.post("/get-user", async function(req, res) {
  let { user} = await usersModel.getUser(req.body.sub);
  res.send(user);
});
module.exports = router;





