import { Avatar } from "@material-ui/core";
import { FolderOpen, PermContactCalendar } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./style.css";
import axios from '../../config/axios';


const JoinedCourses = () => {
  const { currentUser } = useAuth();
  const [coursesData, setCoursesData] = useState([]);
  console.log(currentUser);
  useEffect(() => {
    if (currentUser) {
      axios.get(`/course/joinedCourses/${currentUser.email}`)
        .then((res) => {
          console.log(res);
          setCoursesData(res.data);
        })

    }
  }, [])

  return (
    <>
      <Link to="/join-course"><button>join course</button></Link><br /><br />
      <Link to="/add-course"><button>create course</button></Link>
      <ol className="joined">
        {coursesData.map((data, i) => (
          <li key={i} className="joined__list">
            <div className="joined__wrapper">
              <div className="joined__container">
                <div className="joined__imgWrapper" />
                <div className="joined__image" />
                <div className="joined__content">
                  <Link className="joined__title" to={`/attendance-sheet/${data.course_code}`}>
                    <h2>{data.course_name} ({data.course_code} )</h2>
                  </Link>
                  <p className="joined__owner">{data.course_owner_email}  </p>
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
          </li>
        ))}
        ]</ol>
    </>
  );
}
export default JoinedCourses;