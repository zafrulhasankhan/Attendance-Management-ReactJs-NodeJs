import React, { Fragment, useEffect, useState } from 'react';
import Table from './Attendance_sheet_Table';
import './css/App.scss';
import axios from '../../config/axios';
import {  useHistory } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import {  Alert } from 'react-bootstrap';


const Attendance_sheet = ({ match }) => {
    const { currentUser } = useAuth();
    const history = useHistory();
    const [data, setData] = useState([]);
    const [course_name, setcourse_name] = useState("");
    const course_code = match.params?.course_code;

    useEffect(() => {
        axios.get(`/course/joinedCourses/${currentUser.email}`)
            .then((res) => {
                let courses = [];
                for (let i = 0; i < res.data.length; i++) {
                    courses.push(res.data[i].course_code);
                }


                //check course exists as your under 
                if (!(courses.indexOf(course_code) !== -1)) {
                    history.push("/not-found")
                }

                else {

                    //course owner check
                    axios.get(`/course/info/${course_code}`).then((result) => {

                        if (!(result.data[0]?.email === currentUser.email)) {
                            history.push(`/home/${course_code}`)
                        }
                        setcourse_name(result.data[0].course_name)
                    })

                    //student info retrieve

                    axios.post('/attend/sheet', {
                        course_code: course_code
                    }).then((res) => {
                        console.log(res.data);
                        setData(res.data)
                    }).catch((err) => {
                        console.log(err);
                    })
                }

            })
    }, [])

    return (
        <Fragment style={{ backgroundColor: 'white' }}>

            {data && data.length ? (
                <div>
                    <br />
                    <Table
                        tableData={data}
                        headingColumns={['Student ID', 'Name', 'Email', 'Present', 'Absent']}
                        title={course_code}
                        course_code={course_code}
                        course_name={course_name}
                    />

                </div>
            ) : (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '17px'

                }}>
                    <Alert className="alert col-md-6 text-center br-5" variant="dark">
                        <h2>No Student have been added yet </h2>

                    </Alert>
                </div>
            )}
        </Fragment>
    );
}



export default Attendance_sheet;