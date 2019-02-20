var mysql = require('mysql');


var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "demoDB",
    password: ""
  });
  
db.connect((err) => {
    if(err) throw err;
    console.log("Database connected");
});

module.exports = db;
