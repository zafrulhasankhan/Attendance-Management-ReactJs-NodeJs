import React, { Fragment, useEffect, useState } from 'react';
import Header from './Header';
import Table from './Attendance_sheet_Table';
import './css/App.scss';
import axios from '../../config/axios';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";


const Attendance_sheet = ({ match }) => {
    const { currentUser } = useAuth();
    const history = useHistory();
    const [data, setData] = useState([]);
    const course_code = match.params?.course_code;
    useEffect(() => {
        //console.log(driversData);
        axios.get(`/course/info/${course_code}`).then((result) => {
            if (!(result.data[0].email === currentUser.email)) {
                history.push(`/home/${course_code}`)
            }
        })
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
            <br />
            <Link to={`/attendance-report-by-id/${course_code}`}><button className="btn btn-success">attendance report by id</button></Link>&ensp;
            <Link to={`/attendance-report-by-date/${course_code}`}><button className="btn btn-primary">attendance report by date</button></Link>&ensp;
            <Link to={`/attendance-report-by-course/${course_code}`}><button className="btn btn-danger">attendance report by course</button></Link>&ensp;

            <br /><br />
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