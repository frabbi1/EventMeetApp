var express = require('express');
var router = express.Router();
var db = require("../config/database");


var authcheck = (req,res,next)=>{
  console.log(req.user);
  
  if(!req.user){  
    res.redirect('/');
    
  }
  else{
    next();
  }

};

router.get('/',authcheck, (req,res)=>{
  var sql = "select * from users";
  db.query(sql, (err,result)=>{
    if(err) throw err;
    res.render('users',{
      lists: result
    });
  });

});

module.exports = router;