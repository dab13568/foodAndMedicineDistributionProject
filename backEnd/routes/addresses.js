var express = require('express');
var router = express.Router();
const addressesModel = require('../models/addresses')

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.post("/add-address", async function(req, res) {
    let { succeeded } = await addressesModel.addAddress(req.body.address);
    res.status(succeeded ? 200 : 400);
    res.send(succeeded);
});
router.post("/get-all-addresses", async function(req, res) {

    let addresses = await addressesModel.getAllAddresses();
    res.send(addresses);
});
router.post("/get-all-addresses-with-id", async function(req, res) {
    let addresses = await addressesModel.getAllAddressesWithId(req.body.addresses);

    res.send(addresses);
});


router.post("/delete-address", async function(req, res) {
    let { succeeded } = await addressesModel.deleteAddress(req.body.id);
    res.status(succeeded ? 200 : 400);
    console.log("sucsseded:  "+succeeded)

    res.send(succeeded);
});
module.exports = router;
router.post("/update-addresses-types", async function(req, res) {
    let message="good"
    if( req.body!=={})
    {
        for (let item in req.body)
        {
            console.log(req.body)
            let {succeeded} = await addressesModel.updateAddressType(item,req.body[item]);
            if(succeeded===false)
                message="bad"
            //console.log(req.body.sub);
            console.log(message)
        }
    }


    res.send(message);

});
router.post("/update-addresses", async function(req, res) {
    let message="good"
    if( req.body!=={})
    {
        for (let item in req.body)
        {
            let {succeeded} = await addressesModel.updateAddress(item,req.body[item]);
            if(succeeded===false)
                message="bad"
            //console.log(req.body.sub);
            console.log(message)
        }
    }


    res.send(message);

});