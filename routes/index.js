var express = require('express')
, hash = require('../pass').hash
, cookieParser = require('cookie-parser')
, bodyParser  = require('body-parser')
, session     = require('express-session');;
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var sha256 = require('js-sha256')
var status = "";




/* GET home page. */
router.get('/', function(req, res, next) {
    var config = req.app.get('config');
    res.render('index', {
        title: config.display.title,
        heading: config.display.heading,
        status: status
    });
});


// 
router.post('/open', function(req, res) {
    var sys = require('util')
    var exec = require('child_process').exec;
    var child;

    // fetch the username and pass from the user input
    var username = req.body['username'];
    var password = req.body['password'];
    console.log(sha256(password))
    /* GET Userlist page. */
    if (login(req, username, password)) {
        // any linux command can be used here 
        child = exec("echo \"your comand goes here\"", function(error, stdout, stderr) {
            console.log('stdout: ' + stdout);

            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
        res.send({redirect: '/open'});
    }
});

router.get('/open', function(req, res) {
    res.redirect('/');
});


/*******************************************************
**      accessing the configuration settings           *
********************************************************/

router.post('/configuration', function(req, res){
    var username = req.body['username'];
    var password = req.body['password'];
    
    if(login(req, username, password)){
        console.log("logged into config settings");
        res.send({redirect: '/configuration'})
    }
});

router.get('/configuration', function(req, res){
    if(true){
        res.render('configuration', {
            heading: "configuration"    
        });
    }else{
        res.status(403).end('forbidden');
    }

});

// not used as of yet 

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


/****************************************************************************************
**                                      Authentication                                 **
*****************************************************************************************/


/** this function conpared the username and sha256 password and returns true if a match **/
var login = function(req, username, password) {
    var config = req.app.get('config');
    var user = config.users;

    try {
        if (user[username]) {
            if (sha256(password) == user[username].password) {
                console.log("login success from func");
                return true;
            } else {
                status = "login failed"
                console.log(status);
                return false;
            }
        } else {
            status = "bad username"
            console.log(status);
            return false;
        }
    } catch (e) {
        console.log(e);
        return false;
    }
    return false;
}

function restrict(req, res, next) { 
    if (req.session.user) { 
        next(); 
    } else {
        req.session.error = 'Access denied!'; 
        res.redirect('/'); 
    } 
}




function authenticate(name, pass, fn) { 
    if (!module.parent) console.log('authenticating %s:%s', name, pass);
    var user = users[name]; 
    console.log('en esta m..............')
    // query the db for the given username
    if (!user) return fn(new Error('cannot find user'));
    // apply the same algorithm to the POSTed password, applying
    // the hash against the pass / salt, if there is a match we 
    // found the user 
    hash(pass, user.salt, function(err, hash){
    if (err) return fn(err);
    if (hash.toString() == user.hash) return fn(null, user);
    fn(new Error('invalid password'));
    })
} 

module.exports = router;