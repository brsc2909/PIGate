var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var sha256 = require('js-sha256')
var status = "";

/* GET home page. */
router.get('/', function(request, response, next) {
    var config = request.app.get('config');
    response.render('index', {
        title: config.display.title,
        heading: config.display.heading, 
        status: status
    });
});


router.post('/open', function(request, response) {
    var config = request.app.get('config');
    var user = config.users;
    var sys = require('util')
    var exec = require('child_process').exec;
    var child;
    var username = request.body['username'];
    var password = request.body['password'];
    console.log(sha256(password))
    /* GET Userlist page. */

    try {
        if (user[username]) {
            if (sha256(password) == user[username].password) {
                status = "login granted"
                console.log(status);
                child = exec("echo \"your comand goes here\"", function(error, stdout, stderr) {
                    console.log('stdout: ' + stdout);

                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
                });
                response.redirect('/open');
            } else {
                status = "login failed"
                console.log(status);
            }
        }else{
            status = "bad username"
            console.log(status);
        }
    } catch (e) {
        console.log(e);
    }
});

router.get('/open', function(request, response) {
    response.redirect('/');
});
router.get('/userlist', function(request, response) {
    var db = request.db;
    var collection = db.get('usercollection');
    collection.find({}, {}, function(e, docs) {
        console.log("collection");
        response.render('userlist', {
            "userlist": docs
        });
    });
});
router.get('/access_granted', function(request, response) {
    response.render('access_granted', {
        title: 'Access Granted'
    });
});

module.exports = router;