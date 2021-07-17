const express = require('express');
const router = express.Router();
var con = require('../config/dbconfig');


//get all student data to make attendance sheet
router.post("/sheet", function (req, res) {
    const course_code = req.body.course_code;
    console.log(course_code);
    const sql = "select * from `course_wise_student-list` where course_code = ? order by student_id asc";

    con.query(sql, [course_code], (error, result) => {
        if (error) {
            console.log(error)
        }
        else {
            res.send(result)
            //console.log(result)

        }
    })

})

//check class num of each course
router.post("/check_classNum", function (req, res) {

    const course_code = req.body.course_code;
    const sql_classNum_check = "SELECT id FROM `attendance_sheet` WHERE course_code = ?"
    try {
        var value = con.query(sql_classNum_check, [course_code], (error, result) => {
            if (error) {
                console.log(error)
            }
            else {
                res.send(result)
                // res.setHeader("Content-Type", "text/html");
                console.log("class num check" + result.length);
                //console.log(result[0].id);

            }
        })
    } catch (error) {
        console.log(error);
    }



})

// submit attendance report by teacher
router.post("/submit", function (req, res) {

    const course_code = req.body.course_code;
    const class_num = req.body.class_num;
    const attendance_data = req.body.attendance_data;
    const date = req.body.date;

    const sql_classNum_check = "SELECT id FROM `attendance_sheet` WHERE course_code = ? and class_num = ?"
    var value = con.query(sql_classNum_check, [course_code, class_num], (error, result) => {
        if (!result.length) {
            //Insert attendance data into db
            const sql = "insert into attendance_sheet (`course_code`,`class_num`,`attendance_data`,`date`) VALUES (?,?,?,?)"
            con.query(sql, [course_code, class_num, attendance_data, date], (error, result) => {
                if (error) {
                    console.log(error)
                }
                else {
                    res.send(result)


                }
            })
        }
        else {
            res.send("Already exists")
        }
    })



})

//get all student attendance report by course wise 
router.get('/attendance-report/:course_code', (req, res) => {
    const course_code = req.params.course_code;
    con.query("select * from attendance_sheet where course_code = ?", [course_code], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            //console.log(result)
            res.send(result);
            //console.log(result)
        }
    })
})

//get all student attendance report by date wise 
router.get('/datewise-attendance-report/:course_code/:date', (req, res) => {
    const course_code = req.params.course_code;
    const date = req.params.date;
    console.log("code re" + course_code + date);
    con.query("select * from attendance_sheet where course_code = ? and date= ?", [course_code, date], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if (result.length) {
                res.send(result);
            }else{
                res.send({msg:"Attendance Not found "})
            }
            //console.log(result)
        }
    })
})
module.exports = router;