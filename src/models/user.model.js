'use strict';
var dbConn = require('./../../config/db.config');
 var User = function (user){
     this.userid = user.id,
     this.username = user.username,
     this.userpassword = user.password
 }

 User.find = (user,result) =>{
    dbConn.query("SELECT * FROM user WHERE username = ? AND password = ? LIMIT 100;", [user.login,user.password], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        }
        else {
          result(null, res);
        }
      });
 }

 module.exports = User ; 