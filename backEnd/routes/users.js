var express = require('express');
var router = express.Router();
const usersModel = require('../models/users')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/add-user", async function(req, res) {
  console.log("הגעתיייייי");
  let { massage, succeeded } = await usersModel.addUser(req.body.sub,req.body.type,req.body.city,req.body.street);
  res.status(succeeded ? 200 : 400);
  res.send(massage);
});
module.exports = router;





