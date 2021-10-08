import React, { useEffect, useState } from 'react';
import { Button, Card, Container, FloatingLabel, Form } from 'react-bootstrap';
import $ from 'jquery';
import axios from '../../config/axios';
import '../Attendance_Table/css/App.scss';
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from 'react-router-dom';

function Attendance_report_by_id({ match }) {
    const course_code = match.params.course_code;
    const { currentUser } = useAuth();
    const history = useHistory();


    var breakOn = 'medium'
    let tableClass = 'table-container__table';
    if (breakOn === 'small') {
        tableClass += ' table-container__table--break-sm';
    } else if (breakOn === 'medium') {
        tableClass += ' table-container__table--break-md';
    } else if (breakOn === 'large') {
        tableClass += ' table-container__table--break-lg';
    }
    const headingColumns = ['Student ID', 'Name', 'Email', 'Presented Class', 'Total Class', 'Percentage']
    const [present, setpresent] = useState(0);
    const [StudentData, setStudentData] = useState("");
    const [totalClass, setTotalClass] = useState(0);
    const [msg, setMsg] = useState("");
    const [course_name, setcourse_name] = useState("");

    useEffect(() => {
        axios.get(`/course/info/${course_code}`).then((result) => {
            setcourse_name(result.data[0].course_name)
        })

        SearchHandle();
    }, [])

    let SearchHandle = (e) => {
        e?.preventDefault();

        // check your courses exists or not 
        axios.get(`/course/joinedCourses/${currentUser.email}`)
            .then((res) => {
                let courses = [];
                for (let i = 0; i < res.data.length; i++) {
                    courses.push(res.data[i].course_code);
                }


                //check course exists as your under 
                if (!(courses.indexOf(course_code) !== -1)) {
                    history.push("/not-found")
                    setMsg("")
                }
                else {

                    $(document).ready(function () {
                        var searchValue = $('#search').val();
                        console.log(searchValue);

                        axios.get(`student-details/${searchValue}/${course_code}`).then((res) => {
                            setStudentData(res.data[0]);
                            if (!res.data.length) {
                                setMsg("ID not Found in this course")
                            }
                            else {
                                setMsg("")
                            }
                        })



                        axios.get(`attend/attendance-report/${course_code}`).then((response) => {

                            console.log(response.data);
                            setTotalClass(response.data.length);
                            const PresentCount = (response.data).reduce(
                                (total, current) => total + (JSON.parse(current.attendance_data)).some((el) => (

                                    el.student_id === searchValue && el.present === "present"

                                )),
                                0
                            );
                            setpresent(PresentCount);

                        })

                    })

                }
            })
    }
    return (
        <div>
            <h1>{msg}</h1>

            <Container className=" text-center p-20" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',


            }}>
                <div className="table-container" style={{ backgroundColor: 'white',maxWidth:'350px' }}>
                    <div className="table-container__title">
                        <h6 style={{fontSize:'18px'}}>{course_name}({course_code})</h6>
                    </div>
                    
                <Card className="card bg-white" style={{ borderRadius: '10px' }}>
                    <Card.Body style={{ textAlign: 'left' }}>
                        <h5 style={{fontSize:'17px'}} className="text-center mb-2">&ensp;Attendance report by ID &ensp;</h5>
                        <form id="attend_sheet_form" onSubmit={SearchHandle}><br />
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label style={{ fontWeight: 'bold' }}>Student ID:</Form.Label>
                                <Form.Control type="text" required id="search" style={{ textTransform: 'uppercase' }} placeholder="Enter Student ID" /><br></br>

                                <Button type="submit" id="submit_button" className="btn btn-primary">Submit</Button>
                            </Form.Group>
                        </form>
                    </Card.Body>
                    <Link to={`/attendance-sheet/${course_code}`} style={{ textAlign: 'center', marginTop: '-10px', marginBottom: '10px' }}><span>Back to {course_code}</span></Link>
                </Card>
                </div>
                <br />
            </Container>

            <br /> <br />
            {(StudentData) ? (
                <div className="table-container" style={{ backgroundColor: 'white' }}>
                    <div className="table-container__title">
                        <h5 style={{fontSize:'18px'}}>{course_name}({course_code})</h5>

                    </div>

                    <table style={{borderRadius:'10px'}} className={tableClass}>
                        <thead>
                            <tr>
                                {headingColumns.map((col, index) => (
                                    <th data-heading={index} key={index}>{col}</th>

                                ))}

                            </tr>
                        </thead>
                        <tbody>
                            <tr>

                                <td data-heading="Student ID">{StudentData?.student_id}</td>
                                <td data-heading="Student Name">{StudentData?.student_name} </td>
                                <td data-heading="Student Email"><span style={{ fontSize: '11.5px' }}>{StudentData?.email} </span> </td>
                                <td data-heading="Presented Class ">{present}</td>
                                <td data-heading="Total Class"> {totalClass}</td>
                                <td data-heading="Percentage"> {((present * 100) / totalClass).toFixed(2)} %</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            ) : ""}

        </div>

    );
}

export default Attendance_report_by_id;