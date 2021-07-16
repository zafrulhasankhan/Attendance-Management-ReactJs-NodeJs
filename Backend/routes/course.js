const express = require('express');
const router = express.Router();
var con = require('../config/dbconfig');

router.post("/add", function (req, res) {

    const course_code = req.body.course_code;
    const course_name = req.body.course_name;
    const course_pin = req.body.course_pin;
    const course_owner_email = req.body.course_owner_email;

    const sql_course_check = "SELECT id FROM `course_list` WHERE course_code = ?"
    var value = con.query(sql_course_check, [course_code], (error, result) => {
        if (!result.length) {

            con.query("insert into course_list (course_code,course_name,course_pin,email) values (?,?,?,?)", [course_code, course_name, course_pin, course_owner_email], (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    //console.log(result)
                    res.send(result);
                    //console.log(result)
                }
            })

        }
    })

})


router.get("/joinedCourses/:email", function (req, res) {

    const email = req.params.email;
    con.query("(SELECT course_code FROM `course_list` WHERE email = ?) UNION (SELECT course_code FROM `course_wise_student-list` WHERE email =?)", [email, email], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            //console.log(result);
            res.send(result);

        }
    })

})

router.post("/join", function (req, res) {

    const pin = req.body.pin;
    const student_email = req.body.student_email;
    const student_name = req.body.student_name;
    const student_id = req.body.student_Id;
    
    con.query("select * from course_list where course_pin = ?", [pin], (err, result) => {
        if (err) {
            console.log(err)
        } else {

            if(result.length){
                
            var rows = JSON.parse(JSON.stringify(result[0]));
            

            con.query("select * from `course_wise_student-list` where email = ? and course_code = ? ", [student_email,rows.course_code], (err, result1) => {
            
            if(!result1.length){

            // con.query("select * from `user` where email = ? ", [student_email], (err, result2) => {

                //var rows1 = JSON.parse(JSON.stringify(result2[0]));
                

                con.query("INSERT INTO `course_wise_student-list`(`student_id`, `student_name`, `email`, `course_code`) VALUES (?,?,?,?)",
                [student_id, student_name, student_email, rows.course_code], (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("data success inserted");
                        res.send("yes")
                    }
                })

            // })
        }
        else{
            res.send({msg : "Course already login"})
        }

        })

            //   if(result.length){

            //   }
        }else{
            res.send({msg : "Course not found"})
        }
    }
    })

})


router.get("/info/:code", function (req, res) {

    const code = req.params.code;
    con.query("select * from course_list where course_code = ?", [code], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            //console.log(result)
            res.send(result);
            //console.log(result)
        }
    })

})


module.exports = router;
