import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./style.css";
import axios from '../../config/axios';
import {  Container,  Alert, Col, Dropdown } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { IoIosPeople, IoIosRemoveCircle } from 'react-icons/io'
import { AiFillDelete } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';

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
                ? ({ ...el, course_name, owner_email, Total_student, photo })
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

  async function deleteCourse(course_code) {
    axios.post(`/course/delete/${course_code}`)
      .then((result) => {
        console.log(result.data);
        //if(result.data.length){
        //history.push("/");
        //}

      })
    CourseRetrieve();
  }

  async function removeCourse(course_code) {
    axios.post(`/course/remove/${course_code}`)
      .then((result) => {
        console.log(result.data);
        //if(result.data.length){
        //history.push("/");
        //}

      })
      console.log("hey delete hoise");
      CourseRetrieve();
      CourseRetrieve();
  }

  return (
    <>
      {msg ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '17px'

        }}>
          <Alert className="alert col-md-6 text-center" variant="dark">
            {msg}
          </Alert>
        </div>
      ) : ""}
      <ol className="joined">
        {data.map((val, index) => (
          <li key={index} className="joined__list">
            <div className="joined__wrapper">
              <div className="joined__container">
                <div className="joined__imgWrapper" />
                <div className="joined__image" />
                <div className="joined__content">
                  <Container>

                    <Col style={{ outline: '#174ea6', fontSize: '20px', textAlign: 'right', textDecoration: '#174ea6', marginLeft: '100px' }}>
                      <Dropdown style={{ outlineColor: '#174ea6' }}>
                        <Dropdown.Toggle variant="default" bsPrefix="p-0" style={{ outlineColor: '#174ea6' }}>
                          <BsThreeDotsVertical style={{ fontSize: '20px', textAlign: 'right', color: 'white', marginTop: '-28px', marginRight: '-20px', outlineColor: '#174ea6' }} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            {(currentUser.email === val.owner_email) ? (
                              <span onClick={() => deleteCourse(val.course_code)}> <AiFillDelete style={{ fontSize: '20px' }} />| Delete course</span>
                            ) : (
                              <span onClick={() => removeCourse(val.course_code)}> <IoIosRemoveCircle style={{ fontSize: '20px' }} />| Uneroll course</span>

                            )}
                          </Dropdown.Item>
                          {/* <Dropdown.Divider /> */}
                          {/* <Dropdown.Item > <Link style={{ textDecoration: 'inherit', color: 'inherit' }} to={`/attendance-report-by-date/${course_code}`}>Report by date</Link></Dropdown.Item>*/}

                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>

                    <Col style={{ marginTop: '-40px' }}>

                      {(currentUser.email === val.owner_email) ? (
                        <>

                          <Link className="joined__title" to={`/attendance-sheet/${val.course_code}`}>
                            <div>
                              <h5 style={{ fontSize: '18px' }}>{val.course_name} ({val.course_code})</h5>
                              <h5 style={{ color: 'white', marginTop: '-12px', fontSize: '10px' }} className="joined__owner">{val.owner_email}
                              </h5>
                            </div>
                          </Link>
                        </>
                      ) : (
                        <Link className="joined__title" to={`/home/${val.course_code}`}>
                          <div>
                            <h5 style={{ fontSize: '18px' }}>{val.course_name} ({val.course_code})</h5>
                            <h5 style={{ color: 'white', marginTop: '-12px', fontSize: '10px' }} className="joined__owner">{val.owner_email}
                            </h5>
                          </div>
                        </Link>
                      )}
                    </Col>
                  </Container>

                </div>
              </div>

              {val.photo ? (
                <Avatar
                  className="joined__avatar"
                  src={val.photo}
                />
              ) : (
                <Avatar
                  className="joined__avatar"
                  src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s75-c-fbw=1/photo.jpg"
                />
              )}
            </div>
            <div className="joined__bottom">

              <Link to={`/people/${val.course_code}`} style={{ textDecoration: 'inherit', color: 'inherit' }}><IoIosPeople style={{ fontSize: '25px' }} /> </Link>

              {(currentUser.email === val.owner_email) ? (
                <Link to={`/update-course/${val.course_code}`} style={{ textDecoration: 'inherit', color: 'inherit' }}><FaEdit style={{ fontSize: '20px' }} /></Link>
              ) : ""}

              {/* <Link to={`/people/${val.course_code}`} style={{ textDecoration: 'inherit', color: 'inherit' }}><BsThreeDotsVertical style={{ fontSize: '25px' }} /> </Link> */}

              {/* <Button className="but" style={{outline:'none',border:'none', '&:focus':{outline:'none',backgroundColor:'red'} }}>hello outline</Button> */}
            </div>

          </li>

        ))}
      </ol>


    </>
  );
}
export default JoinedCourses;