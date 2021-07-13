const express = require('express');
const router = express.Router();
var con = require('../config/dbconfig');


router.post("/register",function(req,res){
    console.log(req.body.name);
    const name = req.body.name;
    const email = req.body.email;
    const profile_photo = req.body.profile_photo;
    const sql = "INSERT INTO `user`(`name`,`email`,`profile_photo`) VALUES (?,?,?)";

    con.query(sql, [name, email, profile_photo], (error) => {
        if (error) {
            console.log(error)
        }
        else {
            console.log("Data inserted successfully")

        }
})
})

router.get("/student-details/:id",function(req,res){
    console.log(req.params.id);
    const student_id = req.params.id;
    const sql = "select * from `user` where student_id = ? ";
    con.query(sql, [student_id], (error,result) => {
     if(error){
         console.log(error);
     }
     else{
         console.log(result);
         res.send(result);
     }
    })
})


module.exports = router;
