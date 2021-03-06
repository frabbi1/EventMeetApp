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
router.get('/',authcheck,(req,res)=>{

  res.render('adminWelcome');
  
  //res.send(req.user);

});

router.get("/profile", authcheck, (req,res)=>{
 
  res.render("profile",{
    profile: req.user
  });
})
router.get("/events", authcheck, (req,res)=>{
  var sql = `select * from events where admin = '${req.user.email}'`;
  db.query(sql, (err,result) =>{
    if(err) throw err;
    res.render("user-events",{
      events: result
    });
  })
 
})
router.get("/events/show/:id", authcheck, (req,res)=>{
  var id = req.params.id;
  var sql = "select * from `events` where id= '"+id+"' ";
  db.query(sql, (err,result)=>{
    if(err) throw err;
    console.log(result);
    res.render('event-details',{

      row: result[0]
    });
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
    res.redirect('/adminWelcome/events');
  });
});

module.exports = router;
