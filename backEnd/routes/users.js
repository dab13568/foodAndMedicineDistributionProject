var express = require('express');
var router = express.Router();
const usersModel = require('../models/users')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/add-user", async function(req, res) {
  console.log("הגעתיייייי");
  let { massage, succeeded } = await usersModel.addUser(req.body.sub,req.body.type,req.body.address,req.body.phone,req.body.name);
  res.status(succeeded ? 200 : 400);
  res.send(succeeded);
});
router.post("/update-user", async function(req, res) {
  let message="good"
  if( req.body!=={})
  {
    for (let item in req.body)
    {
      let answer = await usersModel.updateUser(item,req.body[item]);
      if(answer.succeeded===false)
        message="bad"
      //console.log(req.body.sub);
    }
  }

  res.send(message);

});
router.post("/get-user", async function(req, res) {
  console.log("gfdfgjfdekjrtghnfmjrtghbnfmjrthgbn")
  let user = await usersModel.getUser(req.body.sub);
  console.log(req.body.sub);
  res.send(user);
});
router.post("/get-manager", async function(req, res) {
  let user = await usersModel.getManager();
  res.send(user);
});


router.post("/get-all-users", async function(req, res) {
  let users = await usersModel.getAllUsers();
  res.send(users);
});

module.exports = router;





