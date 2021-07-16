import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import axios from '../../config/axios';

function Home({match}) {
    const { currentUser } = useAuth();
    const history = useHistory();
    const course_code = match.params?.course_code;

    useEffect(()=>{
        axios.get(`/course/info/${course_code}`).then((result) => {
            if ((result.data[0].email === currentUser.email)) {
                history.push(`/attendance-sheet/${course_code}`)
            }
        })
    },[])
    return (
        <div>
            <Link to={`/attendance-report-by-id/${course_code}`}><button className="btn btn-success">attendance report by id</button></Link>&ensp;
            <Link to={`/attendance-report-by-date/${course_code}`}><button className="btn btn-primary">attendance report by date</button></Link>&ensp;
            <Link to={`/attendance-report-by-course/${course_code}`}><button className="btn btn-danger">attendance report by course</button></Link>&ensp;
            
        </div>
    );
}

export default Home;