import React, { Fragment, useEffect, useState } from 'react';
import Header from './Header';
import Table from './Attendance_sheet_Table';
import './css/App.scss';
import axios from '../../config/axios';



const Attendance_sheet = () => {
    const [data, setData] = useState([]);
    const course_code = "ICT-2213"
    useEffect(() => {
        //console.log(driversData);
        axios.post('/attend/sheet', {

            course_code: course_code

        }).then((res) => {
            //console.log(res.data);
            setData(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <Fragment>
            <Header title={course_code} />
            <Table
                tableData={data}
                headingColumns={['Student ID', 'Name', 'Email', 'Present', 'Absent']}
                title="F1 Drivers 2020"
                course_code={course_code}
            />

        </Fragment>
    );
}



export default Attendance_sheet;