import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import $ from 'jquery';
import axios from '../../config/axios';
import '../Attendance_Table/css/App.scss';
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from 'react-router-dom';

function Attendance_report_by_course({ match }) {
    const course_code = match.params.course_code;
    const { currentUser } = useAuth();
    const history = useHistory();
    const [msg, setMsg] = useState("");


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
    // const [present, setpresent] = useState(0);
    const [totalClass, setTotalClass] = useState(0);
    const [studentID, setStudentID] = useState([]);
    const [studentName, setStudentName] = useState([]);
    const [studentEmail, setStudentEmail] = useState([]);
    var present = 0;
    useEffect(() => {

        SearchHandle();

    }, [])
    let SearchHandle = () => {

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


                        let student_name = [];
                        let student_email = [];
                        let student_ids = [];
                        var ID = Array.from(new Set(student_id));

                        let promises = [];
                        for (let i = 0; i < ID.length; i++) {

                            promises.push(

                                axios.get(`/student-details/${ID[i]}/${course_code}`)
                                    .then((res) => {
                                        student_ids.push(res.data[0]?.student_id);

                                        student_name.push(res.data[0]?.student_name);
                                        student_email.push(res?.data[0]?.email);
                                    })
                            )


                        }
                        Promise.all(promises).then(() => {
                            setStudentID(student_ids);
                            setStudentName(student_name)
                            setStudentEmail(student_email)
                        })
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


                        <div className="table-container">
                            <h3>this is course wise attendance report</h3>
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
                                        <tr>

                                            <td data-heading="Student ID">{studentID[index]}</td>
                                            <td data-heading="Student Name">{studentName[index]} </td>
                                            <td data-heading="Student Email"><span style={{fontSize:'11.5px'}}>{studentEmail[index]}</span> </td>
                                            <td data-heading="Presented Class ">
                                                {present = data.reduce(
                                                    (total, current) => total + (JSON.parse(current.attendance_data))
                                                        .some((el) => el.student_id === val && el.present === "present"), 0)}
                                            </td>
                                            <td data-heading="Total Class"> {totalClass}</td>
                                            <td data-heading="Percentage"> {((present * 100) / totalClass).toFixed(2)} %</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <h1>
                            Attendance report not yet found
                        </h1>
                    )}
                </div>
            ) : ""}
        </div>

    );
}

export default Attendance_report_by_course;