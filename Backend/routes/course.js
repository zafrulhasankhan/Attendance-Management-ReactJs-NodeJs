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

            con.query("insert into course_list (course_code,course_name,course_pin,course_owner_email) values (?,?,?,?)", [course_code, course_name, course_pin,course_owner_email], (err, result) => {
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
  con.query("(SELECT course_code FROM `course_list` WHERE email = ?) UNION (SELECT course_code FROM `course_wise_student-list` WHERE email =?)", [email,email], (err, result) => {
    if (err) {
        console.log(err)
    } else {
        console.log(result);
        res.send(result);
        
    }
})

})

router.get("/:pin", function (req, res) {

    const pin = req.params.pin; 
    con.query("select * from course_list where course_pin = ?", [pin], (err, result) => {
      if (err) {
          console.log(err)
      } else {
          //console.log(result)
          res.send(result);
          //console.log(result)
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
