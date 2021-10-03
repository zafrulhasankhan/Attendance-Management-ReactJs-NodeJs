import React, { useEffect, useState } from 'react';
import { Button,Card,Form,Container } from 'react-bootstrap';
import $ from 'jquery';
import axios from '../../config/axios';
import '../Attendance_Table/css/App.scss';
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from 'react-router-dom';

function Attendance_report_by_date({ match }) {
    const course_code = match.params.course_code;
    const [msg, setMsg] = useState("");
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
    const headingColumns = ['Student ID', 'Name', 'Email', 'Attendance Status']
    const [attendanceData, setAttendanceData] = useState([]);


    useEffect(() => {
        SearchHandle();
    }, [])

    const SearchHandle = (e) => {
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

                        axios.get(`attend/datewise-attendance-report/${course_code}/${searchValue}`).then((response) => {
                            if (!response.data.msg) {
                                setAttendanceData(response.data);
                                setMsg("")

                            }
                            else {
                                setMsg(response.data.msg)
                            }
                        })

                    })
                }
            })
    }


    return (
        <div>
            {attendanceData ? (
                <div>
                    <h3>{msg}</h3>
                    <Container className=" text-center p-20" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',


                    }}>
                        <Card className="card bg-white" style={{borderRadius:'10px'}}>
                            <Card.Body style={{borderRadius:'10px',textAlign:'left'}}>
                                <h5 className="text-center mb-2">&ensp;Attendance report by Date&ensp;</h5>
                                <form id="attend_sheet_form" onSubmit={SearchHandle}><br />
                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                        <Form.Label style={{ fontWeight: 'bold' }}>Enter Date:</Form.Label>
                                        <Form.Control type="date" required id="search" style={{ textTransform: 'uppercase' }} placeholder="Enter Student ID" /><br></br>

                                        <Button type="submit" id="submit_button" className="btn btn-secondary">Submit</Button>
                                    </Form.Group>
                                </form>
                            
                            </Card.Body>
                            <Link to={`/attendance-sheet/${course_code}`} style={{textAlign:'center',marginTop:'-10px',marginBottom:'10px'}}><span>Back to {course_code}</span></Link>
                        </Card>
                        <br />
                        
                    </Container>

                    {/* <form id="attend_sheet_form" onSubmit={SearchHandle}><br />
                        <input type="date" required id="search" style={{ textTransform: 'uppercase' }} placeholder="Enter Student ID" /><br></br><br />
                        <Button type="submit" id="submit_button">Submit</Button>
                    </form> */}


                    {attendanceData?.map((val1, index1) => (
                        <div className="table-container">
                            <h1>Today's Class No. -{index1 + 1}</h1>
                            <table className={tableClass}>
                                <thead>
                                    <tr>
                                        {headingColumns.map((col, index) => (
                                            <th data-heading={index} key={index}>{col}</th>

                                        ))}

                                    </tr>
                                </thead>
                                <tbody>


                                    {(JSON.parse(val1.attendance_data)).map((val2, index2) => (
                                        <tr>

                                            <td data-heading="Student ID">{val2?.student_id}</td>
                                            <td data-heading="Student Name">{val2?.student_name} </td>
                                            <td data-heading="Student Email"><span style={{fontSize:'11.5px'}}>{val2?.student_email} </span> </td>
                                            <td data-heading="Attendance Status ">
                                                {(val2?.present) ? val2.present : ""}
                                                {(val2?.absent) ? val2.absent : ""}
                                            </td>

                                        </tr>
                                    ))}



                                </tbody>
                            </table>
                        </div>
                    ))}

                </div>
            ) : ""}
           
        </div>
      
    );
}

export default Attendance_report_by_date;