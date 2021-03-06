var express = require('express');
var router = express.Router();
var passport = require('passport');
var db = require("../config/database");

router.get("/google",passport.authenticate('google',{
    scope: ['profile','email']
}));

router.get("/google/redirect",passport.authenticate('google') ,(req,res) =>{
    //res.render("first");
    //res.send(req.user);
    if(req.user.role === 'admin'){
        res.redirect('/adminWelcome/');
    } else{
        res.redirect('/welcome');
    }
});


router.get("/logout", (req,res) => {
    req.logOut();
    req.session = null;
    res.redirect('/');
});

module.exports = router;