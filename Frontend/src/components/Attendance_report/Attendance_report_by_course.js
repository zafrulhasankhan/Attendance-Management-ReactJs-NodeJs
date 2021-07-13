import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import $ from 'jquery';
import axios from '../../config/axios';
import '../Attendance_Table/css/App.scss';

function Attendance_report_by_course(props) {
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
    const headingColumns = ['Student ID', 'Name', 'Email', 'Presented Class', 'Total Class', 'Percentage']
   const [data,setData] = useState([]);
    // const [present, setpresent] = useState(0);
    const [totalClass, setTotalClass]  = useState(0);
    const [studentID, setStudentID] = useState([]);
    const [studentName, setStudentName] = useState([]);
    const [studentEmail, setStudentEmail] = useState([]);
    var present = 0;
    useEffect(() => {
        SearchHandle();
        //console.log(StudentData+present);
    }, [])

    let SearchHandle = () => {
       
            axios.get(`attend/attendance-report/${course_code}`).then((response) => {

                setData(response.data);
                setTotalClass(response.data.length);
                const result = response.data;
                
                let student_id = [];
                let student_name = [];
                let student_email = [];

                for (let i = 0; i < result.length; i++) {
                    
                   
                   
                    var attend_data = JSON.parse(result[i].attendance_data);
                  
                    for (let j = 0; j <attend_data.length; j++) {
                        student_id.push(attend_data[j].student_id);
                        console.log(i);
                    }
                  }
              
                setStudentID(Array.from(new Set(student_id)));
                console.log(studentID.length);
                for (let i = 0 ;i< studentID.length; i++){

                    axios.get(`/student-details/${studentID[i]}`)
                    .then((res)=>{
                        console.log(i);
                      console.log(res.data[0]?.name);
                      console.log(res.data[0]?.email);
                      student_name.push(res.data[0]?.name);
                      student_email.push((res?.data[0]?.email === "undefined")?"":res?.data[0]?.email);
                    
                    })


                }               
                
                // setStudentName(Array.from(new Set(student_name)));
                // setStudentEmail(Array.from(new Set(student_email)));
                

                // const PresentCount = (response.data).reduce(
                //     (total, current) => total + (JSON.parse(current.attendance_data)).some((el) => (

                //         el.student_id === "searchValue" && el.present === "present"

                //     )),
                //     0
                // );
                // setpresent(PresentCount);

            }).catch((err)=>console.log(err))

       
    }
    return (
        <div>
            <h3>this is course wise attendance report</h3>
        
            {(studentID)?(
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
                        
                        {studentID.map((val,index)=>
                        <tr>
                            
                            <td data-heading="Student ID">{studentID[index]}</td>
                            <td data-heading="Student Name">{studentName[index]} </td>
                            <td data-heading="Student Email">{studentEmail[index]} </td>
                            <td data-heading="Presented Class ">
                              {present = data.reduce(
                               (total, current) => total + (JSON.parse(current.attendance_data))
                               .some((el) => el.student_id === val && el.present === "present"),
            0
                               ) }</td>
                            <td data-heading="Total Class"> {totalClass}</td>
                            <td data-heading="Percentage"> {(( present * 100)/totalClass).toFixed(2)} %</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
            ):""}   
        </div>

    );
}

export default Attendance_report_by_course;