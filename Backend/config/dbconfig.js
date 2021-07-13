var mysql = require('mysql');
var DbConnectConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: 'Attendance-Management-ReactJs-NodeJs'
}

var con = mysql.createConnection(DbConnectConfig);
con.connect(function (error) {
    if (error) {
        console.log("connection failed")
    }
    else {
        console.log("connection successfully")

    }
});

module.exports = con;