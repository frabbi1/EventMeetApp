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

router.get('/', authcheck,(req,res)=>{
  var sql2 = "select * from users";
    db.query(sql2,(err,result2)=>{
      if(err) throw err;
      res.render('newEvent',{
        users: result2
      });
    })

});
router.post('/added', authcheck, (req,res) => {
    var name = req.body.ename;
    var loc = req.body.location;
    var sdate = req.body.startDate;
    var edate = req.body.endDate;
    var admin = req.body.admin;

    //res.send("Added succesfully");
    var sql = `INSERT INTO events (name, location, start_date, end_date, admin) VALUES ('${name}','${loc}','${sdate}','${edate}','${admin}' )`;
    db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.redirect('/events')
  });
});
router.post('/saved', (req,res) => {
    var name = req.body.ename;
    var loc = req.body.location;
    var sdate = req.body.startDate;
    var edate = req.body.endDate;
    var id = req.body.eventId;

    //res.send("Added succesfully");
    var sql = `UPDATE events SET name='${name}', location='${loc}', start_date = '${sdate}', end_date = '${edate}' WHERE events.id='${id}'`;
    db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.redirect('/events');
  });
});

module.exports = router;
