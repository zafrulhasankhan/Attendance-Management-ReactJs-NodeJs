import { Avatar } from "@material-ui/core";
import { FolderOpen, PermContactCalendar, RedoTwoTone } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./style.css";
import axios from '../../config/axios';


const JoinedCourses = () => {
  const { currentUser } = useAuth();
  const [coursesData, setCoursesData] = useState([]);
  const [cname, setCname] = useState([])
  const [code, setcode] = useState([])
  const [course_owner_email, setCourse_owner_email] = useState([])
  const [msg, setMsg] = useState("");
  const [counter, setCounter] = useState([]);


  useEffect(() => {
    if (currentUser) {
      axios.get(`/course/joinedCourses/${currentUser.email}`)
        .then((res) => {

          if (!res.data.msg) {

            setCoursesData(res.data);
            let course_name = [];
            let codes = [];
            let course_owner = [];
            let promises = [];
            for (let i = 0; i < res.data.length; i++) {
              promises.push(
                axios.get(`/course/info/${res.data[i].course_code}`).then((result) => {

                  course_name.push(result.data[0]?.course_name);
                  course_owner.push(result.data[0]?.email)
                  codes.push(result.data[0]?.course_code)

                })
              )

            }

            let count = []
            let promises2 = []
            Promise.all(promises).then((r) => {
              setCname(course_name)
              setCourse_owner_email(course_owner);
              setcode(codes);


              for (let i = 0; i < codes.length; i++) {
                console.log(i);
                promises2.push(
                  axios.get(`/course/count/${codes[i]}`)
                    .then((result) => {
                      console.log(result.data.length);
                      count.push(result.data.length)
                    })
                )

              }

              Promise.all(promises2).then(() => {
                console.log(count);
                setCounter(count)
                console.log(counter);
              })

            })


          } else {
            setMsg(res.data.msg)
          }




        })
    }


  }, [])



  return (
    <>
      <h3>{msg}</h3>
      <Link to="/join-course"><button>join course</button></Link><br /><br />
      <Link to="/add-course"><button>create course</button></Link>
      <ol className="joined">
        {code.map((data, i) => (
          <li key={i} className="joined__list">
            <div className="joined__wrapper">
              <div className="joined__container">
                <div className="joined__imgWrapper" />
                <div className="joined__image" />
                <div className="joined__content">

                  {(currentUser.email === course_owner_email[i]) ? (
                    <Link className="joined__title" to={`/attendance-sheet/${data}`}>
                      <h2>{cname[i]} ({data})</h2>
                    </Link>
                  ) : (
                    <Link className="joined__title" to={`/home/${data}`}>
                      <h2>{cname[i]} ({data})</h2>
                    </Link>

                  )}
                  <p style={{ color: 'black' }} className="joined__owner">{course_owner_email[i]}
                  </p>

                </div>
              </div>
              <Avatar
                className="joined__avatar"
                src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s75-c-fbw=1/photo.jpg"
              />
            </div>
            <div className="joined__bottom">
              <PermContactCalendar />
              <FolderOpen />

            </div>
            <h5>&ensp;Total students: {counter[i]}</h5>
          </li>

        ))}
      </ol>
    </>
  );
}
export default JoinedCourses;