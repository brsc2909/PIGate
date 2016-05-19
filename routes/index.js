var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var sha256 = require('js-sha256')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'PI Gate',
        heading: 'Carpark'
    });
});



router.post('/open', function(request, response) {
    var sys = require('util')
    var exec = require('child_process').exec;
    var child;
    console.log("body " + request.body);
    var username = request.body['username'];
    var password = request.body['password'];

    /* GET Userlist page. */

    MongoClient.connect('mongodb://localhost:27017/pigate', function(err, db) {
        if (err) {
            throw err;
        }
        try {
            db.collection('users').find().toArray(function(err, result) {
                if (err) {
                    throw err;
                }
                try {
                    // I used the toLowerCase function here so that the username would not be case sensative
                    if (sha256(password) == result[0].password && username.toLowerCase() == result[0].username.toLowerCase()) {
                        console.log("login granted");
                        child = exec("python /home/pi/GATE.py", function(error, stdout, stderr) {
                            console.log('stdout: ' + stdout);

                            if (error !== null) {
                                console.log('exec error: ' + error);
                            }
                        });
                        response.redirect('/access_granted');
                    } else {
                        console.log("login failed");
                    }
                } catch (e) {
                    console.log(e);
                }
            });
        }catch(e){
        	console.log(e);
        }
    });
});

router.get('/open', function(request, response) {
    response.redirect('/');
});


router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({}, {}, function(e, docs) {
        console.log("collection");
        res.render('userlist', {
            "userlist": docs
        });
    });
});

router.get('/access_granted', function(req, res) {
    res.render('access_granted', {
        title: 'Access Granted'
    });
});

module.exports = router;



