import React, { Fragment, useEffect, useState } from 'react';
import Header from './Header';
import Table from './Attendance_sheet_Table';
import './css/App.scss';
import axios from '../../config/axios';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import { Card, Container } from 'react-bootstrap';


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
                        setData(res.data)
                    }).catch((err) => {
                        console.log(err);
                    })
                }

            })
    }, [])

    return (
        <Fragment style={{ backgroundColor: 'white' }}>

            {data && data ? (
                <div>
                    <br />
                    {/* <Link to={`/attendance-report-by-id/${course_code}`}><button className="btn btn-success">attendance report by id</button></Link>&ensp;
                    <Link to={`/attendance-report-by-date/${course_code}`}><button className="btn btn-primary">attendance report by date</button></Link>&ensp;
                    <Link to={`/attendance-report-by-course/${course_code}`}><button className="btn btn-danger">attendance report by course</button></Link>&ensp; */}
                    <br /><br />
                    {/* <Container className="text-center p-20" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}>

                        <Card className=" h-600 card text-center bg-white">
                            <Card.Body>
                                <h3 className="text-center mb-4">Attendance report</h3>
                                <Link to={`/attendance-report-by-id/${course_code}`}><button className="button button--social-login button--id" >Attendance report by id</button></Link>&ensp;
                                <Link to={`/attendance-report-by-date/${course_code}`}><button className="button button--social-login button--date">Attendance report by date</button></Link>&ensp;
                                <Link to={`/attendance-report-by-course/${course_code}`}><button className="button button--social-login button--course">Attendance report by course</button></Link>&ensp;
                               
                            </Card.Body>
                        </Card>

                    </Container> */}
                  
                            <Table
                                tableData={data}
                                headingColumns={['Student ID', 'Name', 'Email', 'Present', 'Absent']}
                                title={course_code}
                                course_code={course_code}
                                course_name={course_name}
                            />
                            
                        </div>
                        ) : (
                        <h1>any student not found yet</h1>
            )}
                    </Fragment>
                    );
}



                    export default Attendance_sheet;