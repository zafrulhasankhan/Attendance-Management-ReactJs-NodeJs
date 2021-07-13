import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import $ from 'jquery';
import axios from '../../config/axios';
import '../Attendance_Table/css/App.scss';

function Attendance_report_by_id({match}) {
    const course_code = match.params.course_code;
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
    const [StudentData, setStudentData]  = useState("");
    const [totalClass, setTotalClass]  = useState(0);

    useEffect(() => {
        SearchHandle();
        console.log(StudentData+present);
    }, [])

    let SearchHandle = (e) => {
        e?.preventDefault();
        $(document).ready(function () {
            var searchValue = $('#search').val();
            console.log(searchValue);

            axios.get(`student-details/${searchValue}`).then((res)=>{
              setStudentData(res.data[0]);

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
    return (
        <div>
            <form id="attend_sheet_form" onSubmit={SearchHandle}><br />
            <input type="text" required id="search" style={{ textTransform: 'uppercase' }} placeholder="Enter Student ID" /><br></br><br />
            <Button type="submit" id="submit_button">Submit</Button>
            </form>
            {(StudentData)?(
            <div className="table-container">

                <table className={tableClass}>
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
                            <td data-heading="Student Name">{StudentData?.name} </td>
                            <td data-heading="Student Email">{StudentData?.email} </td>
                            <td data-heading="Presented Class ">{present}</td>
                            <td data-heading="Total Class"> {totalClass}</td>
                            <td data-heading="Percentage"> {(( present * 100)/totalClass).toFixed(2)} %</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            ):""}   
        </div>

    );
}

export default Attendance_report_by_id;