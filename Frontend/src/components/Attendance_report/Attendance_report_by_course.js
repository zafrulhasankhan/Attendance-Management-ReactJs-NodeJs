import React, { useEffect, useState } from 'react';
import {Alert } from 'react-bootstrap';
import axios from '../../config/axios';
import '../Attendance_Table/css/App.scss';
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from 'react-router-dom';

function Attendance_report_by_course({ match }) {
    const course_code = match.params.course_code;
    const { currentUser } = useAuth();
    const history = useHistory();
    const [msg, setMsg] = useState("");
    const [course_name, setcourse_name] = useState("");


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
    const [data, setData] = useState([]);
    const [totalClass, setTotalClass] = useState(0);
    const [studentID, setStudentID] = useState([]);

    var present = 0;
    useEffect(() => {
        axios.get(`/course/info/${course_code}`).then((result) => {
            setcourse_name(result.data[0].course_name)
        })

        SearchHandle();

    }, [])

    let SearchHandle = () => {

        // check your courses exists or not 
        axios.get(`/course/joinedCourses/${currentUser.email}`)
            .then((res) => {
                let courses = [];
                console.log(res);
                for (let i = 0; i < res.data.length; i++) {
                    courses.push(res.data[i].course_code);
                }

                //check course exists as your under 
                if (!(courses.indexOf(course_code) !== -1)) {
                    history.push("/not-found")
                    setMsg("")
                }
                else {

                    axios.get(`attend/attendance-report/${course_code}`).then((response) => {

                        setData(response.data);
                        setTotalClass(response.data.length);
                        const result = response.data;


                        let student_id = [];
                        for (let i = 0; i < result.length; i++) {

                            var attend_data = JSON.parse(result[i].attendance_data);

                            for (let j = 0; j < attend_data.length; j++) {
                                student_id.push(attend_data[j].student_id);

                            }
                        }

                        var ID = Array.from(new Set(student_id));
                        setStudentID(ID);
                        console.log("id" + ID.length);
                        ID.forEach(async (item, index) => {

                            try {
                                const result2 = await axios.get(`/student-details/${item}/${course_code}`);
                                const student_name = result2.data[0]?.student_name;
                                const student_id = result2.data[0]?.student_id;
                                const student_email = result2.data[0].email;

                                console.log(result2);
                                setStudentID(data => data.map(
                                    (el, i) => i === index
                                        ? ({ ...el, student_id, student_name, student_email })
                                        : el)
                                )
                            } catch (error) {
                                // log error, etc...
                            }
                        });

                        setMsg("Found")

                    }).catch((err) => console.log(err))


                }
            })
    }



    return (
        <div>

            {msg ? (
                <div>
                    {data.length ? (


                        <div className="table-container" style={{ backgroundColor: 'white', fontFamily: 'roboto' }}>
                            <div className="table-container__title">
                                <h5>Attendance report -- {course_name}({course_code})</h5>
                            </div>

                            <br />
                            <table className={tableClass}>
                                <thead>
                                    <tr>
                                        {headingColumns.map((col, index) => (
                                            <th data-heading={index} key={index}>{col}</th>

                                        ))}

                                    </tr>
                                </thead>
                                <tbody>
                                
                                    {studentID.map((val, index) => (
                                        <>
                                        
                                        {(val.student_id)?(
                                        <tr>
       
                                            <td data-heading="Student ID">{val.student_id}</td>
                                            <td data-heading="Student Name">{val.student_name} </td>
                                            <td data-heading="Student Email"><span style={{ fontSize: '11.5px' }}>{val.student_email}</span> </td>
                                            <td data-heading="Presented Class ">
                                                {present = data.reduce(
                                                    (total, current) => total + (JSON.parse(current.attendance_data))
                                                        .some((el) => el.student_id === val.student_id && el.present === "present"), 0)}
                                            </td>
                                            <td data-heading="Total Class"> {totalClass}</td>
                                            <td data-heading="Percentage"> {((present * 100) / totalClass).toFixed(2)} %</td>

                                        </tr>
                                        ):""}
                                        </>
                                        
                                    ))}
                                </tbody>
                            </table><br />
                            <div style={{ textAlign: 'center', paddingBottom: '5px', fontFamily: 'roboto' }}>
                                <Link to={`/attendance-sheet/${course_code}`}><span>Back to {course_code}</span></Link>
                            </div>
                        </div>
                    ) : (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '17px'

                        }}>
                            <Alert className="alert col-md-6 text-center br-5" variant="dark">
                                <h3>No Attendance reported on this Course</h3>
                            </Alert>
                        </div>
                    )}
                </div>
            ) : ""}
        </div>

    );
}

export default Attendance_report_by_course;