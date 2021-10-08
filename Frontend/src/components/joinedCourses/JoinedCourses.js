import { Avatar } from "@material-ui/core";
import { FolderOpen, PermContactCalendar, RedoTwoTone } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./style.css";
import axios from '../../config/axios';
import { Form, Container, Card } from 'react-bootstrap';

const JoinedCourses = () => {
  const { currentUser } = useAuth();
  const [msg, setMsg] = useState("");
  const [data, setData] = useState([]);


  useEffect(() => {
  
    CourseRetrieve();

  }, [])

  let CourseRetrieve = () => {

    axios.get(`/course/joinedCourses/${currentUser.email}`).then((result) => {
      if (!result.data.msg) {
        setData(result.data)

        result.data.forEach(async (item, index) => {
          try {
            const result = await axios.get(`/course/info/${item.course_code}`);
            const course_name = result.data[0].course_name;
            const owner_email = result.data[0].email;

            const result2 = await axios.get(`/course/count/${item.course_code}`);
            const Total_student = result2.data.length;

            const result_photo = await axios.get(`/user-info/${owner_email}`);
            const photo = result_photo.data[0].profile_photo;

            setData(data => data.map(
              (el, i) => i === index
                ? ({ ...el, course_name, owner_email, Total_student,photo })
                : el)
            )
          } catch (error) {
            // log error, etc...
          }
        });

      } else {
        setMsg(result.data.msg)
      }
    })
  }


  return (
    <>
      <h3>{msg}</h3>
      <ol className="joined">
        {data.map((val, index) => (
          <li key={index} className="joined__list">
            <div className="joined__wrapper">
              <div className="joined__container">
                <div className="joined__imgWrapper" />
                <div className="joined__image" />
                <div className="joined__content">

                  {(currentUser.email === val.owner_email) ? (
                    <Link className="joined__title" to={`/attendance-sheet/${val.course_code}`}>
                      <div>
                        <h5 style={{ fontSize: '18px' }}>{val.course_name} ({val.course_code})</h5>
                        <h5 style={{ color: 'white', marginTop: '-12px', fontSize: '10px' }} className="joined__owner">{val.owner_email}
                        </h5>
                      </div>
                    </Link>
                  ) : (
                    <Link className="joined__title" to={`/home/${val.course_code}`}>
                      <h5 style={{ fontSize: '18px' }}>{val.course_name} ({val.course_code})</h5>
                      <h5 style={{ color: 'white', marginTop: '-12px', fontSize: '10px' }} className="joined__owner">{val.owner_email}
                      </h5>
                    </Link>

                  )}


                </div>
              </div>
              {val.photo ? (
               <Avatar
               className="joined__avatar"
               src={val.photo}
             />
              ):(
              <Avatar
                className="joined__avatar"
                src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s75-c-fbw=1/photo.jpg"
              />
              )}
            </div>
            <div className="joined__bottom">
              <Link to={`/people/${val.course_code}`} style={{ textDecoration: 'inherit', color: 'inherit' }}><PermContactCalendar /></Link>
              <Link to={`/update-course/${val.course_code}`} style={{ textDecoration: 'inherit', color: 'inherit' }}><FolderOpen /></Link>
              
              {/* <p>&ensp;Total students: {val.Total_student}</p>  */}
            </div>

          </li>

        ))}
      </ol>


    </>
  );
}
export default JoinedCourses;