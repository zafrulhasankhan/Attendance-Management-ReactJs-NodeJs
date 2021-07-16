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

router.get("/student-details/:id/:course_code",function(req,res){
    const student_id = req.params.id;
    const course_code = req.params.course_code;
    const sql = "select * from `course_wise_student-list` where student_id = ? and course_code =? ";
    con.query(sql, [student_id,course_code], (error,result) => {
     if(error){
         console.log(error);
     }
     else{
         console.log(result);
         res.send(result);
     }
    })
})

router.get("/check-id/:email",function(req,res){
  const email = req.params.email;
  con.query("select student_id from user where email = ?", [email], (error,result) => {
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        res.send(result);
    }
   })
})


router.post("/update-info",function(req,res){
    const student_id = req.body.student_id;
    const student_email = req.body.student_email;
    con.query("update user set student_id = ? where email = ?", [student_id,student_email], (error,result) => {
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
