const express = require('express');
const router = express.Router();
var con = require('../config/dbconfig');


router.post("/register", function (req, res) {

    const name = req.body.name;
    const email = req.body.email;
    const profile_photo = req.body.profile_photo;
    const sql_exist = "select * from user where email = ?";
    const sql = "INSERT INTO `user`(`name`,`email`,`profile_photo`) VALUES (?,?,?)";

    con.query(sql_exist, [email], (error, result) => {
        if (result.length) {
            res.send("yes insert")
        }
        else {
            con.query(sql, [name, email, profile_photo], (error) => {
                if (error) {
                    console.log(error)
                }
                else {
                    //console.log("Data inserted successfully")
                    res.send("yes insert");

                }
            })
        }
    })
})

router.get("/student-details/:id/:course_code", function (req, res) {
    const student_id = req.params.id;
    const course_code = req.params.course_code;
    const sql = "select * from `course_wise_student-list` where student_id = ? and course_code =? ";
    con.query(sql, [student_id, course_code], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            res.send(result);
        }
    })
})


//people list 
router.get("/people/:course_code", function (req, res) {
    const course_code = req.params.course_code;
    const sql = "select `course_wise_student-list`.student_id,`course_wise_student-list`.student_name,`course_wise_student-list`.email,course_list.email as tecEmail  from `course_wise_student-list`,course_list where  `course_wise_student-list`.course_code =? and `course_list`.course_code =? ";
    con.query(sql, [course_code, course_code], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            res.send(result);
        }
    })
})


router.get("/check-id/:email", function (req, res) {
    const email = req.params.email;
    con.query("select student_id from user where email = ?", [email], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {

            res.send(result);
        }
    })
})

//retrieve for techname 
router.get("/user-info/:email", function (req, res) {
    const email = req.params.email;
    con.query("select * from user where email = ?", [email], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {

            res.send(result);
        }
    })
})


router.post("/update-info", function (req, res) {
    const student_id = req.body.student_id;
    const student_email = req.body.student_email;
    con.query("update user set student_id = ? where email = ?", [student_id, student_email], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {

            res.send(result);
        }
    })
})

module.exports = router;
