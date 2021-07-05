const express = require('express');
const router = express.Router();
// const app  = express();
// //app.use(cors());
// app.use(express.json());
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


router.post("/register",function(req,res){
    console.log(req.body.name);
    const name = req.body.name;
    console.log(name);
    const email = req.body.email;
    const profile_photo = req.body.profile_photo;
    const sql = "INSERT INTO `student_list`(`name`,`email`,`profile_photo`) VALUES (?,?,?)";

    con.query(sql, [name, email, profile_photo], (error) => {
        if (error) {
            console.log(error)
        }
        else {
            console.log("Data inserted successfully")

        }
})
})

module.exports = router;
