var express = require('express');
var router = express.Router();
const usersModel = require('../models/users')
const addressesModel = require('../models/addresses')

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.post("/add-address", async function(req, res) {
    //console.log("הגעתיייייי");
    let { massage, succeeded } = await addressesModel.addAddress(req.body.sub,req.body.type,req.body.address,req.body.phone);
    res.status(succeeded ? 200 : 400);
    res.send(succeeded);
});
module.exports = router;