import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import $ from 'jquery';
import axios from '../../config/axios';
import '../Attendance_Table/css/App.scss';

function Attendance_report_by_date(props) {
    const course_code = "ICT-2213";
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
        $(document).ready(function () {
            var searchValue = $('#search').val();

            axios.get(`attend/datewise-attendance-report/${course_code}/${searchValue}`).then((response) => {
                setAttendanceData(response.data);

            })

        })
    }


    return (
        <div>
            <form id="attend_sheet_form" onSubmit={SearchHandle}><br />
                <input type="date" required id="search" style={{ textTransform: 'uppercase' }} placeholder="Enter Student ID" /><br></br><br />
                <Button type="submit" id="submit_button">Submit</Button>
            </form>


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
                                    <td data-heading="Student Email">{val2?.student_email} </td>
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

    );
}

export default Attendance_report_by_date;