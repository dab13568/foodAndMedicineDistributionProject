var express = require('express');
var router = express.Router();
const blogModel = require('../models/Blogs')

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.post("/add-blog", async function(req, res) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    let { succeeded } = await blogModel.addBlogs(today,req.body.subject,req.body.message);
    console.log(req.body)
    res.status(succeeded ? 200 : 400);
    res.send(succeeded);
});

router.post("/get-all-blogs", async function(req, res) {

    let blogs = await blogModel.getAllBlogs();
    res.send(blogs);
});
module.exports = router;
